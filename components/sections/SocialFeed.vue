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
                <div
                  v-if="post.embed"
                  @click="openLightbox(i)"
                  class="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 reveal-item cursor-pointer"
                  :style="`transition-delay: ${(i % 4) * 60}ms`"
                >
                  <NuxtImg
                    v-if="post.image"
                    :src="post.image"
                    :alt="`Publicación de ${post.network}`"
                    format="webp"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    v-if="post.image"
                    class="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div
                    v-else
                    v-html="post.embedHtml"
                    :class="post.embedType === 'linkedin' ? 'linkedin-embed-wrap' : 'instagram-embed-wrap'"
                    class="w-full h-full pointer-events-none"
                  />
                  <div class="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/30 transition-colors duration-500 flex items-center justify-center pointer-events-none">
                    <span class="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white text-xs font-semibold bg-black/70 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                      </svg>
                      Ver publicación
                    </span>
                  </div>
                </div>
                <button
                  v-else
                  @click="openLightbox(i)"
                  class="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 reveal-item"
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
            class="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            :class="currentPost.embed
              ? (currentPost.embedType === 'linkedin' ? 'max-w-[504px]' : 'max-w-[540px]')
              : 'flex flex-col md:flex-row'"
          >
            <div
              v-if="currentPost.embed"
              :class="currentPost.embedType === 'linkedin' ? 'linkedin-embed-lightbox' : 'instagram-embed-lightbox'"
              class="w-full max-h-[90vh] overflow-y-auto"
              v-html="currentPost.embedHtml"
            />
            <div v-else class="md:w-2/3 bg-black flex items-center justify-center" style="min-height: 300px">
              <NuxtImg
                :src="currentPost.image"
                :alt="currentPost.caption"
                format="webp"
                class="w-full h-full max-h-[90vh] object-contain"
              />
            </div>
            <div v-if="!currentPost.embed" class="md:w-1/3 p-6 md:p-8 flex flex-col">
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
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

const buildIgEmbed = (permalink) => {
  const safe = permalink.replace(/&/g, '&amp;')
  return `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${safe}" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="${safe}" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Ver esta publicación en Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="${safe}" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Una publicación compartida por ASYTEC Sistemas SRL (@asytecsistemas)</a></p></div></blockquote>`
}

const tabs = [
  { id: 'all', label: 'Todas', icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>' },
  { id: 'instagram', label: 'Instagram', icon: igIcon },
  { id: 'linkedin', label: 'LinkedIn', icon: inIcon },
]

const posts = [
  {
    embed: true,
    embedType: 'instagram',
    embedHtml: buildIgEmbed('https://www.instagram.com/reel/DYp7Nt4hsuG/?utm_source=ig_embed&utm_campaign=loading'),
    network: 'instagram',
    url: 'https://www.instagram.com/reel/DYp7Nt4hsuG/',
  },
  {
    embed: true,
    embedType: 'instagram',
    embedHtml: buildIgEmbed('https://www.instagram.com/p/DWT44WSDt7H/?utm_source=ig_embed&utm_campaign=loading'),
    network: 'instagram',
    url: 'https://www.instagram.com/p/DWT44WSDt7H/',
  },
  {
    embed: true,
    embedType: 'instagram',
    embedHtml: buildIgEmbed('https://www.instagram.com/p/DWB5mUNDgBZ/?utm_source=ig_embed&utm_campaign=loading'),
    network: 'instagram',
    url: 'https://www.instagram.com/p/DWB5mUNDgBZ/',
  },
  {
    embed: true,
    embedType: 'instagram',
    embedHtml: buildIgEmbed('https://www.instagram.com/p/DYp4oWggc4r/?utm_source=ig_embed&utm_campaign=loading'),
    network: 'instagram',
    url: 'https://www.instagram.com/p/DYp4oWggc4r/',
  },
  {
    embed: true,
    embedType: 'linkedin',
    embedHtml: '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7465145496043651074?collapsed=1" height="670" width="504" frameborder="0" allowfullscreen="" title="Publicación integrada"></iframe>',
    image: '/images/social/lk1.jpg',
    network: 'linkedin',
    url: 'https://www.linkedin.com/feed/update/urn:li:share:7465145496043651074',
  },
  {
    embed: true,
    embedType: 'linkedin',
    embedHtml: '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7470209183317946369?collapsed=1" height="670" width="504" frameborder="0" allowfullscreen="" title="Publicación integrada"></iframe>',
    image: '/images/social/lk2.jpg',
    network: 'linkedin',
    url: 'https://www.linkedin.com/feed/update/urn:li:share:7470209183317946369',
  },
  {
    embed: true,
    embedType: 'linkedin',
    embedHtml: '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7437526879475171328?collapsed=1" height="523" width="504" frameborder="0" allowfullscreen="" title="Publicación integrada"></iframe>',
    image: '/images/social/lk3.jpg',
    network: 'linkedin',
    url: 'https://www.linkedin.com/feed/update/urn:li:share:7437526879475171328',
  },
  {
    embed: true,
    embedType: 'linkedin',
    embedHtml: '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7447666868321931264?collapsed=1" height="567" width="504" frameborder="0" allowfullscreen="" title="Publicación integrada"></iframe>',
    image: '/images/social/lk4.jpg',
    network: 'linkedin',
    url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7447666868321931264',
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

const processInstagramEmbeds = () => {
  if (typeof window === 'undefined') return
  if (window.instgrm?.Embeds?.process) {
    window.instgrm.Embeds.process()
    return
  }
  if (document.querySelector('script[data-instgrm-loader]')) return
  const script = document.createElement('script')
  script.src = '//www.instagram.com/embed.js'
  script.async = true
  script.setAttribute('data-instgrm-loader', '')
  document.body.appendChild(script)
}

watch(activeTab, async () => {
  await nextTick()
  processInstagramEmbeds()
})

watch(lightboxIndex, async () => {
  await nextTick()
  processInstagramEmbeds()
})

onMounted(() => {
  window.addEventListener('keydown', onKey)
  processInstagramEmbeds()
})
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.instagram-embed-wrap :deep(.instagram-media),
.instagram-embed-lightbox :deep(.instagram-media) {
  margin: 0 !important;
  min-width: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
  box-shadow: none !important;
  border: 0 !important;
}

/* Hide profile header only in the slide preview (not in lightbox) */
.instagram-embed-wrap :deep(.instagram-media) > div > a > div:first-child,
.instagram-embed-wrap :deep(.instagram-media) > div > div:first-child,
.instagram-embed-wrap :deep(.instagram-media) > header {
  display: none !important;
}
.instagram-embed-wrap :deep(.instagram-media) > div:first-child {
  padding-top: 0 !important;
}

.linkedin-embed-wrap iframe {
  width: 100% !important;
  border: none !important;
  display: block;
}
.linkedin-embed-lightbox iframe {
  width: 100% !important;
  max-width: 504px;
  height: 670px;
  border: none !important;
  display: block;
  margin: 0 auto;
}

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
