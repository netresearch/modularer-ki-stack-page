<script setup>
import { useNav } from '@slidev/client'
defineProps({ page: { type: Number, required: true }, printLabel: Boolean })
const { go, isPrintMode } = useNav()

function allowSlideNavigation(event) {
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key))
    event.currentTarget.blur()
}
</script>
<template><button v-if="!isPrintMode" type="button" class="nr-jump" @click="go(page)" @keydown="allowSlideNavigation"><slot /></button><span v-else-if="printLabel" class="nr-jump-print"><slot /></span></template>
