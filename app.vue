<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
const route = useRoute()

watch(() => route.hash, (hash) => {
  if (!hash) return
  setTimeout(() => {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, 200)
}, { immediate: true })
</script>
