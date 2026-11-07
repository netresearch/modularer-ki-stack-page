<script setup>
import { useNav } from '@slidev/client'
import { allowSlideNavigation, handlesSlideLink, useSlideReturn } from '../composables/useSlideReturn'
const props = defineProps({ page: { type: Number, required: true }, printLabel: Boolean, quiet: Boolean, back: Boolean })
const { isPrintMode } = useNav()
const { jumpTo, slideHref } = useSlideReturn()

function follow(event) {
  if (!handlesSlideLink(event))
    return
  event.preventDefault()
  event.currentTarget.blur()
  void jumpTo(props.page, { back: props.back })
}
</script>
<template>
  <a v-if="!isPrintMode" :href="slideHref(page)" class="nr-jump" :class="{ 'nr-jump-quiet': quiet }" :title="`Folie ${page}`" @click="follow" @keydown="allowSlideNavigation">
    <span v-if="!quiet" class="nr-link-kind">Folie</span><slot /><span v-if="!quiet" class="nr-jump-arrow" aria-hidden="true">→</span>
  </a>
  <span v-else-if="printLabel || quiet" class="nr-jump-print"><slot /></span>
</template>

<style scoped>
a.nr-jump { display: inline-flex; align-items: center; gap: .4em; text-decoration: none; }
.nr-jump-arrow { flex: none; }
a.nr-jump.nr-jump-quiet,
a.nr-jump.nr-jump-quiet:hover {
  display: inline;
  padding: 0;
  border: 0!important;
  border-radius: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: inherit;
  text-decoration: none!important;
}
a.nr-jump.nr-jump-quiet:focus-visible { outline: 3px solid var(--nr-focus); outline-offset: 6px; }
</style>
