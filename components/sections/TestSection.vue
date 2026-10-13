<template>
  <section id="diagnostico" class="relative py-20 bg-gray-50">
    <div class="relative max-w-4xl mx-auto px-4 sm:px-6">

      <!-- INTRO -->
      <Transition name="fade" mode="out-in">
        <div v-if="step === 'intro'" key="intro" class="text-center">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 max-w-2xl mx-auto">

            <h2 class="text-3xl md:text-4xl font-bold text-primary-700 font-heading mb-4">Diagnóstico IT</h2>

            <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Evaluá la madurez de tu empresa en adopción de IA. 12 preguntas, 4 áreas clave.
              Al terminar recibís un análisis con tus fortalezas, oportunidades y un próximo paso concreto.
            </p>

            <div class="border-t border-gray-100 pt-8 mb-8 text-left">
              <p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-4 text-center">Qué evaluamos</p>
              <ul class="space-y-3 text-sm text-gray-700">
                <li v-for="area in areas" :key="area.id" class="flex items-start gap-3">
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

            <button
              @click="startTest"
              class="inline-flex items-center gap-2 px-10 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              Empezar diagnóstico
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

          </div>
        </div>

        <!-- LEAD CAPTURE FORM (AFTER RESULTS) -->
        <div v-else-if="step === 'send'" key="send" class="reveal" ref="sendRef">
          <div class="text-center mb-10">
            <p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-3">Último paso</p>
            <h2 class="section-title">¿Querés el informe completo?</h2>
            <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full reveal-bar" />
            <p class="section-subtitle max-w-xl mx-auto mt-5 reveal-sub">
              Dejanos tus datos y te enviamos el análisis completo con tus fortalezas, las tres áreas con más oportunidad y un próximo paso concreto.
            </p>
          </div>

          <form @submit.prevent="sendResults" class="bg-gray-50 rounded-2xl border border-gray-100 p-8 max-w-xl mx-auto space-y-4">
            <div>
              <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Nombre *</label>
              <input v-model="user.name" type="text" required placeholder="Tu nombre"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Email laboral *</label>
              <input v-model="user.email" type="email" required placeholder="tu@empresa.com"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Empresa *</label>
              <input v-model="user.company" type="text" required placeholder="Nombre de tu empresa"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Área que evaluaste</label>
              <select v-model="user.area"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent">
                <option value="">Opcional</option>
                <option value="toda-la-empresa">Toda la empresa</option>
                <option value="atencion-al-cliente">Atención al Cliente</option>
                <option value="finanzas">Finanzas</option>
                <option value="legal">Legal</option>
                <option value="marketing">Marketing</option>
                <option value="operaciones">Operaciones</option>
                <option value="recursos-humanos">Recursos Humanos</option>
                <option value="tecnologia">Tecnología</option>
                <option value="ventas">Ventas</option>
                <option value="otra">Otra</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Tamaño de empresa</label>
              <select v-model="user.size"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent">
                <option value="">Opcional</option>
                <option value="1-10">1 a 10 personas</option>
                <option value="11-50">1 a 50 personas</option>
                <option value="51-200">51 a 200 personas</option>
                <option value="201+">Más de 200 personas</option>
              </select>
            </div>
            <label class="flex items-start gap-3 text-xs text-gray-600 pt-2 cursor-pointer">
              <input v-model="user.consent" type="checkbox" required class="mt-0.5 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
              <span>Acepto recibir el análisis y comunicaciones relacionadas. Podés darte de baja cuando quieras.</span>
            </label>

            <button type="submit"
              :disabled="sending"
              class="w-full mt-4 inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl disabled:opacity-60">
              <span v-if="!sending">Enviar informe completo</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando...
              </span>
              <svg v-if="!sending" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>

            <button type="button" @click="step = 'results'"
              class="w-full text-sm text-gray-500 hover:text-primary-600 transition-colors py-2">
              ← Volver al resumen
            </button>
          </form>
        </div>

        <!-- QUESTIONS -->
        <div v-else-if="step === 'questions'" key="questions" class="reveal" ref="questionsRef">
          <div class="text-center mb-8">
            <p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-2">
              {{ currentArea.name }}
            </p>
            <div class="w-full max-w-md mx-auto bg-gray-100 rounded-full h-2 mb-3 overflow-hidden">
              <div class="bg-primary-600 h-2 transition-all duration-500" :style="`width: ${(progress + 1) / questions.length * 100}%`" />
            </div>
            <p class="text-sm text-gray-500">Pregunta {{ progress + 1 }} de {{ questions.length }}</p>
          </div>

          <div class="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <h3 class="text-xl md:text-2xl font-heading font-bold text-gray-900 text-center mb-8 leading-snug">
              {{ currentQuestion.q }}
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <button
                @click="answer(true)"
                class="group bg-white hover:bg-primary-600 border-2 border-primary-600 text-primary-600 hover:text-white font-heading font-bold text-lg py-6 rounded-xl transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Sí
              </button>
              <button
                @click="answer(false)"
                class="group bg-white hover:bg-gray-900 border-2 border-gray-300 text-gray-700 hover:text-white hover:border-gray-900 font-heading font-bold text-lg py-6 rounded-xl transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                No
              </button>
            </div>
          </div>

          <div class="text-center mt-6">
            <button v-if="progress > 0" @click="back" class="text-sm text-gray-500 hover:text-primary-600 transition-colors">
              ← Pregunta anterior
            </button>
          </div>
        </div>

        <!-- RESULTS -->
        <div v-else-if="step === 'results'" key="results" class="reveal" ref="resultsRef">
          <div class="text-center mb-10">
            <p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-3">Tu resultado</p>
            <h2 class="section-title">{{ totalScore }} de {{ questions.length }}</h2>
            <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            <p class="section-subtitle mt-5">
              <span class="font-bold text-primary-700">{{ globalLevel.label }}</span>
              <span class="text-gray-500"> · {{ globalLevel.profile }}</span>
            </p>
          </div>

          <!-- Per-area scores -->
          <div class="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 mb-8">
            <h3 class="font-heading font-bold text-lg text-gray-900 mb-6">Puntaje por área</h3>
            <div class="space-y-5">
              <div v-for="area in areas" :key="area.id">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-semibold text-gray-800">{{ area.name }}</span>
                  <span class="text-sm" :class="levelColor(area.score)">{{ area.score }}/{{ area.questions.length }} · {{ levelLabel(area.score) }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div class="h-2 rounded-full transition-all duration-700" :class="levelBg(area.score)" :style="`width: ${area.score / area.questions.length * 100}%`" />
                </div>
              </div>
            </div>
          </div>

          <!-- Resumen ejecutivo -->
          <div class="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 mb-8">
            <h3 class="font-heading font-bold text-lg text-gray-900 mb-3">Resumen ejecutivo</h3>
            <p class="text-gray-700 leading-relaxed">{{ resumenEjecutivo }}</p>
          </div>

          <!-- Mayores oportunidades -->
          <div v-if="oportunidades.length" class="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 mb-8">
            <h3 class="font-heading font-bold text-lg text-gray-900 mb-4">Tus mayores oportunidades</h3>
            <ul class="space-y-3">
              <li v-for="(op, i) in oportunidades" :key="i" class="flex gap-3">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center mt-0.5">{{ i + 1 }}</span>
                <span class="text-gray-700 leading-relaxed">{{ op }}</span>
              </li>
            </ul>
          </div>

          <!-- Próximo paso -->
          <div class="bg-primary-50 border border-primary-200 rounded-2xl p-6 md:p-8 mb-8">
            <p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-700 mb-2">Tu próximo paso</p>
            <p class="text-gray-800 leading-relaxed">{{ proximoPaso }}</p>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              @click="step = 'send'"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              Recibir informe por mail
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <button
              @click="reset"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:border-primary-600 hover:text-primary-600"
            >
              Volver a empezar
            </button>
          </div>

          <p class="text-xs text-gray-400 text-center mt-10">
            Este resumen se generó a partir de tus {{ questions.length }} respuestas. Es un punto de partida, no una auditoría. Podés repetir el test cuando quieras para medir tu avance.
          </p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import emailjs from '@emailjs/browser'
import { useIntersectionObserver } from '@vueuse/core'

const config = useRuntimeConfig().public.emailjs

const step = ref('intro')
const progress = ref(0)
const answers = reactive({})
const user = reactive({ name: '', email: '', company: '', area: '', size: '', consent: false })
const sending = ref(false)
const emailStatus = ref(null)

const introRef = ref(null)
const sendRef = ref(null)
const questionsRef = ref(null)
const resultsRef = ref(null)

useIntersectionObserver(introRef, ([{ isIntersecting }]) => { if (isIntersecting) introRef.value?.classList.add('visible') })
useIntersectionObserver(sendRef, ([{ isIntersecting }]) => { if (isIntersecting) sendRef.value?.classList.add('visible') })
useIntersectionObserver(questionsRef, ([{ isIntersecting }]) => { if (isIntersecting) questionsRef.value?.classList.add('visible') })
useIntersectionObserver(resultsRef, ([{ isIntersecting }]) => { if (isIntersecting) resultsRef.value?.classList.add('visible') })

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
const totalScore = computed(() => Object.values(answers).filter(Boolean).length)

const startTest = () => { step.value = 'questions'; progress.value = 0 }
const answer = (val) => {
  answers[progress.value] = val
  if (progress.value < questions.value.length - 1) {
    progress.value++
  } else {
    recomputeScores()
    step.value = 'results'
  }
}
const back = () => { if (progress.value > 0) progress.value-- }

const recomputeScores = () => {
  let offset = 0
  areas.forEach(a => {
    let s = 0
    for (let i = 0; i < a.questions.length; i++) {
      if (answers[offset + i]) s++
    }
    a.score = s
    offset += a.questions.length
  })
}

const levelLabel = (s) => {
  if (s === 0) return 'No iniciada'
  if (s === 1) return 'Inicial'
  if (s === 2) return 'En desarrollo'
  return 'Avanzada'
}
const levelColor = (s) => {
  if (s === 0) return 'text-red-600'
  if (s === 1) return 'text-orange-600'
  if (s === 2) return 'text-yellow-600'
  return 'text-green-600'
}
const levelBg = (s) => {
  if (s === 0) return 'bg-red-500'
  if (s === 1) return 'bg-orange-500'
  if (s === 2) return 'bg-yellow-500'
  return 'bg-green-500'
}

const globalLevel = computed(() => {
  const s = totalScore.value
  if (s <= 3) return { label: 'Punto de partida', profile: 'Perfil inicial' }
  if (s <= 6) return { label: 'Nivel inicial', profile: 'Bases sentadas' }
  if (s <= 9) return { label: 'En consolidación', profile: 'Avanzando con orden' }
  return { label: 'Avanzado', profile: 'Adopción madura' }
})

const resumenEjecutivo = computed(() => {
  const s = totalScore.value
  const empresa = user.company || 'tu empresa'
  if (s <= 3) return `En ${empresa}, la IA todavía no forma parte de la operación. Es posible que algunas personas la usen por su cuenta, pero no hay un uso establecido, conectado a los sistemas de la empresa ni con reglas claras. La buena noticia: estás en el punto donde las primeras decisiones tienen más impacto. Elegir bien un primer caso de uso y ponerle reglas mínimas desde el inicio evita la mayoría de los problemas que aparecen después.`
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

const sendResults = async () => {
  sending.value = true
  emailStatus.value = null
  try {
    const detalleAreas = areas.map(a => {
      const missing = a.questions.length - a.score
      const preguntasNo = a.questions
        .map((q, i) => answers[areas.slice(0, areas.indexOf(a)).reduce((s, x) => s + x.questions.length, 0) + i] ? null : `  - ${q.q}`)
        .filter(Boolean)
      return `\n[${a.name}] ${a.score}/${a.questions.length} - ${levelLabel(a.score)}\n${missing > 0 ? 'Lo que falta:\n' + preguntasNo.join('\n') : 'Área consolidada.'}`
    }).join('\n')

    await emailjs.send(
      config.serviceId,
      config.templateId,
      {
        to_email: user.email,
        from_name: user.name,
        reply_to: user.email,
        message: `TU ANÁLISIS DE ADOPCIÓN DE IA
${totalScore.value}/${questions.value.length} - ${globalLevel.value.label.toUpperCase()} · ${globalLevel.value.profile.toUpperCase()}
${user.company} · ${user.area || 'toda la empresa'} · ${new Date().toLocaleDateString('es-AR')}

${areas.map(a => `${a.name}: ${a.score}/${a.questions.length} ${levelLabel(a.score)}`).join(' | ')}

RESUMEN EJECUTIVO
${resumenEjecutivo.value}

TUS MAYORES OPORTUNIDADES
${oportunidades.value.map((o, i) => `${i + 1}. ${o}`).join('\n')}

TU PRÓXIMO PASO
${proximoPaso.value}

DETALLE POR ÁREA${detalleAreas}

---
Empresa: ${user.company}
Área evaluada: ${user.area || 'No especificada'}
Tamaño: ${user.size || 'No especificado'}
Consentimiento: Aceptó recibir el análisis

Este análisis se generó a partir de tus ${questions.value.length} respuestas. Es un punto de partida, no una auditoría.`,
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

const reset = () => {
  step.value = 'intro'
  progress.value = 0
  Object.keys(answers).forEach(k => delete answers[k])
  areas.forEach(a => { a.score = 0 })
  Object.assign(user, { name: '', email: '', company: '', area: '', size: '', consent: false })
  emailStatus.value = null
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-bar { transform: scaleX(0); transform-origin: center; transition: transform 0.6s ease; }
.reveal.visible .reveal-bar { transform: scaleX(1); }
.reveal-sub { opacity: 0; transform: translateY(10px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible .reveal-sub { opacity: 1; transform: translateY(0); }
</style>