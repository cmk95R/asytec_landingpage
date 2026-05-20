<template>
  <section class="relative py-24 overflow-hidden bg-cover bg-center bg-no-repeat" style="background-image: url('/images/fondo%20section.jpg');">
    <!-- Background -->
    

    <div class="relative z-10 max-w-4xl mx-auto px-4 text-center reveal" ref="el">
      <h2 class="font-heading font-extrabold text-4xl md:text-5xl text-gray-900 mb-6">
        ¿Te gustaría formar parte<br class="hidden md:block"/>de nuestro equipo?
      </h2>
      <p class="text-gray-700 text-lg mb-10 max-w-xl mx-auto">
        En ASYTEC siempre estamos en búsqueda de nuevos talentos. Encontrá la oportunidad ideal para vos.
      </p>
      <a
        href="https://www.linkedin.com/company/asytec/jobs/"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-3 px-10 py-4 bg-[#3A5FBA] text-white font-heading font-bold
        text-sm tracking-wider uppercase rounded-lg transition-all duration-300
        hover:shadow-2xl hover:-translate-y-1 hover:bg-[#2b488f]"
      >
        VER BÚSQUEDAS
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const el = ref(null)
useIntersectionObserver(el, ([{ isIntersecting }]) => {
  if (isIntersecting) el.value?.classList.add('visible')
}, { threshold: 0.3 })
</script>
