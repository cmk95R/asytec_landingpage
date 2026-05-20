<template>
  <section id="about" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16 reveal" ref="headerRef">
        <h2 class="section-title">¿Quiénes somos?</h2>
        <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 mb-6 rounded-full" />
        <p class="section-subtitle max-w-2xl mx-auto">
          Expertos en tecnología y consultoría, liderando el camino desde 1993. Impulsando la innovación tecnológica
          desde hace más de 30 años. Transformamos procesos corporativos con soluciones tecnológicas de vanguardia.
        </p>
      </div>

      <!-- Metrics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16">
        <MetricCounter
          v-for="(metric, i) in metrics"
          :key="metric.label"
          class="scale-90 origin-top transition-transform"
          :value="metric.value"
          :label="metric.label"
          :icon="metric.icon"
          :delay="i * 150"
        />
      </div>

      <!-- Decorative separator -->
      
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const headerRef = ref(null)
useIntersectionObserver(headerRef, ([{ isIntersecting }]) => {
  if (isIntersecting) headerRef.value?.classList.add('visible')
}, { threshold: 0.2 })

const metrics = [
  {
    value: 500,
    label: 'Proyectos',
    icon: '/images/1.5128f91e.png',
  },
  {
    value: 150,
    label: 'Profesionales',
    icon: '/images/2.58c30918.png',
  },
  {
    value: 200,
    label: 'Clientes',
    icon: '/images/12.ef88365d.png',
  },
  {
    value: 5,
    label: 'Países',
    icon: '/images/4.921542f6.png',
  },
]
</script>
