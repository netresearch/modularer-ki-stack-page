<script setup>
import { allowSlideNavigation, handlesSlideLink, useSlideReturn } from '../composables/useSlideReturn'

const { returnPage, returnToSource, slideHref } = useSlideReturn()

function follow(event) {
  if (!handlesSlideLink(event))
    return
  event.preventDefault()
  event.currentTarget.blur()
  void returnToSource()
}
</script>

<template>
  <a v-if="returnPage" class="nr-return-link" :href="slideHref(returnPage)" :title="`Zum Ausgangspunkt: Folie ${returnPage}`" @click="follow" @keydown="allowSlideNavigation">
    <span aria-hidden="true">←</span> Zurück zu Folie {{ returnPage }}
  </a>
</template>

<style scoped>
.nr-return-link { justify-self: center; padding: 3px 8px; color: var(--nr-primary-text); font-weight: 600; white-space: nowrap; }
.nr-return-link:hover { text-decoration: underline; text-underline-offset: 3px; }
.nr-return-link:focus-visible { outline: 3px solid var(--nr-focus); outline-offset: 3px; }
@media print { .nr-return-link { display: none!important; } }
</style>
