<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'
const props = defineProps({ href: { type: String, required: true }, printHref: String, screenOnly: Boolean })
const { isPrintMode } = useNav()
const base = import.meta.env.BASE_URL
const isRemote = computed(() => /^https?:\/\//i.test(props.href))
const isScreenshot = computed(() => /^\.?\/screens\//.test(props.href))
const url = computed(() => isPrintMode.value && props.printHref ? props.printHref : isRemote.value ? props.href : base + props.href.replace(/^\.?\//, ''))

function openImage(event) {
  const slide = event.currentTarget.closest('.slidev-layout')
  window.dispatchEvent(new CustomEvent('nr:open-image', {
    detail: {
      src: url.value,
      alt: slide?.querySelector('.nr-screenshot')?.getAttribute('alt') || 'Screenshot',
      trigger: event.currentTarget,
    },
  }))
}

function allowSlideNavigation(event) {
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key))
    event.currentTarget.blur()
}
</script>

<template>
  <button v-if="isScreenshot && !isPrintMode" type="button" class="nr-image-link" aria-haspopup="dialog" @click.stop="openImage" @keydown="allowSlideNavigation"><slot /></button>
  <a v-else-if="!isScreenshot && !(screenOnly && isPrintMode) && (!isPrintMode || isRemote || printHref)" :href="url" target="_blank" rel="noopener"><slot /></a>
</template>
