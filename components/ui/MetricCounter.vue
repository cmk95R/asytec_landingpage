<template>
  <div ref="el" class="flex flex-col items-center text-center reveal" :style="`transition-delay: ${delay}ms`">
    <img :src="icon" :alt="label" class="w-14 h-14 mb-3 object-contain" />
    <div class="metric-number">{{ displayValue }}+</div>
    <div class="text-gray-500 font-body font-medium mt-1">{{ label }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  value: { type: Number, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
  delay: { type: Number, default: 0 },
})

const el = ref(null)
const displayValue = ref(0)
let started = false

const animateCount = () => {
  if (started) return
  started = true
  el.value?.classList.add('visible')
  const duration = 2000
  const start = performance.now()
  const update = (time) => {
    const elapsed = time - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValue.value = Math.round(eased * props.value)
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    animateCount()
    stop()
  }
}, { threshold: 0.5 })
</script>
