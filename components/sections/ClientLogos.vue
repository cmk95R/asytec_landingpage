<template>
  <section class="py-14 bg-gray-50 overflow-hidden border-y border-gray-100">
    <div class="max-w-7xl mx-auto px-4 mb-8 text-center reveal" ref="titleRef">
    </div>

    <!-- Infinite scroll track -->
    <div class="relative">
      <div class="flex gap-12 logos-track">
        <div
          v-for="logo in [...logos, ...logos]"
          :key="logo.alt + Math.random()"
          class="flex-shrink-0 flex items-center justify-center"
          style="width: 140px; height: 60px"
        >
          <img
            :src="logo.src"
            :alt="logo.alt"
            class="max-h-12 max-w-full object-contain"
            :style="logo.scale ? `transform: scale(${logo.scale})` : ''"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const titleRef = ref(null)
const { stop } = useIntersectionObserver(titleRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    titleRef.value?.classList.add('visible')
    stop()
  }
})

const logos = [
  { src: '/images/austral.png', alt: 'Austral' },
  { src: '/images/toyota2.png', alt: 'Toyota', scale: 1.5 },
  { src: '/images/walmart2.png', alt: 'Walmart', scale: 2.5 },
  { src: '/images/telecom.png', alt: 'Telecom' },
  { src: '/images/petrobras2.png', alt: 'Petrobras', scale: 2.5 },
  { src: '/images/modo.png', alt: 'Modo' },
  { src: '/images/edenor.png', alt: 'Edenor' },
  { src: '/images/pecom.png', alt: 'Pecom' },
  { src: '/images/pluspetrol.png', alt: 'Pluspetrol' },
  { src: '/images/sadesa.png', alt: 'Sadesa', scale: 1.5 },
  { src: '/images/lesaffre.png', alt: 'Lesaffre', scale: 1.5 },
  { src: '/images/nutrien.png', alt: 'Nutrien' },
  { src: '/images/cgc.png', alt: 'CGC' },
  { src: '/images/metropol.png', alt: 'Metropol' },
]
</script>

<style scoped>
.logos-track {
  animation: logoScroll 35s linear infinite;
  width: max-content;
}
.logos-track:hover {
  animation-play-state: paused;
}
@keyframes logoScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
