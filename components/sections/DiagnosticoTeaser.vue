<template>
  <section id="diagnostico-teaser" class="relative py-24 bg-white overflow-hidden">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center reveal" ref="headerRef">
        <h2 class="section-title">Diagnóstico IA</h2>
        <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full reveal-bar" />
        <p class="section-subtitle max-w-2xl mx-auto mt-5 reveal-sub">
          Evaluá la madurez tecnológica de tu empresa en 5 minutos. 17 preguntas, 5 áreas clave.
        </p>
        <div class="mt-10 reveal-sub">
          <NuxtLink
            to="/diagnostico"
            class="inline-flex items-center gap-2 px-10 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5"
          >
            Empezar diagnóstico
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
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