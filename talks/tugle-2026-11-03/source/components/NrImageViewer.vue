<script setup>
import { lockShortcuts, useNav } from '@slidev/client'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const nav = useNav()
const dialog = ref()
const closeButton = ref()
const image = ref({ src: '', alt: '' })
let trigger
let unlock
const navigationKeys = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '])

async function openImage(event) {
  if (nav.isPrintMode.value || typeof event.detail?.src !== 'string') return
  image.value = { src: event.detail.src, alt: event.detail.alt || 'Screenshot' }
  trigger = event.detail.trigger instanceof HTMLElement ? event.detail.trigger : document.activeElement
  await nextTick()
  if (!dialog.value || dialog.value.open) return
  unlock = lockShortcuts()
  dialog.value.showModal()
  closeButton.value?.focus({ preventScroll: true })
}

function close() {
  if (!dialog.value?.open) return
  dialog.value.close()
  finishClose()
}

function finishClose() {
  // close() hides the native dialog synchronously; its later "close" event
  // must not refocus the trigger after the user has already navigated onward.
  const returnFocus = trigger
  const releaseShortcuts = unlock
  trigger = undefined
  unlock = undefined
  if (returnFocus instanceof HTMLElement && returnFocus.isConnected)
    returnFocus.focus({ preventScroll: true })
  releaseShortcuts?.()
}

function afterClose() {
  // Also cover a native close, without letting an old queued event unlock a
  // viewer that has already been reopened.
  if (!dialog.value?.open) finishClose()
}

function guardKeyboard(event) {
  if (!dialog.value?.open) return
  // Native Tab navigation remains available inside the modal. Stop Slidev's
  // global listeners from interpreting any key as a presentation shortcut.
  event.stopImmediatePropagation()
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
  } else if (navigationKeys.has(event.key) && !(event.key === ' ' && event.target === closeButton.value)) {
    event.preventDefault()
  }
}

function guardWheel(event) {
  if (dialog.value?.open) event.stopImmediatePropagation()
}

watch(nav.currentSlideNo, close)
onMounted(() => {
  window.addEventListener('nr:open-image', openImage)
  window.addEventListener('keydown', guardKeyboard, true)
  // Key releases still reach Slidev while its shortcuts are locked, so a key
  // pressed before opening the dialog cannot remain logically held afterwards.
  window.addEventListener('wheel', guardWheel, { capture: true, passive: true })
})
onUnmounted(() => {
  window.removeEventListener('nr:open-image', openImage)
  window.removeEventListener('keydown', guardKeyboard, true)
  window.removeEventListener('wheel', guardWheel, true)
  close()
  unlock?.()
})
</script>

<template>
  <Teleport to="body">
    <dialog v-if="!nav.isPrintMode.value" ref="dialog" class="nr-image-viewer" role="dialog" aria-modal="true" aria-label="Vergrößerter Screenshot" data-no-wheel-navigation @click.self="close" @cancel.prevent="close" @close="afterClose">
      <div class="nr-image-viewer-panel" @click.self="close">
        <div class="nr-image-viewer-toolbar">
          <p class="nr-image-viewer-title">{{ image.alt }}</p>
          <button ref="closeButton" class="nr-image-viewer-close" type="button" aria-label="Bild schließen" @click="close">Schließen <span aria-hidden="true">· Esc</span></button>
        </div>
        <div class="nr-image-viewer-image" @click.self="close"><img draggable="false" v-if="image.src" :src="image.src" :alt="image.alt" @click="close" /></div>
      </div>
    </dialog>
  </Teleport>
</template>
