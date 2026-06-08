
<template>
  <section id="contact" class="relative py-20 flex items-center overflow-hidden bg-fixed"
    style="background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 20%, #173487 95%, #173487 20%);">
    <!-- Capa decorativa sutil -->
    <div aria-hidden="true" class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute inset-0 opacity-30"
        style="background-image: radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25) 0%, transparent 45%);" />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">

      <div class="text-center mb-16 reveal" ref="headerRef">
        
        <h2 class="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-3">Contacto</h2>
        <p class="text-gray-700 max-w-md mx-auto text-sm md:text-base">
          Contactanos para más información sobre nuestros servicios.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div class="reveal-left w-full" ref="mapRef">
          <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white" style="height: 480px">
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

        <div class="reveal-right w-full" ref="formRef">
          <form @submit.prevent="handleSubmit" novalidate class="flex flex-col gap-4 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xl">
            
            <div>
              <input
                v-model="form.name"
                type="text"
                placeholder="Nombre *"
                :class="['w-full px-5 py-4 rounded-md border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm shadow-sm transition-all duration-200 outline-none focus:bg-white focus:border-blue-400', errors.name ? 'border-red-400 focus:border-red-400' : '']"
              />
              <p v-if="errors.name" class="text-red-500 text-xs mt-1 font-medium">{{ errors.name }}</p>
            </div>

            <div>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="Teléfono *"
                :class="['w-full px-5 py-4 rounded-md border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm shadow-sm transition-all duration-200 outline-none focus:bg-white focus:border-blue-400', errors.phone ? 'border-red-400 focus:border-red-400' : '']"
              />
              <p v-if="errors.phone" class="text-red-500 text-xs mt-1 font-medium">{{ errors.phone }}</p>
            </div>

            <div>
              <input
                v-model="form.email"
                type="email"
                placeholder="Correo Electrónico *"
                :class="['w-full px-5 py-4 rounded-md border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm shadow-sm transition-all duration-200 outline-none focus:bg-white focus:border-blue-400', errors.email ? 'border-red-400 focus:border-red-400' : '']"
              />
              <p v-if="errors.email" class="text-red-500 text-xs mt-1 font-medium">{{ errors.email }}</p>
            </div>

            <div>
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="Mensaje *"
                :class="['w-full px-5 py-4 rounded-md border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm shadow-sm transition-all duration-200 outline-none focus:bg-white focus:border-blue-400 resize-none', errors.message ? 'border-red-400 focus:border-red-400' : '']"
              />
              <p v-if="errors.message" class="text-red-500 text-xs mt-1 font-medium">{{ errors.message }}</p>
            </div>

            <div class="flex justify-end mt-2">
              <button
                type="submit"
                :disabled="sending"
                class="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-10 rounded-md transition-all duration-200 shadow-lg uppercase tracking-wider text-xs md:text-sm flex items-center justify-center min-w-[140px]"
              >
                <span v-if="!sending">ENVIAR</span>
                <span v-else class="flex items-center gap-2">
                  <svg class="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Enviando...
                </span>
              </button>
            </div>

            <Transition name="feedback">
              <div
                v-if="feedback"
                :class="['mt-4 px-4 py-3 rounded-md text-sm text-center font-medium shadow-sm', feedback.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200']"
              >
                {{ feedback.message }}
              </div>
            </Transition>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// Refs para animaciones de intersección
const headerRef = ref(null)
const formRef = ref(null)
const mapRef = ref(null)

// Observadores para agregar la clase 'visible' cuando entran en pantalla
useIntersectionObserver(headerRef, ([{ isIntersecting }]) => {
  if (isIntersecting) headerRef.value?.classList.add('visible')
})
useIntersectionObserver(formRef, ([{ isIntersecting }]) => {
  if (isIntersecting) formRef.value?.classList.add('visible')
}, { threshold: 0.1 })
useIntersectionObserver(mapRef, ([{ isIntersecting }]) => {
  if (isIntersecting) mapRef.value?.classList.add('visible')
}, { threshold: 0.1 })

// Estado reactivo del formulario
const form = reactive({ name: '', phone: '', email: '', message: '' })
const errors = reactive({ name: '', phone: '', email: '', message: '' })
const sending = ref(false)
const feedback = ref(null)

// Validación
const validate = () => {
  let valid = true
  errors.name = form.name.trim() ? '' : 'El nombre es requerido'
  errors.phone = form.phone.trim() ? '' : 'El teléfono es requerido'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Email inválido'
  errors.message = form.message.trim() ? '' : 'El mensaje es requerido'
  Object.values(errors).forEach(e => { if (e) valid = false })
  return valid
}

// Envío del formulario
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
</script>

<style scoped>
/* Transición suave para el mensaje de feedback */
.feedback-enter-active, .feedback-leave-active { 
  transition: all 0.4s ease; 
}
.feedback-enter-from, .feedback-leave-to { 
  opacity: 0; 
  transform: translateY(-6px); 
}

/* Clases base para las animaciones del IntersectionObserver */
.reveal, .reveal-left, .reveal-right {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}
.reveal { transform: translateY(30px); }
.reveal-left { transform: translateX(-30px); }
.reveal-right { transform: translateX(30px); }

.reveal.visible, 
.reveal-left.visible, 
.reveal-right.visible {
  opacity: 1;
  transform: translate(0);
}
</style>
