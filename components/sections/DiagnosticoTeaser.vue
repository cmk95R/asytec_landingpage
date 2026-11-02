<template>
  <section id="diagnostico-teaser" class="relative py-24 bg-white overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center reveal" ref="headerRef">
        <h2 class="section-title">Diagnóstico IA</h2>
        <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full reveal-bar" />
        <p class="section-subtitle max-w-2xl mx-auto mt-5 reveal-sub">
          Evaluación de madurez en IA: 12 indicadores y 4 dimensiones. Al finalizar recibís un informe con
          hallazgos priorizados y un próximo paso concreto.
        </p>
        <div class="mt-10 reveal-sub flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            @click="open"
            class="inline-flex items-center gap-2 px-10 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5"
          >
            Comenzar evaluación
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <NuxtLink
            to="/diagnostico"
            class="inline-flex items-center gap-2 px-6 py-4 text-sm font-heading font-semibold uppercase tracking-wider text-primary-700 transition-colors hover:text-primary-800"
          >
            Ver metodología
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const headerRef = ref(null)
useIntersectionObserver(headerRef, ([{ isIntersecting }]) => {
  if (isIntersecting) headerRef.value?.classList.add('visible')
})

const { open } = useDiagnosticoModal()
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.reveal-bar { transform: scaleX(0); transform-origin: center; transition: transform 0.6s ease; }
.reveal.visible .reveal-bar { transform: scaleX(1); }
.reveal-sub { opacity: 0; transform: translateY(10px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible .reveal-sub { opacity: 1; transform: translateY(0); }
</style>