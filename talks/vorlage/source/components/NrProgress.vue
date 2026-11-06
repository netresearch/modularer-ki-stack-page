<script setup>
import { computed, unref } from 'vue'
import { useSlideContext } from '@slidev/client'

// Generated from the main sections; the unnumbered introduction has no segment.
const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
})
const { $page, $frontmatter } = useSlideContext()
const frontmatter = computed(() => unref($frontmatter))
const talkTotal = computed(() => props.sections.at(-1).end)
const rawPage = computed(() => Number(frontmatter.value.talkPage ?? unref($page)))
const isAppendix = computed(() => Boolean(frontmatter.value.appendix) || rawPage.value > talkTotal.value)
const isIntro = computed(() => !isAppendix.value && Number(frontmatter.value.section) === 0)
const talkPage = computed(() => Math.max(1, Math.min(rawPage.value, talkTotal.value)))
const currentSection = computed(() => props.sections.find(section => talkPage.value >= section.start && talkPage.value <= section.end))
const appendixLabel = computed(() => frontmatter.value.appendix === 'technical' ? 'Reserve für Rückfragen' : 'Links & Quellen')
const progressLabel = computed(() => isAppendix.value
  ? 'Vortrag abgeschlossen. Anhang: ' + appendixLabel.value + '. Nicht in der Folienzahl enthalten.'
  : isIntro.value ? `Auftakt. Folie ${talkPage.value} von ${talkTotal.value}.`
  : `Abschnitt ${currentSection.value.number} von ${props.sections.length}: ${currentSection.value.title}. Folie ${talkPage.value} von ${talkTotal.value}.`)
const segments = computed(() => props.sections.map(section => ({
  ...section,
  length: section.end - section.start + 1,
  fill: isAppendix.value ? 100 : isIntro.value ? 0 : Math.max(0, Math.min(100, (talkPage.value - section.start + 1) / (section.end - section.start + 1) * 100)),
  current: !isAppendix.value && !isIntro.value && section.number === currentSection.value.number,
  complete: isAppendix.value || !isIntro.value && talkPage.value > section.end,
})))
</script>

<template>
  <footer class="nr-footer nr-progress-footer" :class="{ 'nr-progress-appendix': isAppendix }">
    <div
      class="nr-progress"
      role="progressbar"
      :aria-label="progressLabel"
      :aria-valuemin="1"
      :aria-valuemax="talkTotal"
      :aria-valuenow="isAppendix ? talkTotal : talkPage"
      :aria-valuetext="progressLabel"
    >
      <div
        v-for="section in segments"
        :key="section.number"
        class="nr-progress-segment"
        :class="{ 'is-current': section.current, 'is-complete': section.complete }"
        :style="{ flex: section.length }"
        aria-hidden="true"
      >
        <span class="nr-progress-label">{{ section.number }} {{ section.label }}</span>
        <span class="nr-progress-track">
          <span class="nr-progress-fill" :style="{ width: section.fill + '%' }"></span>
          <span v-if="section.current" class="nr-progress-cursor" :style="{ left: section.fill + '%' }"></span>
        </span>
      </div>
    </div>
    <div class="nr-progress-meta">
      <a href="https://www.netresearch.de/">Netresearch DTT GmbH</a>
      <span class="nr-section-progress">{{ isAppendix ? 'Anhang · nicht mitgezählt' : isIntro ? 'Auftakt' : 'Abschnitt ' + currentSection.number + '/' + sections.length + ' · ' + currentSection.title }}</span>
      <span class="nr-slide-progress">{{ isAppendix ? appendixLabel : 'Folie ' + talkPage + '/' + talkTotal }}</span>
    </div>
  </footer>
</template>
