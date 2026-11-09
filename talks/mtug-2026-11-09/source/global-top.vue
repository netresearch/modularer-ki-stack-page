<script setup lang="ts">
import { useNav } from '@slidev/client'
import { onMounted, onUnmounted } from 'vue'
import NrImageViewer from './components/NrImageViewer.vue'
import NrImageLens from './components/NrImageLens.vue'

const nav = useNav()
const threshold = 72
const gesturePause = 220
const cooldown = 700
let lastEventAt = 0
let cooldownUntil = 0
let accumulated = 0
let consumed = false

const editable = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"], .monaco-editor, .cm-editor, .CodeMirror'
const interactive = `${editable}, [role="dialog"], [aria-modal="true"], [role="menu"], [data-no-wheel-navigation]`

function visible(element: Element) {
  const style = getComputedStyle(element)
  return element.getClientRects().length > 0
    && style.visibility !== 'hidden'
    && style.display !== 'none'
    && style.opacity !== '0'
}

function overlayOpen() {
  // Slidev 53 uses z-modal for its overview and dialogs; floating-vue uses
  // v-popper__popper--shown for the settings and synchronization menus.
  return [...document.querySelectorAll('.z-modal, .v-popper__popper--shown, dialog[open], [role="dialog"], [aria-modal="true"]')].some(visible)
}

function ownsScrolling(event: WheelEvent) {
  if (document.activeElement instanceof Element && document.activeElement.closest(editable))
    return true
  for (const item of event.composedPath()) {
    if (!(item instanceof Element))
      continue
    if (item.matches(interactive))
      return true
    const style = getComputedStyle(item)
    if (/(auto|scroll|overlay)/.test(style.overflowY) && item.scrollHeight > item.clientHeight + 1)
      return true
  }
  return false
}

function onWheel(event: WheelEvent) {
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
    return
  if (!nav.isPlaying.value || nav.isPresenter.value || nav.isPrintMode.value)
    return
  if (!Number.isFinite(event.deltaY) || event.deltaY === 0 || Math.abs(event.deltaX) >= Math.abs(event.deltaY))
    return
  if (overlayOpen() || ownsScrolling(event))
    return

  const now = performance.now()
  const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
  const delta = event.deltaY * unit
  if (now - lastEventAt > gesturePause) {
    accumulated = 0
    consumed = false
  }
  lastEventAt = now

  // Only the normal presentation surface claims the wheel gesture. Scrollable
  // descendants and application controls have already returned above.
  if (event.cancelable)
    event.preventDefault()
  if (consumed || now < cooldownUntil)
    return
  if (Math.sign(accumulated) !== Math.sign(delta))
    accumulated = 0
  accumulated += delta
  if (Math.abs(accumulated) < threshold)
    return

  consumed = true
  cooldownUntil = now + cooldown
  if (accumulated > 0 && nav.currentSlideNo.value < nav.total.value)
    void nav.nextSlide()
  else if (accumulated < 0 && nav.currentSlideNo.value > 1)
    void nav.prevSlide()
}

onMounted(() => window.addEventListener('wheel', onWheel, { passive: false }))
onUnmounted(() => window.removeEventListener('wheel', onWheel))
</script>

<template>
  <NrImageViewer />
  <NrImageLens />
</template>
