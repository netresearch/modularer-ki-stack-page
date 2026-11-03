<script setup>
import { useNav } from '@slidev/client'
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'

const nav = useNav()
const lens = ref(null)
const destination = shallowRef('body')
const zoom = 2.5
let activeImage
let finePointer

const clamp = (value, min, max) => Math.max(min, Math.min(value, max))

function hide() {
  lens.value = null
  activeImage = undefined
}

function offset(value, freeSpace, scale) {
  if (value.endsWith('%')) return freeSpace * parseFloat(value) / 100
  if (value === 'center') return freeSpace / 2
  if (value === 'right' || value === 'bottom') return freeSpace
  if (value === 'left' || value === 'top') return 0
  return (parseFloat(value) || 0) * scale
}

function paintedBox(img) {
  const rect = img.getBoundingClientRect()
  const style = getComputedStyle(img)
  const sx = rect.width / img.offsetWidth
  const sy = rect.height / img.offsetHeight
  const pl = parseFloat(style.paddingLeft) || 0
  const pr = parseFloat(style.paddingRight) || 0
  const pt = parseFloat(style.paddingTop) || 0
  const pb = parseFloat(style.paddingBottom) || 0
  const width = (img.clientWidth - pl - pr) * sx
  const height = (img.clientHeight - pt - pb) * sy
  const left = rect.left + (img.clientLeft + pl) * sx
  const top = rect.top + (img.clientTop + pt) * sy
  if (width <= 0 || height <= 0) return null
  let drawnWidth = width
  let drawnHeight = height
  if (style.objectFit === 'contain' || style.objectFit === 'cover') {
    const fit = (style.objectFit === 'cover' ? Math.max : Math.min)(width / img.naturalWidth, height / img.naturalHeight)
    drawnWidth = img.naturalWidth * fit
    drawnHeight = img.naturalHeight * fit
  }
  const [px = '50%', py = '50%'] = style.objectPosition.split(/\s+/)
  return {
    left: left + offset(px, width - drawnWidth, sx),
    top: top + offset(py, height - drawnHeight, sy),
    width: drawnWidth,
    height: drawnHeight,
    clip: { left, top, right: left + width, bottom: top + height },
  }
}

function move(event) {
  if (event.pointerType !== 'mouse' || !finePointer?.matches || nav.isPrintMode.value) return hide()
  const img = event.target instanceof HTMLImageElement && event.target.matches('.nr-screenshot, .nr-image-viewer-image img') ? event.target : null
  if (!img?.complete || !img.naturalWidth || !img.naturalHeight) return hide()
  const box = paintedBox(img)
  if (!box) return hide()
  const x = event.clientX - box.left
  const y = event.clientY - box.top
  // The image element may contain letterboxing. Only actual image pixels magnify.
  if (x < 0 || y < 0 || x > box.width || y > box.height
    || event.clientX < box.clip.left || event.clientX > box.clip.right
    || event.clientY < box.clip.top || event.clientY > box.clip.bottom) return hide()
  const size = Math.min(232, innerWidth - 16, innerHeight - 16)
  if (size < 120) return hide()
  let left = event.clientX - size / 2
  let top = event.clientY - size / 2
  // Keep the lens on the picture when it fits, then within the viewport.
  if (box.width >= size) left = clamp(left, box.left, box.left + box.width - size)
  if (box.height >= size) top = clamp(top, box.top, box.top + box.height - size)
  left = clamp(left, 8, innerWidth - size - 8)
  top = clamp(top, 8, innerHeight - size - 8)
  activeImage = img
  destination.value = img.closest('dialog[open]') || 'body'
  const src = img.currentSrc || img.src
  lens.value = {
    src, x, y, width: box.width, height: box.height,
    style: {
      left: `${left}px`, top: `${top}px`, width: `${size}px`, height: `${size}px`,
      backgroundImage: `url(${JSON.stringify(src)})`,
      backgroundSize: `${box.width * zoom}px ${box.height * zoom}px`,
      // Preserve the pixel under the pointer even when the lens is edge-clamped.
      backgroundPosition: `${event.clientX - left - x * zoom}px ${event.clientY - top - y * zoom}px`,
    },
  }
}

function leave(event) {
  if (event.target === activeImage && event.relatedTarget !== activeImage) hide()
}

watch(nav.currentSlideNo, hide)
watch(nav.isPrintMode, hide)
onMounted(() => {
  finePointer = matchMedia('(any-hover: hover) and (any-pointer: fine)')
  finePointer.addEventListener('change', hide)
  window.addEventListener('pointermove', move, { passive: true })
  window.addEventListener('pointerout', leave, { passive: true })
  window.addEventListener('pointerdown', hide, true)
  window.addEventListener('keydown', hide, true)
  window.addEventListener('blur', hide)
  window.addEventListener('resize', hide)
  window.addEventListener('scroll', hide, true)
  window.addEventListener('nr:open-image', hide)
  window.addEventListener('beforeprint', hide)
  document.addEventListener('close', hide, true)
  document.addEventListener('visibilitychange', hide)
})
onUnmounted(() => {
  finePointer?.removeEventListener('change', hide)
  window.removeEventListener('pointermove', move)
  window.removeEventListener('pointerout', leave)
  window.removeEventListener('pointerdown', hide, true)
  window.removeEventListener('keydown', hide, true)
  window.removeEventListener('blur', hide)
  window.removeEventListener('resize', hide)
  window.removeEventListener('scroll', hide, true)
  window.removeEventListener('nr:open-image', hide)
  window.removeEventListener('beforeprint', hide)
  document.removeEventListener('close', hide, true)
  document.removeEventListener('visibilitychange', hide)
})
</script>

<template>
  <Teleport v-if="lens" :to="destination">
    <div class="nr-image-lens" aria-hidden="true" :data-lens-source="lens.src" :data-lens-zoom="zoom" :data-lens-x="lens.x" :data-lens-y="lens.y" :data-lens-image-width="lens.width" :data-lens-image-height="lens.height" :style="lens.style" />
  </Teleport>
</template>
