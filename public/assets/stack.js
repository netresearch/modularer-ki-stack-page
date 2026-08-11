/**
 * Interactive layer explorer.
 *
 * The layer data used to live in this file, in German. It now comes from a JSON
 * block the page renders, so the same script serves both languages and the copy
 * has exactly one source: content/<lang>.yaml.
 *
 * The panel is server-rendered with layer 0 already filled in, so a reader
 * without JavaScript gets a complete layer description rather than an empty box.
 */
(() => {
  'use strict';

  const dataNode = document.getElementById('layer-data');
  if (!dataNode) return;

  let data;
  try {
    data = JSON.parse(dataNode.textContent);
  } catch {
    return; // Leave the server-rendered panel exactly as it is.
  }

  const { repos = {}, layers = {}, labels = {} } = data;

  const cards = Array.from(document.querySelectorAll('.layer-card'));
  const markers = Array.from(document.querySelectorAll('.rail-marker'));
  if (!cards.length) return;

  const fields = {
    kicker: document.getElementById('detail-kicker'),
    title: document.getElementById('detail-title'),
    summary: document.getElementById('detail-summary'),
    problem: document.getElementById('detail-problem'),
    audience: document.getElementById('detail-audience'),
    result: document.getElementById('detail-result'),
    stackPath: document.getElementById('stack-path'),
    takeawayTitle: document.getElementById('detail-takeaway-title'),
    takeaway: document.getElementById('detail-takeaway'),
  };

  function renderStackPath(stack) {
    fields.stackPath.replaceChildren();
    stack.forEach((item, index) => {
      const url = repos[item];
      const chip = document.createElement(url ? 'a' : 'span');
      chip.className = 'path-chip';
      chip.textContent = item;
      if (url) {
        chip.href = url;
        if (labels.openRepo) chip.setAttribute('aria-label', `${item} — ${labels.openRepo}`);
      }
      fields.stackPath.appendChild(chip);

      if (index < stack.length - 1) {
        const arrow = document.createElement('span');
        arrow.className = 'path-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
        fields.stackPath.appendChild(arrow);
      }
    });
  }

  function setActiveLayer(layerId) {
    const layer = layers[layerId];
    if (!layer) return;

    cards.forEach((card) => {
      const active = card.dataset.layer === layerId;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-selected', active ? 'true' : 'false');
      card.tabIndex = active ? 0 : -1;
    });

    markers.forEach((marker) => {
      marker.classList.toggle('is-active', marker.dataset.layer === layerId);
    });

    fields.kicker.textContent = layer.kicker;
    fields.title.textContent = layer.title;
    fields.summary.textContent = layer.summary;
    fields.problem.textContent = layer.problem;
    fields.audience.textContent = layer.audience;
    fields.result.textContent = layer.result;
    fields.takeawayTitle.textContent = layer.takeawayTitle;
    fields.takeaway.textContent = layer.takeaway;
    renderStackPath(layer.stack);
  }

  cards.forEach((card) => {
    card.tabIndex = card.classList.contains('is-active') ? 0 : -1;
    card.addEventListener('click', () => setActiveLayer(card.dataset.layer));
    card.addEventListener('keydown', (event) => {
      const currentIndex = cards.findIndex((item) => item.dataset.layer === card.dataset.layer);
      let nextIndex = currentIndex;

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        nextIndex = Math.min(cards.length - 1, currentIndex + 1);
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        nextIndex = Math.max(0, currentIndex - 1);
      }
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = cards.length - 1;

      if (nextIndex !== currentIndex) {
        event.preventDefault();
        const nextCard = cards[nextIndex];
        setActiveLayer(nextCard.dataset.layer);
        nextCard.focus();
      }
    });
  });
})();
