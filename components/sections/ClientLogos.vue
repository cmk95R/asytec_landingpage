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
  { src: 'https://asytec.com/_next/static/media/austral.3fbdfd80.png', alt: 'Austral' },
  { src: 'https://asytec.com/_next/static/media/toyota2.9b6e8e31.png', alt: 'Toyota', scale: 2.5 },
  { src: 'https://asytec.com/_next/static/media/walmart2.e9e9227c.png', alt: 'Walmart', scale: 2.5 },
  { src: 'https://asytec.com/_next/static/media/telecom-logo-2.b42f343a.png', alt: 'Telecom' },
  { src: 'https://asytec.com/_next/static/media/petrobras2.804d7606.png', alt: 'Petrobras', scale: 2.5 },
  { src: 'https://asytec.com/_next/static/media/modo.0206bd41.png', alt: 'Modo' },
  { src: 'https://asytec.com/_next/static/media/edenor.d3c25ad1.png', alt: 'Edenor' },
  { src: 'https://asytec.com/_next/static/media/pecom.5c92efa0.png', alt: 'Pecom' },
  { src: 'https://asytec.com/_next/static/media/pluspetrol-logo-85781359A8-seeklogo.com.49ed8199.png', alt: 'Pluspetrol' },
  { src: 'https://asytec.com/_next/static/media/sadesa.8c8fc730.png', alt: 'Sadesa', scale: 1.5 },
  { src: 'https://asytec.com/_next/static/media/lesaffre.fdd4a5ac.png', alt: 'Lesaffre', scale: 1.5 },
  { src: 'https://asytec.com/_next/static/media/nutrien.915aac01.png', alt: 'Nutrien' },
  { src: 'https://asytec.com/_next/static/media/cgc.909c5281.png', alt: 'CGC' },
  { src: 'https://asytec.com/_next/static/media/metropol.svg.291bc4c5.png', alt: 'Metropol' },
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
