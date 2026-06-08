<template>
  <section id="social" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-14 reveal" ref="headerRef">
        
        <h2 class="section-title">Nuestras publicaciones</h2>
        <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
        <p class="section-subtitle max-w-2xl mx-auto mt-5">
          Conocé nuestras últimas novedades, casos de éxito y contenido compartido en
          Instagram y LinkedIn.
        </p>
      </div>

      <!-- Tabs de red -->
      <div class="flex justify-center mb-10 reveal" ref="tabsRef">
        <div class="inline-flex bg-gray-100 rounded-full p-1.5">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2',
              activeTab === tab.id
                ? 'bg-white text-primary-700 shadow-md'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            <span v-html="tab.icon" class="w-4 h-4" />
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Carrusel de publicaciones -->
      <div ref="gridRef" class="reveal">
        <Transition name="fade" mode="out-in">
          <div :key="activeTab" class="relative px-10 md:px-14">
            <Swiper
              :modules="[Navigation, Pagination, Autoplay]"
              :slides-per-view="1.2"
              :space-between="16"
              :loop="filteredPosts.length > 4"
              :autoplay="{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }"
              :navigation="{ prevEl: '.social-prev', nextEl: '.social-next' }"
              :pagination="{ clickable: true, dynamicBullets: true }"
              :breakpoints="{
                640:  { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 4,   spaceBetween: 20 },
              }"
              class="social-swiper !pb-14"
            >
              <SwiperSlide v-for="(post, i) in filteredPosts" :key="`${activeTab}-${i}`">
                <button
                  @click="openLightbox(i)"
                  class="group relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 reveal-item"
                  :style="`transition-delay: ${(i % 4) * 60}ms`"
                >
                  <NuxtImg
                    :src="post.image"
                    :alt="post.caption"
                    format="webp"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <!-- Overlay gradiente -->
                  <div class="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <!-- Red social badge -->
                  <div class="absolute top-3 left-3 z-10">
                    <span
                      :class="[
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm',
                        post.network === 'instagram'
                          ? 'bg-pink-500/90 text-white'
                          : 'bg-blue-600/90 text-white'
                      ]"
                    >
                      <span v-html="post.network === 'instagram' ? igIcon : inIcon" class="w-3 h-3" />
                      {{ post.network === 'instagram' ? 'IG' : 'IN' }}
                    </span>
                  </div>

                  <!-- Caption al hacer hover -->
                  <div class="absolute inset-x-0 bottom-0 p-4 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p class="text-white text-xs md:text-sm font-medium leading-snug line-clamp-3 text-left">
                      {{ post.caption }}
                    </p>
                    <div class="flex items-center gap-3 mt-2 text-white/80 text-[10px]">
                      <span class="inline-flex items-center gap-1">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        {{ post.likes }}
                      </span>
                      <span class="inline-flex items-center gap-1">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>
                        {{ post.comments }}
                      </span>
                    </div>
                  </div>
                </button>
              </SwiperSlide>
            </Swiper>

            <!-- Botones de navegación personalizados -->
            <button class="social-prev absolute left-0 md:left-2 top-[40%] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-primary-700 hover:scale-105 transition-transform focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button class="social-next absolute right-0 md:right-2 top-[40%] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-primary-700 hover:scale-105 transition-transform focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </Transition>
      </div>

      <!-- CTA a redes -->
      <div class="text-center mt-4 reveal" ref="ctaRef">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://www.instagram.com/asytecsistemas/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <span v-html="igIcon" class="w-5 h-5" />
            Seguinos en Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/asytec/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-7 py-3 bg-[#0A66C2] text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-[#084d92]"
          >
            <span v-html="inIcon" class="w-5 h-5" />
            Seguinos en LinkedIn
          </a>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxIndex !== null"
          @click="closeLightbox"
          class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <button
            @click.stop="closeLightbox"
            class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <button
            v-if="filteredPosts.length > 1"
            @click.stop="prev"
            class="absolute left-2 md:left-6 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Anterior"
          >
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <button
            v-if="filteredPosts.length > 1"
            @click.stop="next"
            class="absolute right-2 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Siguiente"
          >
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <div
            v-if="currentPost"
            @click.stop
            class="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <div class="md:w-2/3 bg-black flex items-center justify-center" style="min-height: 300px">
              <NuxtImg
                :src="currentPost.image"
                :alt="currentPost.caption"
                format="webp"
                class="w-full h-full max-h-[90vh] object-contain"
              />
            </div>
            <div class="md:w-1/3 p-6 md:p-8 flex flex-col">
              <div class="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                  A
                </div>
                <div>
                  <p class="font-semibold text-gray-800 text-sm">ASYTEC Sistemas</p>
                  <p class="text-xs text-gray-500">
                    en {{ currentPost.network === 'instagram' ? 'Instagram' : 'LinkedIn' }}
                  </p>
                </div>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed my-5 flex-1">
                {{ currentPost.caption }}
              </p>
              <div class="flex items-center gap-4 pt-4 border-t border-gray-100 text-gray-600 text-xs">
                <span class="inline-flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  {{ currentPost.likes }}
                </span>
                <span class="inline-flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>
                  {{ currentPost.comments }}
                </span>
                <a
                  :href="currentPost.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ml-auto inline-flex items-center gap-1.5 text-primary-600 font-semibold hover:text-primary-700"
                >
                  Ver original
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const headerRef = ref(null)
const tabsRef = ref(null)
const gridRef = ref(null)
const ctaRef = ref(null)
const activeTab = ref('all')
const lightboxIndex = ref(null)

useIntersectionObserver(headerRef, ([{ isIntersecting }]) => {
  if (isIntersecting) headerRef.value?.classList.add('visible')
}, { threshold: 0.2 })
useIntersectionObserver(tabsRef, ([{ isIntersecting }]) => {
  if (isIntersecting) tabsRef.value?.classList.add('visible')
}, { threshold: 0.2 })
useIntersectionObserver(gridRef, ([{ isIntersecting }]) => {
  if (isIntersecting) gridRef.value?.classList.add('visible')
}, { threshold: 0.1 })
useIntersectionObserver(ctaRef, ([{ isIntersecting }]) => {
  if (isIntersecting) ctaRef.value?.classList.add('visible')
}, { threshold: 0.2 })

const igIcon = '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>'
const inIcon = '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'

const tabs = [
  { id: 'all', label: 'Todas', icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>' },
  { id: 'instagram', label: 'Instagram', icon: igIcon },
  { id: 'linkedin', label: 'LinkedIn', icon: inIcon },
]

const posts = [
  {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=800&fit=crop',
    caption: '🚀 Nuevo proyecto implementado con éxito junto a nuestro cliente. Más de 30 años acompañando la transformación digital de las empresas.',
    network: 'linkedin',
    likes: '142',
    comments: '18',
    url: 'https://www.linkedin.com/company/asytec/',
  },
  {
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=800&fit=crop',
    caption: '💡 En ASYTEC creemos que la tecnología es una herramienta para impulsar el crecimiento. Conocé nuestros servicios de consultoría.',
    network: 'instagram',
    likes: '89',
    comments: '12',
    url: 'https://www.instagram.com/asytecsistemas/',
  },
  {
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=800&fit=crop',
    caption: '👥 ¡Sumate a nuestro equipo! Estamos en búsqueda de nuevos talentos para seguir creciendo juntos.',
    network: 'linkedin',
    likes: '256',
    comments: '34',
    url: 'https://www.linkedin.com/company/asytec/jobs/',
  },
  {
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=800&fit=crop',
    caption: '🔐 La seguridad informática ya no es opcional. Implementamos soluciones robustas para proteger tu negocio.',
    network: 'instagram',
    likes: '67',
    comments: '8',
    url: 'https://www.instagram.com/asytecsistemas/',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop',
    caption: '📊 Caso de éxito: optimizamos los procesos de gestión de una empresa líder del mercado con JD Edwards.',
    network: 'linkedin',
    likes: '198',
    comments: '24',
    url: 'https://www.linkedin.com/company/asytec/',
  },
  {
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=800&fit=crop',
    caption: '🤝 Acompañamos a nuestros clientes en cada etapa de su transformación digital. Conocé más.',
    network: 'instagram',
    likes: '124',
    comments: '15',
    url: 'https://www.instagram.com/asytecsistemas/',
  },
  {
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=800&fit=crop',
    caption: '💼 Nuestra experiencia en gestión de proyectos de TI nos permite entregar resultados medibles y concretos.',
    network: 'linkedin',
    likes: '176',
    comments: '21',
    url: 'https://www.linkedin.com/company/asytec/',
  },
  {
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=800&fit=crop',
    caption: '⚡ Desarrollo a medida: aplicaciones web y mobile que se adaptan a las necesidades de tu negocio.',
    network: 'instagram',
    likes: '93',
    comments: '11',
    url: 'https://www.instagram.com/asytecsistemas/',
  },
]

const filteredPosts = computed(() => {
  if (activeTab.value === 'all') return posts
  return posts.filter(p => p.network === activeTab.value)
})

const currentPost = computed(() => {
  if (lightboxIndex.value === null) return null
  return filteredPosts.value[lightboxIndex.value] || null
})

const openLightbox = (i) => { lightboxIndex.value = i }
const closeLightbox = () => { lightboxIndex.value = null }
const next = () => {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value + 1) % filteredPosts.value.length
}
const prev = () => {
  if (lightboxIndex.value === null) return
  lightboxIndex.value = (lightboxIndex.value - 1 + filteredPosts.value.length) % filteredPosts.value.length
}

const onKey = (e) => {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.reveal-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
.reveal.visible .reveal-item {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.lightbox-enter-active, .lightbox-leave-active { transition: opacity 0.3s ease; }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.social-swiper {
  --swiper-pagination-color: #1565c0;
}
.social-prev.swiper-button-disabled,
.social-next.swiper-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: translateY(-50%) scale(1) !important;
}
.social-swiper .swiper-pagination-bullet {
  background: #cbd5e1;
  opacity: 1;
}
.social-swiper .swiper-pagination-bullet-active {
  background: #1565c0;
}
</style>
