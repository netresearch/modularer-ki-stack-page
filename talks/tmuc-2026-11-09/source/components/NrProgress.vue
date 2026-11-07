<script setup>
import { computed, shallowRef, unref, useId, watch } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import NrReturn from './NrReturn.vue'
import { useSlideReturn } from '../composables/useSlideReturn'
import { useProgressState } from '../composables/useProgressState'

// Generated from the main sections; the unnumbered introduction has no segment.
const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
})
const { $page, $frontmatter, $renderContext } = useSlideContext()
const nav = useNav()
const { isPrintMode } = nav
const { returnPage, jumpTo } = useSlideReturn()
const { positions, lastMainPage } = useProgressState(computed(() => props.sections))
const activeSlide = computed(() => nav.slides.value.find(slide => slide.no === Number(nav.router.currentRoute.value.params.no)
  || slide.meta?.slide?.frontmatter?.routeAlias === nav.router.currentRoute.value.params.no))
const canInteract = computed(() => !isPrintMode.value
  && ['slide', 'presenter'].includes(unref($renderContext))
  && Number(unref($page)) === activeSlide.value?.no)
const frontmatter = computed(() => unref($frontmatter))
const talkTotal = computed(() => props.sections.at(-1).end)
const rawPage = computed(() => Number(frontmatter.value.talkPage ?? unref($page)))
const isAppendix = computed(() => Boolean(frontmatter.value.appendix) || rawPage.value > talkTotal.value)
const isIntro = computed(() => !isAppendix.value && Number(frontmatter.value.section) === 0)
const talkPage = computed(() => Math.max(1, Math.min(rawPage.value, talkTotal.value)))
const currentSection = computed(() => props.sections.find(section => talkPage.value >= section.start && talkPage.value <= section.end))
const appendixLabel = computed(() => frontmatter.value.appendix === 'technical' ? 'Reserve für Rückfragen' : 'Links & Quellen')
const progressLabel = computed(() => isAppendix.value
  ? `Anhang: ${appendixLabel.value}. Nicht in der Folienzahl enthalten.${!isPrintMode.value && lastMainPage.value ? ' Letzte Hauptfolie: ' + lastMainPage.value + '.' : ''}`
  : isIntro.value ? `Auftakt. Folie ${talkPage.value} von ${talkTotal.value}.`
  : `Abschnitt ${currentSection.value.number} von ${props.sections.length}: ${currentSection.value.title}. Folie ${talkPage.value} von ${talkTotal.value}.`)
const segments = computed(() => props.sections.map(section => {
  const length = section.end - section.start + 1
  const savedPage = positions.value[section.number]
  const current = isPrintMode.value
    ? !isAppendix.value && !isIntro.value && section.number === currentSection.value?.number
    : !isIntro.value && lastMainPage.value >= section.start && lastMainPage.value <= section.end
  return {
    ...section,
    length,
    savedPage,
    fill: isPrintMode.value
      ? isAppendix.value ? 100 : isIntro.value ? 0 : Math.max(0, Math.min(100, (talkPage.value - section.start + 1) / length * 100))
      : savedPage ? (savedPage - section.start + 1) / length * 100 : 0,
    current,
    marker: current,
    complete: isPrintMode.value ? isAppendix.value || !isIntro.value && talkPage.value > section.end : savedPage === section.end,
  }
}))

const helpId = `nr-progress-help-${useId()}`
const hovered = shallowRef(null)
const focused = shallowRef(null)
const announcement = shallowRef('')
const preview = computed(() => hovered.value || focused.value)
const previewText = computed(() => preview.value ? describePage(preview.value.page) : '')
const tooltipStyle = computed(() => preview.value ? {
  left: Math.max(12, Math.min(preview.value.x + 12, window.innerWidth - 380)) + 'px',
  top: Math.max(12, preview.value.y - 12) + 'px',
} : {})

function describePage(page) {
  const slide = nav.slides.value.find(item => item.no === page)
  const title = slide?.meta?.slide?.frontmatter?.title || slide?.meta?.title || ''
  return `Folie ${page}${title ? ': ' + title : ''}`
}

function targetPage(section) {
  if (hovered.value?.section === section.number) return hovered.value.page
  if (focused.value?.section === section.number) return focused.value.page
  return section.savedPage ?? section.start
}

function pageAtPointer(event, section) {
  const rect = event.currentTarget.getBoundingClientRect()
  const fraction = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  return section.start + Math.min(section.length - 1, Math.floor(fraction * section.length))
}

function previewPointer(event, section) {
  hovered.value = { section: section.number, page: pageAtPointer(event, section), x: event.clientX, y: event.clientY }
}

function previewFocus(event, section) {
  hovered.value = null
  const rect = event.currentTarget.getBoundingClientRect()
  focused.value = { section: section.number, page: section.savedPage ?? section.start, x: rect.left + rect.width / 2, y: rect.top }
}

function openTarget(event, page) {
  event.currentTarget.blur()
  hovered.value = null
  focused.value = null
  jumpTo(page)
}

function clickTarget(event, section) {
  openTarget(event, event.detail ? pageAtPointer(event, section) : targetPage(section))
}

function previewKey(event, section) {
  const direction = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 }[event.key]
  if (direction === undefined && !['Home', 'End', 'Enter', ' '].includes(event.key)) return
  event.preventDefault()
  event.stopPropagation()
  const page = targetPage(section)
  if (event.key === 'Enter' || event.key === ' ') {
    openTarget(event, page)
    return
  }
  hovered.value = null
  const next = event.key === 'Home' ? section.start : event.key === 'End' ? section.end
    : Math.max(section.start, Math.min(section.end, page + direction))
  previewFocus(event, section)
  focused.value = { ...focused.value, page: next }
  announcement.value = describePage(next)
}

function releaseKey(event) {
  if (['Enter', ' '].includes(event.key)) {
    event.preventDefault()
    event.stopPropagation()
  }
}

watch(canInteract, (active) => {
  if (!active) {
    hovered.value = null
    focused.value = null
  }
})
</script>

<template>
  <footer class="nr-footer nr-progress-footer" :class="{ 'nr-progress-appendix': isAppendix }">
    <div
      class="nr-progress"
      :data-talk-total="talkTotal"
      :role="isPrintMode ? 'progressbar' : 'group'"
      :aria-label="progressLabel"
      :aria-valuemin="isPrintMode ? 1 : undefined"
      :aria-valuemax="isPrintMode ? talkTotal : undefined"
      :aria-valuenow="isPrintMode ? isAppendix ? talkTotal : talkPage : undefined"
      :aria-valuetext="isPrintMode ? progressLabel : undefined"
    >
      <div
        v-for="section in segments"
        :key="section.number"
        class="nr-progress-segment"
        :class="{ 'is-current': section.current, 'is-complete': section.complete }"
        :style="{ flex: section.length }"
        :data-section="section.number"
        :data-last-page="section.savedPage"
      >
        <span class="nr-progress-label" aria-hidden="true">{{ section.number }} {{ section.label }}</span>
        <span class="nr-progress-track" aria-hidden="true">
          <span class="nr-progress-fill" :style="{ width: section.fill + '%' }"></span>
          <span v-if="section.marker" class="nr-progress-cursor" :style="{ left: section.fill + '%' }"></span>
        </span>
        <button
          v-if="canInteract"
          type="button"
          class="nr-progress-control"
          :data-section="section.number"
          :data-preview-page="targetPage(section)"
          :aria-label="'Abschnitt ' + section.number + ': ' + section.title + '. ' + describePage(targetPage(section))"
          :aria-describedby="helpId"
          @pointerenter="previewPointer($event, section)"
          @pointermove="previewPointer($event, section)"
          @pointerleave="hovered = null"
          @focus="previewFocus($event, section)"
          @blur="focused = null"
          @click.stop="clickTarget($event, section)"
          @keydown="previewKey($event, section)"
          @keyup="releaseKey"
        ></button>
      </div>
    </div>
    <span v-if="canInteract" :id="helpId" class="nr-progress-sr-only">Mit Pfeiltasten eine Folie auswählen; mit Eingabe oder Leertaste öffnen. Pos1 und Ende wählen die erste und letzte Folie des Abschnitts.</span>
    <span v-if="canInteract" class="nr-progress-sr-only" aria-live="polite" aria-atomic="true">{{ announcement }}</span>
    <Teleport to="body">
      <div v-if="canInteract && preview" class="nr-progress-tooltip" role="tooltip" :style="tooltipStyle">{{ previewText }}</div>
    </Teleport>
    <div class="nr-progress-meta">
      <a href="https://www.netresearch.de/">Netresearch DTT GmbH</a>
      <NrReturn v-if="returnPage" />
      <span v-else class="nr-section-progress">{{ isAppendix ? 'Anhang · nicht mitgezählt' : isIntro ? 'Auftakt' : 'Abschnitt ' + currentSection.number + '/' + sections.length + ' · ' + currentSection.title }}</span>
      <span class="nr-slide-progress">{{ isAppendix ? appendixLabel : 'Folie ' + talkPage + '/' + talkTotal }}</span>
    </div>
  </footer>
</template>

<style scoped>
.nr-progress-segment { position: relative; }
.nr-progress-control {
  position: absolute;
  inset: -3px 0 -5px;
  width: 100%;
  min-height: 36px;
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 3px;
  background: transparent;
  cursor: pointer;
}
.nr-progress-control:hover,
.nr-progress-control:focus-visible {
  outline: 2px solid var(--nr-primary);
  outline-offset: 3px;
}
.nr-progress-tooltip {
  position: fixed;
  z-index: 10001;
  transform: translateY(-100%);
  width: max-content;
  max-width: min(360px, calc(100vw - 24px));
  padding: 8px 12px;
  border: 1px solid #15585E;
  border-radius: 6px;
  background: #FFFFFF;
  color: #15585E;
  font: 600 15px/1.35 'Open Sans', Arial, sans-serif;
  pointer-events: none;
}
.nr-progress-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@media print {
  .nr-progress-control,
  .nr-progress-tooltip,
  .nr-progress-sr-only { display: none !important; }
}
</style>
