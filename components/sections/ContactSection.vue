<template>
  <section id="contact" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16 reveal" ref="headerRef">
        <p class="text-sm font-heading font-semibold tracking-widest uppercase text-primary-500 mb-2">Hablemos</p>
        <h2 class="section-title">Contacto</h2>
        <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 mb-4 rounded-full" />
        <p class="section-subtitle">Contactanos para más información sobre nuestros servicios.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- Form -->
        <div class="reveal-left bg-gray-50 rounded-2xl p-8 shadow-sm" ref="formRef">
          <form @submit.prevent="handleSubmit" novalidate>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Nombre *</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Tu nombre completo"
                  :class="['w-full px-4 py-3 rounded-lg border bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent', errors.name ? 'border-red-400' : 'border-gray-200']"
                />
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Teléfono *</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="Tu teléfono"
                  :class="['w-full px-4 py-3 rounded-lg border bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent', errors.phone ? 'border-red-400' : 'border-gray-200']"
                />
                <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
              </div>
            </div>
            <div class="mb-5">
              <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Correo electrónico *</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="tu@email.com"
                :class="['w-full px-4 py-3 rounded-lg border bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent', errors.email ? 'border-red-400' : 'border-gray-200']"
              />
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
            </div>
            <div class="mb-6">
              <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Mensaje *</label>
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="¿En qué podemos ayudarte?"
                :class="['w-full px-4 py-3 rounded-lg border bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none', errors.message ? 'border-red-400' : 'border-gray-200']"
              />
              <p v-if="errors.message" class="text-red-500 text-xs mt-1">{{ errors.message }}</p>
            </div>
            <button
              type="submit"
              :disabled="sending"
              class="w-full btn-primary justify-center"
            >
              <span v-if="!sending">ENVIAR MENSAJE</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Enviando...
              </span>
            </button>
            <Transition name="feedback">
              <div
                v-if="feedback"
                :class="['mt-4 px-4 py-3 rounded-lg text-sm text-center font-medium', feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700']"
              >
                {{ feedback.message }}
              </div>
            </Transition>
          </form>
        </div>

        <!-- Map + Info -->
        <div class="reveal-right flex flex-col gap-6" ref="mapRef">
          <!-- Contact info cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="info in contactInfo" :key="info.label" class="bg-primary-50 rounded-xl p-4 text-center">
              <div class="text-2xl mb-2">{{ info.icon }}</div>
              <p class="text-xs font-heading font-bold uppercase tracking-wider text-primary-600 mb-1">{{ info.label }}</p>
              <p class="text-sm text-gray-600">{{ info.value }}</p>
            </div>
          </div>

          <!-- Google Maps -->
          <div class="rounded-2xl overflow-hidden shadow-sm border border-gray-100" style="height: 360px">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6571.959824930099!2d-58.46502431135536!3d-34.55406398517658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb4299e1fb7db%3A0xa763d94ef8bf1de8!2sASYTEC%20Sistemas!5e0!3m2!1ses-419!2sus!4v1738857771284!5m2!1ses-419!2sus"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Ubicación ASYTEC Sistemas"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const headerRef = ref(null)
const formRef = ref(null)
const mapRef = ref(null)

useIntersectionObserver(headerRef, ([{ isIntersecting }]) => {
  if (isIntersecting) headerRef.value?.classList.add('visible')
})
useIntersectionObserver(formRef, ([{ isIntersecting }]) => {
  if (isIntersecting) formRef.value?.classList.add('visible')
}, { threshold: 0.1 })
useIntersectionObserver(mapRef, ([{ isIntersecting }]) => {
  if (isIntersecting) mapRef.value?.classList.add('visible')
}, { threshold: 0.1 })

const form = reactive({ name: '', phone: '', email: '', message: '' })
const errors = reactive({ name: '', phone: '', email: '', message: '' })
const sending = ref(false)
const feedback = ref(null)

const validate = () => {
  let valid = true
  errors.name = form.name.trim() ? '' : 'El nombre es requerido'
  errors.phone = form.phone.trim() ? '' : 'El teléfono es requerido'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Email inválido'
  errors.message = form.message.trim() ? '' : 'El mensaje es requerido'
  Object.values(errors).forEach(e => { if (e) valid = false })
  return valid
}

const handleSubmit = async () => {
  if (!validate()) return
  sending.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form },
    })
    feedback.value = { type: 'success', message: '¡Mensaje enviado! Nos pondremos en contacto a la brevedad.' }
    Object.assign(form, { name: '', phone: '', email: '', message: '' })
  } catch {
    feedback.value = { type: 'error', message: 'Hubo un error al enviar. Intentá de nuevo o escribinos a info@asytec.com' }
  } finally {
    sending.value = false
    setTimeout(() => feedback.value = null, 6000)
  }
}

const contactInfo = [
  { icon: '📞', label: 'Teléfono', value: '+54 11 5367-8000' },
  { icon: '📍', label: 'Dirección', value: 'Congreso 2171 Piso 8° Of. A, CABA' },
  { icon: '✉️', label: 'Email', value: 'info@asytec.com' },
]
</script>

<style scoped>
.feedback-enter-active, .feedback-leave-active { transition: all 0.4s ease; }
.feedback-enter-from, .feedback-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
