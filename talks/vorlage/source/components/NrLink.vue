<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'
const props = defineProps({ href: { type: String, required: true }, printHref: String, screenOnly: Boolean, kind: String })
const { isPrintMode } = useNav()
const base = import.meta.env.BASE_URL
const isRemote = computed(() => /^https?:\/\//i.test(props.href))
const isScreenshot = computed(() => /^\.?\/screens\//.test(props.href))
const url = computed(() => isPrintMode.value && props.printHref ? props.printHref : isRemote.value ? props.href : base + props.href.replace(/^\.?\//, ''))
const destinationKind = computed(() => {
  if (props.kind) return props.kind
  if (isScreenshot.value) return 'Bild'
  if (props.href.includes('pruefbeispiel/')) return 'Beispiel'
  const target = new URL(props.href, 'https://presentation.invalid/')
  if (target.hostname === 'typo3-demo.netresearch.de') return 'Demo'
  if (target.hostname === 'github.com') return 'GitHub'
  if (target.pathname.includes('/vortraege/')) return 'Vortrag'
  if (target.hostname.startsWith('docs.') || ['modelcontextprotocol.io', 'a2a-protocol.org'].includes(target.hostname) || target.hostname === 'symfony.com' && target.pathname.startsWith('/doc/')) return 'Doku'
  if (target.hostname.endsWith('netresearch.de') && target.pathname.startsWith('/blog/')) return 'Artikel'
  if (target.hostname.endsWith('.github.io')) return 'Projekt'
  return 'Web'
})

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
  <a v-else-if="!isScreenshot && !(screenOnly && isPrintMode) && (!isPrintMode || isRemote || printHref)" class="nr-link" :href="url" target="_blank" rel="noopener" :title="destinationKind + ' · öffnet in einem neuen Tab'"><span class="nr-link-kind">{{ destinationKind }}</span><span class="nr-link-label"><slot /></span><span class="nr-link-external" aria-hidden="true">↗</span><span class="nr-link-note"> – öffnet in einem neuen Tab</span></a>
</template>
