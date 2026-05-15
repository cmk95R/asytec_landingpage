<template>
  <section class="relative py-24 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-600" />
    <div class="absolute inset-0 opacity-10"
         style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" />

    <div class="relative z-10 max-w-4xl mx-auto px-4 text-center reveal" ref="el">
      <p class="text-blue-300 font-heading font-semibold tracking-widest uppercase text-sm mb-4">Súmate a nuestro equipo</p>
      <h2 class="font-heading font-extrabold text-4xl md:text-5xl text-white mb-6">
        ¿Te gustaría formar parte<br class="hidden md:block"/>de nuestro equipo?
      </h2>
      <p class="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
        En ASYTEC siempre estamos en búsqueda de nuevos talentos. Encontrá la oportunidad ideal para vos.
      </p>
      <a
        href="https://www.linkedin.com/company/asytec/jobs/"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-3 px-10 py-4 bg-white text-primary-700 font-heading font-bold
               text-sm tracking-wider uppercase rounded-sm transition-all duration-300
               hover:shadow-2xl hover:-translate-y-1 hover:bg-blue-50"
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
