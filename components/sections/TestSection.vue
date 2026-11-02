<template>
  <section id="diagnostico" :class="embedded ? 'relative py-2 bg-transparent' : 'relative py-20 bg-gray-50'">
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6">

      <Transition name="step" mode="out-in">

        <!-- INTRO -->
        <div v-if="step === 'intro'" key="intro" class="text-center">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 max-w-2xl mx-auto">

            <img src="/images/logotipo-azul.png" alt="ASYTEC Sistemas" class="h-9 w-auto mx-auto mb-8" />

            <p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-3">
              Evaluación de madurez en IA
            </p>

            <h2 class="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Diagnóstico de adopción de IA</h2>

            <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              12 indicadores sobre lo que tu empresa ya hace hoy. Al finalizar se genera un informe con el puntaje
              por dimensión, los hallazgos priorizados y un próximo paso concreto.
            </p>

            <div class="border-t border-gray-100 pt-8 mb-8 text-left">
              <p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-4 text-center">Dimensiones evaluadas</p>
              <ul class="space-y-3 text-sm text-gray-700">
                <li v-for="area in areas" :key="area.id" class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <span class="w-4 h-4" v-html="area.icon" />
                  </span>
                  <div>
                    <strong class="text-gray-900">{{ area.name }}</strong>
                    <span class="text-gray-500"> — {{ area.description }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="hasSaved" class="space-y-3">
              <button
                @click="continueTest"
                class="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl"
              >
                Continuar evaluación
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                @click="startTest"
                class="w-full text-sm text-gray-500 hover:text-primary-700 transition-colors py-2"
              >
                Empezar de nuevo
              </button>
              <p class="text-xs text-gray-400">Tenés una evaluación sin terminar guardada en este dispositivo.</p>
            </div>

            <button
              v-else
              @click="startTest"
              class="inline-flex items-center gap-2 px-10 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl"
            >
              Comenzar evaluación
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <p class="text-xs text-gray-500 mt-6">
              Sin costo. Los datos de contacto se solicitan únicamente al final, para enviarte el informe.
            </p>

          </div>
        </div>

        <!-- QUESTIONS -->
        <div v-else-if="step === 'questions'" key="questions" ref="questionsRef">
          <div class="mb-8">
            <div class="flex items-center justify-between mb-3">
              <p class="text-xs font-heading font-bold uppercase tracking-[0.18em] text-primary-700">
                {{ currentArea.name }}
              </p>
              <p class="text-xs text-gray-500" aria-live="polite">
                Indicador {{ indicatorIndex }} de {{ currentArea.questions.length }}
              </p>
            </div>

            <div class="grid grid-cols-4 gap-2" role="progressbar" :aria-valuenow="progress + 1" :aria-valuemin="1" :aria-valuemax="questions.length" aria-label="Avance de la evaluación">
              <div
                v-for="(area, ai) in areas"
                :key="area.id"
                :class="['h-1.5 rounded-full transition-colors duration-300', areaSegments[ai].done ? 'bg-primary-600' : areaSegments[ai].active ? 'bg-primary-400' : 'bg-gray-200']"
              />
            </div>
          </div>

          <div
            class="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-sm"
            @touchstart.passive="onTouchStart"
            @touchend.passive="onTouchEnd"
          >
            <Transition :name="direction" mode="out-in">
              <h3 :key="progress" class="text-xl md:text-2xl font-heading font-semibold text-gray-900 text-center mb-8 leading-snug">
                {{ currentQuestion.q }}
              </h3>
            </Transition>

            <div class="bg-gray-100 rounded-xl p-1.5 grid grid-cols-2 gap-1.5" role="group" aria-label="Respuesta">
              <button
                type="button"
                @click="answer(true)"
                :aria-pressed="answers[progress] === true"
                :class="[
                  'py-4 rounded-lg font-heading font-semibold text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  answers[progress] === true ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-gray-700 hover:text-primary-700 hover:bg-white/80'
                ]"
              >
                Sí
              </button>
              <button
                type="button"
                @click="answer(false)"
                :aria-pressed="answers[progress] === false"
                :class="[
                  'py-4 rounded-lg font-heading font-semibold text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  answers[progress] === false ? 'bg-primary-700 text-white shadow-sm' : 'bg-white text-gray-700 hover:text-primary-700 hover:bg-white/80'
                ]"
              >
                No
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between mt-6 max-w-2xl mx-auto">
            <button
              v-if="progress > 0"
              @click="back"
              class="text-sm text-gray-500 hover:text-primary-700 transition-colors"
            >
              ← Anterior
            </button>
            <span v-else class="text-sm text-transparent select-none">← Anterior</span>
            <span class="hidden sm:inline text-xs text-gray-400">Atajos: 1 = Sí · 2 = No · ← volver</span>
          </div>
        </div>

        <!-- RESULTS -->
        <div v-else-if="step === 'results'" key="results" class="report print-report">
          <div class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

            <div class="border-b border-gray-100 px-6 md:px-10 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <img src="/images/logotipo-azul.png" alt="ASYTEC Sistemas" class="h-8 w-auto" />
              <div class="text-left sm:text-right">
                <p class="text-xs font-heading font-bold uppercase tracking-[0.18em] text-primary-600">Informe de diagnóstico</p>
                <p class="text-xs text-gray-500 mt-1">{{ user.company || 'Organización' }} · {{ today }}</p>
              </div>
            </div>

            <div class="px-6 md:px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-gray-100">
              <div class="flex justify-center">
                <div class="relative w-40 h-40">
                  <svg viewBox="0 0 120 120" class="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#e6f0fa" stroke-width="10" />
                    <circle
                      cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="10"
                      stroke-linecap="round" class="text-primary-600 transition-all duration-700"
                      :stroke-dasharray="ringDash"
                    />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="font-heading font-extrabold text-3xl text-gray-900">{{ totalScore }}</span>
                    <span class="text-xs text-gray-500">de {{ questions.length }}</span>
                  </div>
                </div>
              </div>

              <div class="md:col-span-2 text-center md:text-left">
                <p class="text-xs font-heading font-bold uppercase tracking-[0.18em] text-gray-400 mb-2">Nivel de madurez</p>
                <p class="font-heading font-bold text-2xl text-primary-700 mb-2">{{ globalLevel.label }}</p>
                <p class="text-gray-600 leading-relaxed">{{ globalLevel.profile }}</p>
              </div>
            </div>

            <div class="px-6 md:px-10 py-8 border-b border-gray-100">
              <h3 class="font-heading font-bold text-base text-gray-900 mb-6">Resultado por dimensión</h3>
              <div class="space-y-5">
                <div v-for="(area, ai) in areas" :key="area.id">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2.5">
                      <span :class="['w-2 h-2 rounded-full', levelDot(area.score)]" />
                      <span class="font-medium text-gray-800 text-sm">{{ area.name }}</span>
                    </div>
                    <span class="text-xs text-gray-500">
                      {{ area.score }}/{{ area.questions.length }} · {{ levelLabel(area.score) }}
                    </span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      class="h-1.5 rounded-full transition-all duration-700"
                      :class="levelBg(area.score)"
                      :style="`width: ${area.score / area.questions.length * 100}%`"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="px-6 md:px-10 py-8 space-y-8">
              <div>
                <h3 class="font-heading font-bold text-base text-gray-900 mb-3">Resumen ejecutivo</h3>
                <p class="text-gray-700 leading-relaxed">{{ resumenEjecutivo }}</p>
              </div>

              <div v-if="oportunidades.length">
                <h3 class="font-heading font-bold text-base text-gray-900 mb-4">Hallazgos priorizados</h3>
                <ul class="space-y-4">
                  <li v-for="(op, i) in oportunidades" :key="i" class="flex gap-4">
                    <span class="flex-shrink-0 w-7 h-7 rounded-full bg-primary-50 text-primary-700 text-xs font-bold flex items-center justify-center mt-0.5">{{ i + 1 }}</span>
                    <span class="text-gray-700 leading-relaxed text-sm md:text-base">{{ op }}</span>
                  </li>
                </ul>
              </div>

              <div class="bg-primary-50 border border-primary-100 rounded-xl p-6">
                <p class="text-xs font-heading font-bold uppercase tracking-[0.18em] text-primary-700 mb-2">Próximo paso</p>
                <p class="text-gray-800 leading-relaxed">{{ proximoPaso }}</p>
              </div>
            </div>

            <div class="px-6 md:px-10 pb-8">
              <h3 class="font-heading font-bold text-base text-gray-900 mb-3">Detalle por dimensión</h3>
              <div class="divide-y divide-gray-100 border-t border-gray-100">
                <div v-for="(area, ai) in areas" :key="area.id">
                  <button
                    @click="toggleArea(ai)"
                    class="w-full flex items-center justify-between gap-4 py-4 text-left"
                    :aria-expanded="openArea === ai"
                  >
                    <span class="flex items-center gap-2.5">
                      <span :class="['w-2 h-2 rounded-full', levelDot(area.score)]" />
                      <span class="font-medium text-gray-800 text-sm">{{ area.name }}</span>
                    </span>
                    <span class="flex items-center gap-3">
                      <span class="text-xs text-gray-500">{{ area.score }}/{{ area.questions.length }}</span>
                      <svg :class="['w-4 h-4 text-gray-400 transition-transform duration-200', openArea === ai && 'rotate-180']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <Transition name="accordion">
                    <div v-if="openArea === ai" class="pb-4 pl-4.5 space-y-2">
                      <p class="text-xs text-gray-500 mb-2">{{ area.description }}</p>
                      <ul class="space-y-2">
                        <li v-for="(q, qi) in area.questions" :key="qi" class="flex items-start gap-2.5 text-sm">
                          <span :class="['mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0', isYes(ai, qi) ? 'bg-primary-100 text-primary-700' : 'bg-red-50 text-red-500']">
                            <svg v-if="isYes(ai, qi)" class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            <svg v-else class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                          </span>
                          <span class="text-gray-600">{{ q.q }}</span>
                        </li>
                      </ul>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-100 px-6 md:px-10 py-5 flex items-center justify-between gap-4">
              <p class="text-[11px] text-gray-400 leading-relaxed max-w-md">
                Informe generado a partir de {{ questions.length }} indicadores. Es un punto de partida, no una auditoría técnica.
              </p>
              <img src="/images/ISOTIPO AZUL.png" alt="ASYTEC" class="h-6 w-auto opacity-60" />
            </div>
          </div>

          <div class="no-print flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button
              @click="printReport"
              class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-lg"
            >
              Descargar informe (PDF)
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M4 6h16M4 6a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2" />
              </svg>
            </button>
            <button
              @click="openSend"
              class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-gray-200 text-gray-700 font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:border-primary-600 hover:text-primary-700"
            >
              Recibir por mail
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              @click="clearAll"
              class="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-gray-500 text-sm transition-colors hover:text-primary-700"
            >
              Borrar mis datos
            </button>
          </div>
        </div>

        <!-- SEND -->
        <div v-else-if="step === 'send'" key="send">

          <div v-if="emailStatus === 'ok'" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-xl mx-auto text-center">
            <span class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 text-primary-600 mb-5">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <h3 class="font-heading font-bold text-xl text-gray-900 mb-2">Informe enviado</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
              Te enviamos el informe a <strong>{{ user.email }}</strong>. Revisá tu bandeja de entrada o la carpeta de spam.
            </p>
            <button @click="step = 'results'" class="text-sm text-primary-700 hover:text-primary-800 font-medium">
              ← Volver al informe
            </button>
          </div>

          <div v-else>
            <div class="text-center mb-10">
              <p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-3">Último paso</p>
              <h2 class="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">Recibir el informe completo</h2>
              <p class="text-gray-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                Enviamos el informe con el detalle por dimensión y el próximo paso recomendado.
              </p>
            </div>

            <form @submit.prevent="sendResults" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-xl mx-auto space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Nombre *</label>
                  <input v-model="user.name" type="text" required placeholder="Tu nombre"
                    class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent" />
                </div>
                <div>
                  <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Email corporativo *</label>
                  <input v-model="user.email" type="email" required placeholder="tu@empresa.com"
                    class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Empresa *</label>
                  <input v-model="user.company" type="text" required placeholder="Nombre de tu empresa"
                    class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent" />
                </div>
                <div>
                  <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Cargo</label>
                  <input v-model="user.role" type="text" placeholder="Ej: Gerente de Operaciones"
                    class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Área evaluada</label>
                  <select v-model="user.area"
                    class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent">
                    <option value="">Opcional</option>
                    <option value="Toda la empresa">Toda la empresa</option>
                    <option value="Atención al Cliente">Atención al Cliente</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Legal">Legal</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operaciones">Operaciones</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Otra">Otra</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Tamaño</label>
                  <select v-model="user.size"
                    class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent">
                    <option value="">Opcional</option>
                    <option value="1-10">1 a 10 personas</option>
                    <option value="11-50">11 a 50 personas</option>
                    <option value="51-200">51 a 200 personas</option>
                    <option value="201+">Más de 200 personas</option>
                  </select>
                </div>
              </div>

              <label class="flex items-start gap-3 text-xs text-gray-600 pt-2 cursor-pointer">
                <input v-model="user.consent" type="checkbox" required class="mt-0.5 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                <span>Acepto recibir el informe y comunicaciones relacionadas. Podés darte de baja cuando quieras.</span>
              </label>

              <button type="submit"
                :disabled="sending"
                class="w-full mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-lg disabled:opacity-60">
                <span v-if="!sending">Enviar informe</span>
                <span v-else class="flex items-center gap-2">
                  <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </span>
              </button>

              <p v-if="emailStatus === 'error'" class="text-red-600 text-xs text-center">
                No pudimos enviar el informe. Escribinos a info@asytec.com.
              </p>

              <button type="button" @click="step = 'results'"
                class="w-full text-sm text-gray-500 hover:text-primary-700 transition-colors py-2">
                ← Volver al informe
              </button>
            </form>
          </div>
        </div>

      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import emailjs from '@emailjs/browser'

defineProps({
  embedded: { type: Boolean, default: false },
})

const config = useRuntimeConfig().public.emailjs
const STORAGE_KEY = 'asytec_diagnostico_v1'

const step = ref('intro')
const progress = ref(0)
const answers = reactive({})
const user = reactive({ name: '', email: '', company: '', role: '', area: '', size: '', consent: false })
const sending = ref(false)
const emailStatus = ref(null)
const direction = ref('q-left')
const hasSaved = ref(false)
const savedCompleted = ref(false)
const openArea = ref(null)

const questionsRef = ref(null)

const today = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })

const iconEjecucion = '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>'
const iconConfig = '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'
const iconInteligencia = '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>'
const iconGobernanza = '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'

const areas = reactive([
  {
    id: 'ejecucion', name: 'Ejecución',
    icon: iconEjecucion, description: '¿La IA hace cosas en tu día a día?',
    questions: [
      { q: '¿La IA responde consultas a través de un canal oficial de tu empresa? (chatbot en la web, WhatsApp, asistente en el chat interno)', weight: 1 },
      { q: '¿Usan IA para crear o revisar documentos y contenido?', weight: 1 },
      { q: '¿La IA automatiza algún proceso recurrente de principio a fin?', weight: 1 },
    ],
  },
  {
    id: 'configuracion', name: 'Configuración',
    icon: iconConfig, description: '¿La IA está conectada a tu empresa?',
    questions: [
      { q: '¿La IA consulta una base de conocimiento propia de tu empresa?', weight: 1 },
      { q: '¿La IA está integrada con algún sistema que ya usan?', weight: 1 },
      { q: '¿Monitorean el uso de la IA con registros o métricas?', weight: 1 },
    ],
  },
  {
    id: 'inteligencia', name: 'Inteligencia',
    icon: iconInteligencia, description: '¿La IA te ayuda a decidir?',
    questions: [
      { q: '¿La IA analiza datos de tu empresa y genera insights para tomar decisiones?', weight: 1 },
      { q: '¿Usan IA para analizar información no estructurada? (encuestas, comentarios, reuniones)', weight: 1 },
      { q: '¿La IA propone acciones o recomendaciones concretas?', weight: 1 },
    ],
  },
  {
    id: 'gobernanza', name: 'Gobernanza',
    icon: iconGobernanza, description: '¿El uso de la IA está bajo control?',
    questions: [
      { q: '¿Existe una política formal de uso de IA en tu empresa?', weight: 1 },
      { q: '¿La solución de IA cumple requisitos de privacidad y seguridad? (protección de datos, control de accesos, auditoría)', weight: 1 },
      { q: '¿El equipo recibe formación y tiene un canal para reportar errores? (capacitación y lugar donde avisar si algo falla)', weight: 1 },
    ],
  },
])

const questions = computed(() => areas.flatMap(a => a.questions.map(q => ({ ...q, areaId: a.id }))))
const currentQuestion = computed(() => questions.value[progress.value])
const currentArea = computed(() => areas.find(a => a.id === currentQuestion.value.areaId))
const indicatorIndex = computed(() => {
  const area = currentArea.value
  const offset = areas.slice(0, areas.indexOf(area)).reduce((s, a) => s + a.questions.length, 0)
  return progress.value - offset + 1
})
const totalScore = computed(() => Object.values(answers).filter(Boolean).length)

const areaSegments = computed(() => {
  let offset = 0
  return areas.map(area => {
    const total = area.questions.length
    let answered = 0
    for (let i = 0; i < total; i++) {
      if (answers[offset + i] !== undefined) answered++
    }
    const active = progress.value >= offset && progress.value < offset + total
    const done = answered === total
    offset += total
    return { done, active }
  })
})

const ringRadius = 52
const ringCircumference = 2 * Math.PI * ringRadius
const ringDash = computed(() => {
  const pct = totalScore.value / questions.value.length
  return `${(pct * ringCircumference).toFixed(2)} ${ringCircumference.toFixed(2)}`
})

const levelLabel = (s) => {
  if (s === 0) return 'No iniciada'
  if (s === 1) return 'Inicial'
  if (s === 2) return 'En desarrollo'
  return 'Avanzada'
}
const levelBg = (s) => {
  if (s === 0) return 'bg-red-400'
  if (s === 1) return 'bg-amber-400'
  if (s === 2) return 'bg-primary-400'
  return 'bg-primary-600'
}
const levelDot = (s) => {
  if (s === 0) return 'bg-red-400'
  if (s === 1) return 'bg-amber-400'
  if (s === 2) return 'bg-primary-400'
  return 'bg-primary-600'
}

const globalLevel = computed(() => {
  const s = totalScore.value
  if (s <= 3) return { label: 'Punto de partida', profile: 'Perfil inicial: la IA todavía no forma parte de la operación de forma establecida.' }
  if (s <= 6) return { label: 'Nivel inicial', profile: 'Bases sentadas: hay iniciativas puntuales que todavía no se sistematizaron.' }
  if (s <= 9) return { label: 'En consolidación', profile: 'Avanzando con orden: la IA ya está presente en varias dimensiones y se mide su impacto.' }
  return { label: 'Avanzado', profile: 'Adopción madura: la IA está conectada a la operación y usada para decidir.' }
})

const resumenEjecutivo = computed(() => {
  const s = totalScore.value
  const empresa = user.company || 'Tu empresa'
  if (s <= 3) return `${empresa} todavía no tiene la IA como parte de la operación. Es posible que algunas personas la usen por su cuenta, pero no hay un uso establecido, conectado a los sistemas ni con reglas claras. La buena noticia: estás en el punto donde las primeras decisiones tienen más impacto. Elegir bien un primer caso de uso y ponerle reglas mínimas desde el inicio evita la mayoría de los problemas que aparecen después.`
  if (s <= 6) return `${empresa} dio pasos iniciales con IA. Hay casos puntuales que funcionan, pero todavía falta conectar la IA a los sistemas propios, medir su uso y formalizar las prácticas. Es un buen momento para ordenar lo que funciona, cerrar los grises de gobernanza y pasar de la experimentación a algo más estructural.`
  if (s <= 9) return `${empresa} está consolidando su adopción de IA. La IA ya está conectada a la operación en varias áreas y se mide su impacto. Las oportunidades pendientes están en la profundidad del uso y en la formalización de prácticas. Es momento de profesionalizar lo que funciona y empezar a usarla para decidir, no solo para ejecutar.`
  return `${empresa} tiene una adopción madura de IA. Está conectada a los sistemas, se mide, hay gobernanza y la usa para tomar decisiones. Las oportunidades restantes son de optimización: ampliar cobertura, mejorar la calidad de los insights y mantener la formación del equipo al día.`
})

const oportunidades = computed(() => {
  const sorted = [...areas].sort((a, b) => a.score - b.score)
  return sorted.slice(0, 3).map(a => {
    if (a.id === 'ejecucion') return 'Usar IA para crear y revisar contenido, responder consultas o automatizar un proceso de punta a punta. Es la puerta de entrada más simple y donde el ahorro de tiempo se ve primero. Empezar por un caso de uso concreto con entrada clara.'
    if (a.id === 'configuracion') return 'Conectar la IA al conocimiento propio de la empresa y a los sistemas que ya usan. Hoy la IA responde con generalidades; conectada a la documentación y procesos reales es donde realmente cambia la productividad.'
    if (a.id === 'inteligencia') return 'Usar IA para analizar datos y generar insights, no solo para producir. Pedirle que explique causas y patrones, que analice información no estructurada y que proponga acciones concretas para usar como insumo en reuniones de decisión.'
    if (a.id === 'gobernanza') return 'Definir una política formal de uso de IA, verificar privacidad y seguridad, y armar un canal de formación y reporte de errores. Sin reglas claras, cada persona decide por su cuenta qué comparte y con qué herramienta.'
    return `Avanzar en ${a.name.toLowerCase()}.`
  })
})

const proximoPaso = computed(() => {
  const lowest = [...areas].sort((a, b) => a.score - b.score)[0]
  if (lowest.id === 'ejecucion') return 'Elegí un tipo de contenido que se produce seguido (propuestas, informes, comunicados) y definí un flujo: la IA hace el borrador, una persona revisa. O identificá un proceso repetitivo con entrada clara y automatizalo.'
  if (lowest.id === 'configuracion') return 'Reuní los documentos que más se consultan en un solo lugar, asigná un responsable de mantenerlos y conectá la IA a esa base. Después, elegí un sistema donde el equipo pasa más tiempo y explorá qué integración ya está disponible.'
  if (lowest.id === 'inteligencia') return 'Tomá un informe que el área produce todos los meses y pedile a la IA que explique causas y patrones, no solo que resuma. Compará con la lectura del equipo. Después, hacé que proponga acciones concretas para usar como insumo en la próxima reunión.'
  if (lowest.id === 'gobernanza') return 'Redactá una política de una página: qué herramientas están permitidas, qué datos no se pueden ingresar, quién aprueba nuevos usos. Comunicarla y designar a alguien responsable de revisarla y mantenerla al día.'
  return 'Elegí un solo caso de uso de bajo riesgo y alto volumen, y hacelo bien antes de sumar otro.'
})

const areaOffset = (areaIndex) => areas.slice(0, areaIndex).reduce((s, a) => s + a.questions.length, 0)
const isYes = (areaIndex, questionIndex) => answers[areaOffset(areaIndex) + questionIndex] === true

const recomputeScores = () => {
  let offset = 0
  areas.forEach(a => {
    let s = 0
    for (let i = 0; i < a.questions.length; i++) {
      if (answers[offset + i] === true) s++
    }
    a.score = s
    offset += a.questions.length
  })
}

const persist = () => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ progress: progress.value, answers: { ...answers } }))
  } catch {}
}

const loadSaved = () => {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const data = JSON.parse(raw)
    if (!data || typeof data.progress !== 'number') return
    const hasAnswers = Object.keys(data.answers || {}).length > 0
    if (hasAnswers) {
      Object.keys(data.answers).forEach(k => { answers[k] = data.answers[k] })
      progress.value = Math.min(data.progress, questions.value.length - 1)
      savedCompleted.value = Object.keys(data.answers).length === questions.value.length
      hasSaved.value = true
    }
  } catch {}
}

const startTest = () => {
  direction.value = 'q-left'
  step.value = 'questions'
  progress.value = 0
  Object.keys(answers).forEach(k => delete answers[k])
  areas.forEach(a => { a.score = 0 })
  openArea.value = null
  if (typeof window !== 'undefined') {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }
  hasSaved.value = false
  savedCompleted.value = false
}

const continueTest = () => {
  recomputeScores()
  openArea.value = null
  if (savedCompleted.value) {
    step.value = 'results'
  } else {
    step.value = 'questions'
  }
}

const openSend = () => {
  emailStatus.value = null
  step.value = 'send'
}

const answer = (val) => {
  answers[progress.value] = val
  persist()
  if (progress.value < questions.value.length - 1) {
    direction.value = 'q-left'
    progress.value++
  } else {
    recomputeScores()
    openArea.value = null
    step.value = 'results'
  }
}

const back = () => {
  if (progress.value > 0) {
    direction.value = 'q-right'
    progress.value--
  }
}

const toggleArea = (index) => {
  openArea.value = openArea.value === index ? null : index
}

let touchStartX = 0
const onTouchStart = (event) => {
  touchStartX = event.changedTouches[0].clientX
}
const onTouchEnd = (event) => {
  const dx = event.changedTouches[0].clientX - touchStartX
  if (dx > 60) back()
}

const onKeydown = (event) => {
  if (step.value !== 'questions') return
  const tag = (event.target?.tagName || '').toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return
  if (event.key === '1' || event.key.toLowerCase() === 's') {
    event.preventDefault()
    answer(true)
  } else if (event.key === '2' || event.key.toLowerCase() === 'n') {
    event.preventDefault()
    answer(false)
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    back()
  }
}

const printReport = () => {
  if (typeof window !== 'undefined') window.print()
}

const sendResults = async () => {
  sending.value = true
  emailStatus.value = null
  try {
    const detalleAreas = areas.map((a, ai) => {
      const missing = a.questions.length - a.score
      const pendientes = a.questions
        .map((q, qi) => isYes(ai, qi) ? null : `  - ${q.q}`)
        .filter(Boolean)
      return `\n[${a.name}] ${a.score}/${a.questions.length} · ${levelLabel(a.score)}\n${missing > 0 ? 'Pendientes:\n' + pendientes.join('\n') : 'Dimensión consolidada.'}`
    }).join('\n')

    await emailjs.send(
      config.serviceId,
      config.templateId,
      {
        to_email: user.email,
        from_name: user.name,
        reply_to: user.email,
        message: `INFORME DE DIAGNÓSTICO DE ADOPCIÓN DE IA
${totalScore.value}/${questions.value.length} · ${globalLevel.value.label.toUpperCase()}
${user.company || 'Organización'} · ${user.area || 'Toda la empresa'} · ${today}

${areas.map(a => `${a.name}: ${a.score}/${a.questions.length} · ${levelLabel(a.score)}`).join(' | ')}

RESUMEN EJECUTIVO
${resumenEjecutivo.value}

HALLAZGOS PRIORIZADOS
${oportunidades.value.map((o, i) => `${i + 1}. ${o}`).join('\n')}

PRÓXIMO PASO
${proximoPaso.value}

DETALLE POR DIMENSIÓN${detalleAreas}

---
Empresa: ${user.company || 'No especificada'}
Cargo: ${user.role || 'No especificado'}
Área evaluada: ${user.area || 'No especificada'}
Tamaño: ${user.size || 'No especificado'}
Consentimiento: aceptado

Informe generado a partir de ${questions.value.length} indicadores. Es un punto de partida, no una auditoría técnica.`,
        phone: user.area || 'No especificado',
      },
      { publicKey: config.publicKey }
    )
    emailStatus.value = 'ok'
  } catch {
    emailStatus.value = 'error'
  } finally {
    sending.value = false
  }
}

const clearAll = () => {
  if (typeof window !== 'undefined') {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }
  hasSaved.value = false
  savedCompleted.value = false
  step.value = 'intro'
  progress.value = 0
  openArea.value = null
  Object.keys(answers).forEach(k => delete answers[k])
  areas.forEach(a => { a.score = 0 })
  Object.assign(user, { name: '', email: '', company: '', role: '', area: '', size: '', consent: false })
  emailStatus.value = null
}

watch([progress, answers], persist, { deep: true })

onMounted(() => {
  loadSaved()
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.step-enter-active, .step-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.step-enter-from { opacity: 0; transform: translateY(8px); }
.step-leave-to { opacity: 0; transform: translateY(-8px); }

.q-left-enter-active, .q-left-leave-active,
.q-right-enter-active, .q-right-leave-active { transition: opacity 0.24s ease-out, transform 0.24s ease-out; }
.q-left-enter-from { opacity: 0; transform: translateX(28px); }
.q-left-leave-to { opacity: 0; transform: translateX(-28px); }
.q-right-enter-from { opacity: 0; transform: translateX(-28px); }
.q-right-leave-to { opacity: 0; transform: translateX(28px); }

.accordion-enter-active, .accordion-leave-active { transition: opacity 0.2s ease, max-height 0.25s ease; overflow: hidden; }
.accordion-enter-from, .accordion-leave-to { opacity: 0; max-height: 0; }
.accordion-enter-to, .accordion-leave-from { opacity: 1; max-height: 800px; }

.pl-4\.5 { padding-left: 1.125rem; }

@media (prefers-reduced-motion: reduce) {
  .step-enter-active, .step-leave-active,
  .q-left-enter-active, .q-left-leave-active,
  .q-right-enter-active, .q-right-leave-active,
  .accordion-enter-active, .accordion-leave-active {
    transition: none;
  }
}
</style>