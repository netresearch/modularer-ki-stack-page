<script setup>
import { useNav } from '@slidev/client'
import { nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import { createLensRenderer } from './image-lens-renderer.js'

const nav = useNav()
const lens = ref(null)
const destination = shallowRef('body')
const zoom = 2.5
const canvas = ref()
const canvasKey = ref(0)
const rendererType = ref('')
let renderer
let forceCanvas = false
let activeImage
let finePointer
let pending
let frame = 0
let mounted = true

function hide() {
  cancelAnimationFrame(frame)
  frame = 0
  pending = undefined
  lens.value = null
  activeImage = undefined
}

async function useCanvasFallback() {
  renderer?.dispose()
  renderer = undefined
  rendererType.value = ''
  forceCanvas = true
  canvasKey.value++
  await nextTick()
  if (mounted) paint()
}

function paint() {
  if (!lens.value || !activeImage || !canvas.value) return
  try {
    renderer ||= createLensRenderer(canvas.value, { forceCanvas, onContextLost: useCanvasFallback })
    renderer.draw(activeImage, lens.value)
    rendererType.value = renderer.type
  } catch {
    if (!forceCanvas) void useCanvasFallback()
    else hide()
  }
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

function update(event) {
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
  const size = Math.min(640, innerWidth - 16, innerHeight - 16)
  if (size < 120) return hide()
  // Keep the focus and deformation center together. Moving the lens away from
  // the pointer at an edge can fold the mapping and mirror letters in its rim.
  // The viewport layer clips the outside portion instead, like a physical lens.
  const left = event.clientX - size / 2
  const top = event.clientY - size / 2
  activeImage = img
  destination.value = img.closest('dialog[open]') || 'body'
  const src = img.currentSrc || img.src
  lens.value = {
    src, x, y, width: box.width, height: box.height, box,
    size, left, top, pointerX: event.clientX, pointerY: event.clientY,
    style: { left: `${left}px`, top: `${top}px`, width: `${size}px`, height: `${size}px` },
  }

}

function move(event) {
  pending = { target: event.target, clientX: event.clientX, clientY: event.clientY, pointerType: event.pointerType }
  if (!frame) frame = requestAnimationFrame(() => {
    frame = 0
    const event = pending
    pending = undefined
    if (event) update(event)
  })
}

function leave(event) {
  if ((event.target === activeImage || event.target === pending?.target) && event.relatedTarget !== event.target) hide()
}

watch(lens, paint, { flush: 'post' })
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
  mounted = false
  hide()
  renderer?.dispose()
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
  <Teleport :to="destination">
    <div v-show="lens" class="nr-image-lens-viewport" aria-hidden="true">
      <div class="nr-image-lens" :data-lens-source="lens?.src" :data-lens-zoom="zoom" :data-lens-x="lens?.x" :data-lens-y="lens?.y" :data-lens-image-width="lens?.width" :data-lens-image-height="lens?.height" :data-lens-size="lens?.size" data-lens-core="0.7" :data-lens-renderer="rendererType" :style="lens?.style">
        <canvas :key="canvasKey" ref="canvas" />
      </div>
    </div>
  </Teleport>
</template>
