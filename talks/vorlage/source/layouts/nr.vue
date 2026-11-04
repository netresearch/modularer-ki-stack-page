<script setup>
import NrProgress from '../components/NrProgress.vue'
import sections from '../progress-sections.json'
const base = import.meta.env.BASE_URL
</script>
<template>
  <div class="slidev-layout nr">
    <a class="nr-logo" href="https://www.netresearch.de/" aria-label="Netresearch DTT GmbH"><img :src="base + 'netresearch-symbol.svg'" alt="Netresearch DTT GmbH" /></a>
    <div class="nr-content"><slot /></div>
    <NrProgress :sections="sections" />
  </div>
</template>
