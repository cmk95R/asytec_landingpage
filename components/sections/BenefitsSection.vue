<template>
  <section id="beneficios" class="relative pt-4 pb-24 scroll-mt-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
    <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-40" />
      <div class="absolute bottom-20 right-10 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-30" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-16 reveal" ref="headerRef">
        <h2 class="section-title">Beneficios</h2>
        <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full reveal-bar" />
        <p class="section-subtitle max-w-2xl mx-auto mt-5 reveal-sub">
          En ASYTEC Sistemas cuidamos a nuestro equipo con un programa integral pensado para tu desarrollo personal y profesional.
        </p>
      </div>

      <div ref="gridRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative">
        <article
          v-for="(b, i) in beneficios"
          :key="b.title"
          class="reveal-card text-center relative"
          :style="`transition-delay: ${i * 100}ms`"
        >
          <div
            class="w-24 h-24 rounded-full bg-primary-50 border-2 border-primary-200 mx-auto flex items-center justify-center transition-all duration-500 group hover:bg-primary-600 hover:border-primary-600 hover:scale-110 hover:shadow-xl"
          >
            <div
              class="w-12 h-12 text-primary-600 flex items-center justify-center transition-colors duration-500 group-hover:text-white"
              v-html="b.icon"
            />
          </div>

          <h3 class="mt-6 text-lg font-heading font-bold uppercase tracking-wider text-gray-900">{{ b.title }}</h3>

          <ul class="mt-4 space-y-2 text-sm text-gray-600">
            <li v-for="item in b.items" :key="item" class="leading-relaxed">
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const headerRef = ref(null)
const gridRef = ref(null)

useIntersectionObserver(headerRef, ([{ isIntersecting }]) => {
  if (isIntersecting) headerRef.value?.classList.add('visible')
})
useIntersectionObserver(gridRef, ([{ isIntersecting }]) => {
  if (isIntersecting) gridRef.value?.classList.add('cards-visible')
})

const benefits = [
  {
    title: 'Educación',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3 1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z"/></svg>',
    items: [
      'Capacitaciones técnicas',
      'Certificaciones profesionales',
      'Becas y cursos online',
    ],
  },
  {
    title: 'Compras',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1Zm-9-1a2 2 0 0 1 4 0v1h-4Zm6 4a3 3 0 0 1-6 0v-1h2v1a1 1 0 0 0 2 0v-1h2Z"/></svg>',
    items: [
      'Club de beneficios exclusivo',
      'Descuentos en comercios',
      'Convenios comerciales',
    ],
  },
  {
    title: 'Idiomas',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 17.93A8 8 0 0 1 4.07 13H7c.5 2.42 1.39 4.45 2.5 5.93-.5.07-1 .07-1.5 0Zm0-15.86V6.5h2.5c-.5 1.5-1.5 2.78-2.5 3.43V11h3c-.5 1.86-1.5 3.43-3 4.43 1.5.5 3 .5 4.5 0-1.5-1-2.5-2.57-3-4.43h3V9.93c-1-.65-2-1.93-2.5-3.43H14V4.07A8 8 0 0 0 11 4.07ZM4.26 11A8 8 0 0 1 6.07 6.5h2.43c-.5 1.5-1 2.93-1.5 4.5H4.26Zm9.74 0c.5-1.57 1-3 1.5-4.5h2.43A8 8 0 0 1 19.74 11h-5.74Z"/></svg>',
    items: [
      'Clases de inglés',
      'Plataforma online 24/7',
      'Niveles personalizados',
    ],
  },
  {
    title: 'Actividad Física',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M20.57 14.86 22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29Z"/></svg>',
    items: [
      'Gimnasio y sportclubs',
      'Subsidio deportivo mensual',
      'Eventos deportivos internos',
    ],
  },
]

const beneficios = benefits
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
.reveal-card {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.7s cubic-bezier(0.5, 0, 0, 1);
}
.cards-visible .reveal-card {
  opacity: 1;
  transform: translateY(0);
}
</style>
