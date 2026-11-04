<script setup>
import { useNav } from '@slidev/client'
const props = defineProps({ file: String, alt: String })
const { isPrintMode } = useNav()
const base = import.meta.env.BASE_URL

function openImage(event) {
  window.dispatchEvent(new CustomEvent('nr:open-image', {
    detail: { src: base + props.file, alt: props.alt, trigger: event.currentTarget },
  }))
}

function allowSlideNavigation(event) {
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key))
    event.currentTarget.blur()
}
</script>

<template>
  <span v-if="isPrintMode" class="nr-original">
    <img draggable="false" class="nr-screenshot" :src="base + file" :alt="alt" />
  </span>
  <button v-else type="button" class="nr-original" aria-haspopup="dialog" :aria-label="alt + ' – Bild vergrößern'" @click.stop="openImage" @keydown="allowSlideNavigation">
    <img draggable="false" class="nr-screenshot" :src="base + file" :alt="alt" />
  </button>
</template>
