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
      <a href="#home" @click.prevent="scrollTo('home')">
        <img
          src="https://asytec.com/_next/static/media/logotipo-azul.ad341051.png"
          alt="ASYTEC Sistemas"
          :class="['h-10 transition-all duration-300', !scrolled && 'brightness-0 invert']"
        />
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          @click.prevent="scrollTo(item.id)"
          :class="[
            'font-heading font-semibold text-sm tracking-wider uppercase transition-colors duration-200',
            scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-blue-200'
          ]"
        >
          {{ item.label }}
        </a>
        <a
          href="#contact"
          @click.prevent="scrollTo('contact')"
          :class="[
            'px-6 py-2 font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-300 rounded-sm',
            scrolled
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'border-2 border-white text-white hover:bg-white hover:text-primary-700'
          ]"
        >
          CONTACTO
        </a>
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
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            @click.prevent="scrollTo(item.id); mobileOpen = false"
            class="font-heading font-semibold text-sm tracking-wider uppercase text-gray-700 hover:text-primary-600 py-2 border-b border-gray-100"
          >
            {{ item.label }}
          </a>
          <a
            href="#contact"
            @click.prevent="scrollTo('contact'); mobileOpen = false"
            class="btn-primary mt-2 justify-center"
          >
            CONTACTO
          </a>
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
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Quiénes Somos' },
  { id: 'services', label: 'Servicios' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 60
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
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
