<script setup>
defineProps({ name: String })
const paths = {
  quality: ['M12 3 20 6v6c0 5-8 9-8 9s-8-4-8-9V6Z', 'm8 12 3 3 5-6'],
  operations: ['M5 3v7m0 4v7M12 3v2m0 4v12M19 3v11m0 4v3', 'M2 10h6v4H2zM9 5h6v4H9zM16 14h6v4h-6z'],
  data: ['M20 6c0 1.7-3.6 3-8 3S4 7.7 4 6s3.6-3 8-3 8 1.3 8 3Z', 'M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3'],
  responsibility: ['M14 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z', 'M3 21v-3a6 6 0 0 1 11-3', 'm15 18 2 2 5-6'],
}
</script>
<template>
  <svg class="nr-pictogram" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path v-for="(d, i) in paths[name] || []" :key="i" :d="d" />
  </svg>
</template>
