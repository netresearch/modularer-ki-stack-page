import { readonly, shallowRef, unref, watch } from 'vue'
import { useNav } from '@slidev/client'

const sessions = new WeakMap()

// A visit updates only its own section. Appendix and introduction pages do not
// imply that any other part of the talk has been visited or completed.
export function recordProgressVisit(state, sections, page) {
  const section = sections.find(item => page >= item.start && page <= item.end)
  if (!Number.isInteger(page) || !section) return
  if (state.positions.value[section.number] !== page)
    state.positions.value = { ...state.positions.value, [section.number]: page }
  state.lastMainPage.value = page
}

export function useProgressState(sections) {
  const nav = useNav()
  if (!sessions.has(nav.router))
    sessions.set(nav.router, { positions: shallowRef({}), lastMainPage: shallowRef(null) })
  const state = sessions.get(nav.router)

  watch([() => nav.router.currentRoute.value, nav.isPrintMode, sections], ([route, printing]) => {
    if (printing || !['play', 'presenter'].includes(route.name)) return
    const slide = nav.slides.value.find(item => item.no === Number(route.params.no)
      || item.meta?.slide?.frontmatter?.routeAlias === route.params.no)
    if (!slide || slide.meta?.slide?.frontmatter?.appendix) return
    recordProgressVisit(state, unref(sections), Number(slide.meta?.slide?.frontmatter?.talkPage ?? slide.no))
  }, { immediate: true })

  return { positions: readonly(state.positions), lastMainPage: readonly(state.lastMainPage) }
}
