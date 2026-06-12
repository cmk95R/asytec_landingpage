<template>
  <section id="home" class="relative h-screen min-h-[600px] overflow-hidden">
    <!-- Swiper Carousel -->
    <div class="swiper hero-swiper h-full">
      <div class="swiper-wrapper">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          class="swiper-slide relative"
        >
          <!-- Background image -->
          <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[8000ms] ease-out"
            :style="`background-image: url('${slide.image}')`"
          />
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/70 to-primary-700/40" />

          <!-- Content -->
          <div class="relative z-10 h-full flex items-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-8 w-full">
              <div class="max-w-2xl">
                <div
                  class="inline-block w-16 h-1 bg-blue-400 mb-6 opacity-0"
                  :class="{ 'animate-fade-in': activeIndex === i }"
                  style="animation-delay: 0.1s; animation-fill-mode: forwards"
                />
                <h1
                  class="font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 opacity-0"
                  :class="{ 'animate-fade-up': activeIndex === i }"
                  style="animation-delay: 0.2s; animation-fill-mode: forwards"
                >
                  {{ slide.title }}
                </h1>
                <p
                  class="text-blue-100 text-lg mb-8 opacity-0"
                  :class="{ 'animate-fade-up': activeIndex === i }"
                  style="animation-delay: 0.4s; animation-fill-mode: forwards"
                >
                  {{ slide.subtitle }}
                </p>
                <div
                  class="opacity-0"
                  :class="{ 'animate-fade-up': activeIndex === i }"
                  style="animation-delay: 0.6s; animation-fill-mode: forwards"
                >
                  <a
                    href="/Brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-outline !rounded-lg"
                  >
                    VER BROCHURE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="swiper-pagination !bottom-8" />

      <!-- Navigation arrows -->
      <div class="swiper-button-prev !text-white !w-8 !h-10 after:!text-lg  !rounded-full backdrop-blur-sm hover:!bg-white/40 transition-all" />
      <div class="swiper-button-next !text-white !w-8 !h-10 after:!text-lg  !rounded-full backdrop-blur-sm hover:!bg-white/40 transition-all" />
    </div>

   
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const activeIndex = ref(0)
let swiperInstance = null

const slides = [
  {
    image: '/images/carousel1.e3fa0991.png',
    title: 'Impulsamos el futuro de tu empresa con tecnología innovadora',
    subtitle: 'Soluciones que transforman y llevan tu negocio al siguiente nivel.',
  },
  {
    image: '/images/carrousellhero.1e6771ad.png',
    title: 'Especialistas en tecnología y consultoría desde 1993',
    subtitle: 'Liderando la innovación tecnológica con más de 30 años de experiencia.',
  },
  {
    image: '/images/carrousellhero3.8f7bcea9.png',
    title: 'Llevamos soluciones tecnológicas a empresas líderes',
    subtitle: 'Descubrí cómo podemos ayudarte a transformar tu empresa.',
  },
]

onMounted(() => {
  swiperInstance = new Swiper('.hero-swiper', {
    modules: [Navigation, Pagination, Autoplay, EffectFade],
    effect: 'fade',
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    speed: 1200,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: (swiper) => {
        activeIndex.value = swiper.realIndex
      },
    },
  })
})

onUnmounted(() => swiperInstance?.destroy())
</script>
