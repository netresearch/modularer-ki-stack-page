<script setup>
import { useNav } from '@slidev/client'
defineProps({ file: String, alt: String })
const { isPrintMode } = useNav()
const base = import.meta.env.BASE_URL
</script>
<template><component :is="isPrintMode ? 'span' : 'a'" class="nr-original" :href="isPrintMode ? undefined : base + file" :target="isPrintMode ? undefined : '_blank'" :rel="isPrintMode ? undefined : 'noopener'" :aria-label="isPrintMode ? undefined : alt + ' – Originalbild öffnen'"><img class="nr-screenshot" :src="base + file" :alt="alt" /></component></template>
