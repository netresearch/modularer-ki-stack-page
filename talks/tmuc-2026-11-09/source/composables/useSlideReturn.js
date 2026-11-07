import { computed, shallowRef } from 'vue'
import { useNav } from '@slidev/client'

const sessions = new WeakMap()

function shortenTrail(trail, page) {
  const index = trail.indexOf(page)
  return index < 0 ? trail : trail.slice(0, index)
}

function getSession(router) {
  if (sessions.has(router))
    return sessions.get(router)

  const trail = shallowRef([])
  const entries = new Map()
  const position = () => router.options.history.state.position
  let activePosition = position()
  let fromHistory = false
  const session = { trail, pending: null }
  entries.set(activePosition, { path: router.currentRoute.value.fullPath, trail: [] })

  // Slidev already pushes browser-history entries. Remember only the return
  // trail belonging to each entry; never rewrite or extend browser history.
  router.beforeEach(() => {
    fromHistory = position() !== activePosition
  })
  router.afterEach((to, _from, failure) => {
    if (failure) {
      if (session.pending?.page === Number(to.params.no))
        session.pending = null
      return
    }
    const page = Number(to.params.no)
    const entry = entries.get(position())
    if (fromHistory)
      trail.value = entry?.path === to.fullPath ? entry.trail : []
    else if (session.pending?.page === page)
      trail.value = session.pending.trail
    else
      trail.value = shortenTrail(trail.value, page)

    session.pending = null
    activePosition = position()
    entries.set(activePosition, { path: to.fullPath, trail: trail.value })
  })
  sessions.set(router, session)
  return session
}

export function handlesSlideLink(event) {
  return !event.defaultPrevented && event.button === 0
    && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
    && event.currentTarget?.getAttribute('target') !== '_blank'
}

export function allowSlideNavigation(event) {
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key))
    event.currentTarget.blur()
}

export function useSlideReturn() {
  const nav = useNav()
  const { router } = nav
  const session = getSession(router)
  const returnPage = computed(() => !nav.isPrintMode.value
    && (nav.isPlaying.value || nav.isPresenter.value)
    && nav.currentSlideNo.value === Number(router.currentRoute.value.params.no)
    ? session.trail.value.at(-1) : undefined)

  function slideHref(page) {
    return router.resolve({ path: `/${page}` }).href
  }

  async function jumpTo(page, { back = false } = {}) {
    const current = Number(router.currentRoute.value.params.no)
    if (!Number.isInteger(page) || page < 1 || page > nav.total.value || page === current)
      return
    const trail = session.trail.value
    const pending = {
      page,
      trail: trail.includes(page) ? shortenTrail(trail, page)
        : back ? [] : Number.isInteger(current) ? [...trail, current] : [],
    }
    session.pending = pending
    try {
      await nav.go(page)
    }
    finally {
      if (session.pending === pending)
        session.pending = null
    }
  }

  function returnToSource() {
    if (returnPage.value)
      return jumpTo(returnPage.value, { back: true })
  }

  return { returnPage, jumpTo, returnToSource, slideHref }
}
