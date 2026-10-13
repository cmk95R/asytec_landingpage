<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white shadow-md py-3'
        : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/">
        <img
          src="/images/logotipo-azul.png"
          alt="ASYTEC Sistemas"
          :class="['h-10 transition-all duration-300', !scrolled && 'brightness-0 invert']"
        />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <template v-for="item in navItems" :key="item.id">
          <NuxtLink
            :to="item.to"
            :class="[
              'font-heading font-semibold text-sm tracking-wider uppercase transition-colors duration-200',
              scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-blue-200'
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
        <NuxtLink
          to="/#contact"
          :class="[
            'px-6 py-2 font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-300 rounded-lg',
            scrolled
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'border-2 border-white text-white hover:bg-white hover:text-primary-700'
          ]"
        >
          CONTACTO
        </NuxtLink>
      </nav>

      <!-- Mobile menu button -->
      <button
        @click="mobileOpen = !mobileOpen"
        :class="['md:hidden p-2', scrolled ? 'text-gray-700' : 'text-white']"
        aria-label="Menú"
      >
        <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="md:hidden bg-white shadow-xl">
        <nav class="flex flex-col px-6 py-4 gap-4">
          <template v-for="item in navItems" :key="item.id">
            <NuxtLink
              :to="item.to"
              @click="mobileOpen = false"
              class="font-heading font-semibold text-sm tracking-wider uppercase text-gray-700 hover:text-primary-600 py-2 border-b border-gray-100"
            >
              {{ item.label }}
            </NuxtLink>
          </template>
          <NuxtLink
            to="/#contact"
            @click="mobileOpen = false"
            class="btn-primary mt-2 justify-center rounded-lg"
          >
            CONTACTO
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const navItems = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'Quiénes Somos', to: '/#about' },
  { id: 'services', label: 'Servicios', to: '/#services' },
  { id: 'social', label: 'Novedades', to: '/#social' },
  { id: 'beneficios', label: 'Beneficios', to: '/#beneficios' },
  { id: 'diagnostico', label: 'Diagnóstico IT', to: '/diagnostico' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 60
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all 0.3s ease;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
