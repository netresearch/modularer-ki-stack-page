<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'
const props = defineProps({ href: { type: String, required: true } })
const { isPrintMode } = useNav()
const base = import.meta.env.BASE_URL
const isRemote = computed(() => /^https?:\/\//i.test(props.href))
const url = computed(() => isRemote.value ? props.href : base + props.href.replace(/^\.?\//, ''))
</script>
<template><a v-if="!isPrintMode || isRemote" :href="url" target="_blank" rel="noopener"><slot /></a></template>
