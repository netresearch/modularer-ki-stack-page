/** Progressive enhancement: navigation, colour preference and task explorer. */
(() => {
  'use strict';

  const root = document.documentElement;
  const themeControl = document.querySelector('[data-theme-control]');
  let preference = 'system';
  try {
    const stored = localStorage.getItem('nr-theme');
    // An explicit "system" preference takes precedence over any legacy key.
    const saved = stored === null ? localStorage.getItem('nr-color-theme') : stored;
    if (saved === 'light' || saved === 'dark') {
      preference = saved;
      if (stored === null) localStorage.setItem('nr-theme', saved);
    }
  } catch { /* Preferences remain usable when browser storage is unavailable. */ }
  const applyTheme = () => {
    if (preference === 'system') delete root.dataset.theme;
    else root.dataset.theme = preference;
  };
  applyTheme();
  if (themeControl) {
    themeControl.value = preference;
    themeControl.closest('.theme-control').hidden = false;
    themeControl.addEventListener('change', () => {
      preference = themeControl.value;
      try { localStorage.setItem('nr-theme', preference); } catch { /* Optional persistence. */ }
      applyTheme();
    });
  }

  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-navigation');
  const compact = window.matchMedia('(max-width: 1100px)');
  if (menu && nav) {
    const closeMenu = (restoreFocus = false) => {
      menu.setAttribute('aria-expanded', 'false');
      nav.hidden = compact.matches;
      if (restoreFocus) menu.focus();
    };
    menu.hidden = false;
    closeMenu();
    compact.addEventListener('change', () => closeMenu());
    menu.addEventListener('click', () => {
      if (menu.getAttribute('aria-expanded') === 'true') return closeMenu();
      menu.setAttribute('aria-expanded', 'true');
      nav.hidden = false;
      nav.querySelector('a')?.focus();
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a') && compact.matches) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        closeMenu(true);
      }
    });
  }

  const dataNode = document.getElementById('layer-data');
  if (!dataNode) return;
  let data;
  try { data = JSON.parse(dataNode.textContent); } catch { return; }
  const { repos = {}, layers = {}, labels = {} } = data;
  const cards = Array.from(document.querySelectorAll('.layer-card'));
  const panel = document.getElementById('layer-panel');
  if (!cards.length || !panel) return;
  root.classList.add('js');
  const fields = {
    kicker: document.getElementById('detail-kicker'), title: document.getElementById('detail-title'),
    summary: document.getElementById('detail-summary'), problem: document.getElementById('detail-problem'),
    audience: document.getElementById('detail-audience'), result: document.getElementById('detail-result'),
    stackPath: document.getElementById('stack-path'), takeawayTitle: document.getElementById('detail-takeaway-title'),
    takeaway: document.getElementById('detail-takeaway'),
  };
  function repositoryUrl(value) {
    if (typeof value !== 'string') return null;
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.hostname !== 'github.com' ||
          url.username || url.password || url.port || url.search || url.hash ||
          !/^\/netresearch\/[A-Za-z0-9_.-]+\/?$/.test(url.pathname)) return null;
      return url.href;
    } catch {
      return null;
    }
  }
  function selectLayer(layerId) {
    const layer = layers[layerId];
    if (!layer) return;
    cards.forEach((card) => {
      const selected = card.dataset.layer === layerId;
      card.classList.toggle('is-active', selected);
      card.setAttribute('aria-selected', String(selected));
      card.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', `tab-${layerId}`);
    for (const field of ['kicker', 'title', 'summary', 'problem', 'audience', 'result', 'takeawayTitle', 'takeaway']) {
      fields[field].textContent = layer[field];
    }
    fields.stackPath.replaceChildren();
    fields.stackPath.closest('.detail-stack').hidden = !layer.stack.length;
    for (const name of layer.stack) {
      const url = repositoryUrl(repos[name]);
      const link = document.createElement(url ? 'a' : 'span');
      link.className = 'path-chip';
      link.textContent = name;
      if (url) {
        link.href = url;
        if (labels.openRepo) link.setAttribute('aria-label', `${name} — ${labels.openRepo}`);
      }
      fields.stackPath.appendChild(link);
    }
    document.getElementById('panel-state').textContent = layer.title;
  }
  cards.forEach((card, index) => {
    card.addEventListener('click', () => selectLayer(card.dataset.layer));
    card.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % cards.length;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + cards.length) % cards.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = cards.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectLayer(cards[next].dataset.layer);
        cards[next].focus();
      }
    });
  });
})();
