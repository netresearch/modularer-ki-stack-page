<script setup>
import { computed, unref } from 'vue'
import { useSlideContext } from '@slidev/client'

// These ranges count only the talk; references and reserve slides come afterwards.
const props = defineProps({
  sections: {
    type: Array,
    default: () => [
      { number: 1, label: 'Möglichkeiten', title: 'Möglichkeiten', start: 1, end: 7 },
      { number: 2, label: 'Bedarf', title: 'Anforderungen', start: 8, end: 9 },
      { number: 3, label: 'nr-llm', title: 'nr-llm', start: 10, end: 18 },
      { number: 4, label: 'Agenten', title: 'Agentenwege', start: 19, end: 20 },
      { number: 5, label: 'Einordnung', title: 'Einordnung & Austausch', start: 21, end: 23 },
    ],
  },
})
const { $page, $frontmatter } = useSlideContext()
const frontmatter = computed(() => unref($frontmatter))
const talkTotal = computed(() => props.sections.at(-1)?.end || 23)
const rawPage = computed(() => Number(frontmatter.value.talkPage || unref($page)))
const isAppendix = computed(() => Boolean(frontmatter.value.appendix) || rawPage.value > talkTotal.value)
const talkPage = computed(() => Math.max(1, Math.min(rawPage.value, talkTotal.value)))
const currentSection = computed(() => props.sections.find(section => talkPage.value >= section.start && talkPage.value <= section.end) || props.sections[0])
const appendixLabel = computed(() => frontmatter.value.appendix === 'technical' ? 'Reserve für Rückfragen' : 'Links & Quellen')
const progressLabel = computed(() => isAppendix.value
  ? 'Vortrag abgeschlossen. Anhang: ' + appendixLabel.value + '. Nicht in der Folienzahl enthalten.'
  : `Abschnitt ${currentSection.value.number} von ${props.sections.length}: ${currentSection.value.title}. Folie ${talkPage.value} von ${talkTotal.value}.`)
const segments = computed(() => props.sections.map(section => ({
  ...section,
  length: section.end - section.start + 1,
  fill: isAppendix.value ? 100 : Math.max(0, Math.min(100, (talkPage.value - section.start + 1) / (section.end - section.start + 1) * 100)),
  current: !isAppendix.value && section.number === currentSection.value.number,
  complete: isAppendix.value || talkPage.value > section.end,
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
      <span class="nr-section-progress">{{ isAppendix ? 'Anhang · nicht mitgezählt' : 'Abschnitt ' + currentSection.number + '/' + sections.length + ' · ' + currentSection.title }}</span>
      <span class="nr-slide-progress">{{ isAppendix ? appendixLabel : 'Folie ' + talkPage + '/' + talkTotal }}</span>
    </div>
  </footer>
</template>
