<script setup>
import { useNav } from '@slidev/client'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
const props = defineProps({
  file: String,
  alt: String,
  zoom: { type: Number, default: 1 },
  focus: { type: String, default: '50% 50%' },
})
const { isPrintMode } = useNav()
const base = import.meta.env.BASE_URL
const frame = ref(null)
const size = ref({ width: 0, height: 0 })
const natural = ref({ width: 0, height: 0 })
let observer

function measure() {
  if (!frame.value?.clientWidth || !frame.value.clientHeight) return
  const style = getComputedStyle(frame.value)
  size.value = {
    width: parseFloat(style.width) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth),
    height: parseFloat(style.height) - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth),
  }
}
function loaded(event) {
  natural.value = { width: event.target.naturalWidth, height: event.target.naturalHeight }
  measure()
}
function focusFraction(value = '50%') {
  if (value === 'left' || value === 'top') return 0
  if (value === 'right' || value === 'bottom') return 1
  return Number.isFinite(parseFloat(value)) ? Math.max(0, Math.min(1, parseFloat(value) / 100)) : .5
}
const imageStyle = computed(() => {
  const { width, height } = size.value
  if (!width || !height || !natural.value.width || !natural.value.height) return {}
  const fit = Math.min(width / natural.value.width, height / natural.value.height)
  const paintedWidth = natural.value.width * fit, paintedHeight = natural.value.height * fit
  // Start with the established contain-based zoom. Increase only as far as
  // necessary to fill the frame; clamp the crop so focus cannot expose bars.
  const scale = Math.max(1, props.zoom, width / paintedWidth, height / paintedHeight)
  const [x, y] = props.focus.split(/\s+/).map(focusFraction)
  const offsetX = (width - paintedWidth) / 2
  const clamp = (value, minimum) => Math.min(0, Math.max(minimum, value))
  const left = clamp(offsetX * scale - (scale - 1) * width * (x ?? .5), width - paintedWidth * scale)
  const top = clamp(-(scale - 1) * height * (y ?? .5), height - paintedHeight * scale)
  return { '--nr-image-scale': scale, '--nr-image-x': `${left - offsetX * scale}px`, '--nr-image-y': `${top}px` }
})
watch(frame, (element, previous) => {
  if (previous) observer?.unobserve(previous)
  if (element) observer?.observe(element)
  measure()
}, { flush: 'post' })
onMounted(() => {
  observer = new ResizeObserver(measure)
  if (frame.value) observer.observe(frame.value)
  measure()
})
onUnmounted(() => observer?.disconnect())

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
  <span v-if="isPrintMode" ref="frame" class="nr-original" :style="imageStyle">
    <img draggable="false" class="nr-screenshot" :src="base + file" :alt="alt" @load="loaded" />
  </span>
  <button v-else type="button" ref="frame" class="nr-original" :style="imageStyle" aria-haspopup="dialog" :aria-label="alt ? 'Bild vergrößern: ' + alt : 'Bild vergrößern'" title="Bild vergrößern" @click.stop="openImage" @keydown="allowSlideNavigation">
    <img draggable="false" class="nr-screenshot" :src="base + file" :alt="alt" @load="loaded" />
    <span class="nr-image-zoom-hint" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5M10.5 7.5v6M7.5 10.5h6" />
      </svg>
    </span>
  </button>
</template>
