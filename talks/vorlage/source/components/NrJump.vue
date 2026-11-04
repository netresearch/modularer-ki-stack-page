<script setup>
import { useNav } from '@slidev/client'
defineProps({ page: { type: Number, required: true }, printLabel: Boolean })
const { go, isPrintMode } = useNav()
</script>
<template><button v-if="!isPrintMode" type="button" class="nr-jump" @click="go(page)"><slot /></button><span v-else-if="printLabel" class="nr-jump-print"><slot /></span></template>
