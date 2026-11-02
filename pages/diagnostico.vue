<template>
  <div>
    <TheNavbar />
    <main>

      <!-- HERO -->
      <section class="no-print relative pt-32 pb-16 bg-gradient-to-b from-primary-50 via-white to-white overflow-hidden">
        <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
          <div class="absolute inset-0 opacity-[0.35]"
            style="background-image: linear-gradient(#cce0f5 1px, transparent 1px), linear-gradient(90deg, #cce0f5 1px, transparent 1px); background-size: 56px 56px;" />
          <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-60" />
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <div class="max-w-xl">
              <p class="text-xs md:text-sm font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-4">
                Evaluación de madurez en IA
              </p>

              <h1 class="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 leading-tight mb-6">
                Diagnóstico de adopción de IA
              </h1>

              <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                12 indicadores sobre lo que tu empresa ya hace hoy. Al finalizar se genera un informe con el
                puntaje por dimensión, los hallazgos priorizados y un próximo paso concreto.
              </p>

              <div class="flex flex-wrap items-center gap-4">
                <button type="button" @click="open"
                  class="inline-flex items-center gap-2 px-9 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl">
                  Comenzar evaluación
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <a href="#metodologia"
                  class="inline-flex items-center gap-2 px-7 py-4 border border-primary-200 text-primary-700 font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:border-primary-600 hover:bg-primary-50">
                  Ver metodología
                </a>
              </div>

              <p class="text-sm text-gray-500 mt-5">Sin costo · Los datos de contacto se solicitan al final.</p>
            </div>

            <div class="relative">
              <div
                class="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 md:p-7 max-w-md mx-auto"
                @focusin="samplePaused = true"
                @focusout="samplePaused = false"
              >
                <div class="flex items-center justify-between pb-5 border-b border-gray-100">
                  <div>
                    <p class="text-[10px] font-heading font-bold uppercase tracking-[0.18em] text-primary-600">Informe de diagnóstico</p>
                    <p class="text-xs text-gray-500 mt-1">Organización · fecha</p>
                  </div>
                  <div class="relative w-16 h-16">
                    <svg viewBox="0 0 120 120" class="w-full h-full -rotate-90">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="#e6f0fa" stroke-width="12" />
                      <circle
                        cx="60" cy="60" r="52" fill="none" stroke="#0d4f9a" stroke-width="12" stroke-linecap="round"
                        class="transition-all duration-700"
                        :stroke-dasharray="ringDash(currentSample.score)"
                      />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="font-heading font-extrabold text-base text-gray-900">{{ currentSample.score }}/12</span>
                    </div>
                  </div>
                </div>

                <Transition name="sample" mode="out-in">
                  <div :key="currentSample.key" class="pt-5 space-y-4">
                    <div v-for="row in currentSample.rows" :key="row.name">
                      <div class="flex items-center justify-between mb-1.5">
                        <span class="text-xs font-medium text-gray-700">{{ row.name }}</span>
                        <span class="text-[11px] text-gray-400">{{ row.score }}/3</span>
                      </div>
                      <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          class="h-1.5 rounded-full bg-primary-600 transition-all duration-700"
                          :style="`width: ${row.score / 3 * 100}%`"
                        />
                      </div>
                    </div>
                  </div>
                </Transition>

                <div class="mt-6 pt-5 border-t border-gray-100">
                  <p class="text-[10px] font-heading font-bold uppercase tracking-[0.18em] text-gray-400 mb-1">Nivel de madurez</p>
                  <Transition name="sample" mode="out-in">
                    <p :key="currentSample.key" class="text-sm font-heading font-bold text-primary-700">
                      {{ currentSample.level }}
                    </p>
                  </Transition>
                </div>
              </div>

              <div class="mt-4 flex items-center justify-center gap-2">
                <button
                  v-for="(sample, i) in sampleReports"
                  :key="sample.key"
                  type="button"
                  @click="selectSample(i)"
                  :aria-label="`Ver ejemplo: ${sample.level}`"
                  :aria-pressed="sampleIndex === i"
                  :class="[
                    'h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                    sampleIndex === i ? 'w-6 bg-primary-600' : 'w-1.5 bg-gray-300 hover:bg-primary-300'
                  ]"
                />
              </div>

              <div aria-hidden="true" class="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-100 rounded-full blur-2xl opacity-70" />
            </div>

          </div>

          <div class="mt-16 pt-8 border-t border-gray-200/70">
            <ul class="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-heading font-semibold uppercase tracking-[0.15em] text-gray-500">
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary-500" />
                4 dimensiones
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary-500" />
                12 indicadores
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary-500" />
                Sin costo
              </li>
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary-500" />
                Confidencial
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- METODOLOGÍA -->
      <section id="metodologia" class="no-print scroll-mt-20 py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="text-center mb-14">
            <h2 class="section-title">Metodología</h2>
            <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            <p class="section-subtitle max-w-2xl mx-auto mt-5">
              Cuatro dimensiones que describen cómo se adopta la IA en una organización, desde la ejecución
              diaria hasta el control y la gobernanza.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <article
              v-for="dim in dimensions"
              :key="dim.name"
              class="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div class="flex items-center gap-4 mb-5">
                <span class="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="dim.iconPath" />
                  </svg>
                </span>
                <h3 class="font-heading font-bold text-xl text-gray-900">{{ dim.name }}</h3>
              </div>

              <p class="text-sm text-gray-600 leading-relaxed mb-5">{{ dim.definition }}</p>

              <dl class="space-y-3 text-sm">
                <div>
                  <dt class="text-xs font-heading font-bold uppercase tracking-wider text-gray-400 mb-1">Qué mide</dt>
                  <dd class="text-gray-700">{{ dim.measures }}</dd>
                </div>
                <div>
                  <dt class="text-xs font-heading font-bold uppercase tracking-wider text-gray-400 mb-1">Indicador de ejemplo</dt>
                  <dd class="text-gray-600 italic">{{ dim.example }}</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      <!-- CÓMO FUNCIONA -->
      <section class="no-print py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="text-center mb-14">
            <h2 class="section-title">Cómo funciona</h2>
            <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            <p class="section-subtitle max-w-2xl mx-auto mt-5">12 indicadores, 4 dimensiones, un informe.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <article v-for="(step, i) in steps" :key="step.title" class="text-center">
              <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-600 text-white font-heading font-extrabold text-lg mb-5">
                0{{ i + 1 }}
              </div>
              <h3 class="font-heading font-bold text-lg text-gray-900 mb-3">{{ step.title }}</h3>
              <p class="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">{{ step.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- PARA QUIÉN ES -->
      <section class="no-print py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="text-center mb-14">
            <h2 class="section-title">Para quién es</h2>
            <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            <p class="section-subtitle max-w-2xl mx-auto mt-5">Si decidís sobre el trabajo de otros, te sirve.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article class="bg-white border border-gray-200 rounded-2xl p-8">
              <div class="flex items-center gap-3 mb-5">
                <div class="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="font-heading font-bold text-lg text-gray-900">Te sirve si</h3>
              </div>
              <ul class="space-y-3 text-sm text-gray-700">
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>Dirigís una PyME o un área y tenés que decidir dónde aplicar IA primero.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>Probaste herramientas de IA con tu equipo y no supiste cómo seguir.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <span>Te ofrecieron soluciones de IA y no tenés con qué evaluarlas.</span>
                </li>
              </ul>
            </article>

            <article class="bg-white border border-gray-200 rounded-2xl p-8">
              <div class="flex items-center gap-3 mb-5">
                <div class="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 class="font-heading font-bold text-lg text-gray-900">No te sirve si</h3>
              </div>
              <ul class="space-y-3 text-sm text-gray-700">
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  <span>Buscás una herramienta puntual y ya sabés cuál necesitás.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  <span>Querés una auditoría técnica de tus sistemas: esto evalúa la operación, no el stack.</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <!-- CONFIDENCIALIDAD -->
      <section class="no-print py-14 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
          <div class="bg-white border border-gray-200 rounded-2xl p-7 md:p-8 flex flex-col md:flex-row gap-6 items-start">
            <span class="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <div>
              <h2 class="font-heading font-bold text-lg text-gray-900 mb-2">Confidencialidad</h2>
              <p class="text-sm text-gray-600 leading-relaxed">
                Tus respuestas se procesan en tu navegador. Los datos de contacto se usan únicamente para enviarte
                el informe y, si lo autorizás, para contactarte. El resultado es un punto de partida y no reemplaza
                una auditoría técnica. Podés solicitar la eliminación de tus datos escribiendo a
                <a href="#contact" class="text-primary-700 underline decoration-primary-300 hover:decoration-primary-600">nuestro equipo</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CIERRE CTA -->
      <section class="no-print py-20 bg-white">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-gray-900 leading-tight mb-5">
            Cinco minutos de evaluación, una decisión mejor informada.
          </h2>
          <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            La evaluación y el informe no tienen costo. El resultado te permite priorizar con criterio antes de invertir.
          </p>
          <button type="button" @click="open"
            class="inline-flex items-center gap-2 px-9 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl">
            Comenzar evaluación
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>

    </main>
    <TheFooter />
  </div>
</template>

<script setup>
const { open } = useDiagnosticoModal()

const dimensions = [
  {
    name: 'Ejecución',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    definition: 'El grado en que la IA participa de la operación cotidiana: responde consultas, produce contenido y automatiza tareas concretas.',
    measures: 'Uso real y sostenido de IA en el trabajo diario del equipo.',
    example: 'La IA responde consultas internas y externas por un canal oficial de la empresa.',
  },
  {
    name: 'Configuración',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    definition: 'Cuánto sabe la IA sobre la empresa: si consulta su documentación, se integra con sus sistemas y su uso se monitorea.',
    measures: 'Profundidad de la integración entre la IA y los activos de información de la organización.',
    example: 'La IA consulta una base de conocimiento propia y está integrada a un sistema en uso.',
  },
  {
    name: 'Inteligencia',
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    definition: 'La capacidad de la IA para aportar análisis y no solo ejecución: interpretar datos, procesar texto y recomendar acciones.',
    measures: 'Valor analítico que la IA agrega a las decisiones.',
    example: 'La IA explica causas y patrones en los datos y propone acciones priorizadas.',
  },
  {
    name: 'Gobernanza',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    definition: 'Los controles que ordenan el uso: políticas formales, privacidad y seguridad, formación del equipo y canales de reporte.',
    measures: 'Nivel de control y previsibilidad sobre el uso de IA en la organización.',
    example: 'Existe una política formal de uso y un canal para reportar errores.',
  },
]

const steps = [
  {
    title: 'Respondés 12 indicadores',
    text: 'Preguntas de Sí o No sobre lo que la empresa ya hace hoy. Sin escalas ni respuestas ambiguas.',
  },
  {
    title: 'Se puntúa en el momento',
    text: 'Cada dimensión se calcula al finalizar. El procesamiento ocurre en tu navegador.',
  },
  {
    title: 'Recibís el informe',
    text: 'Puntaje por dimensión, hallazgos priorizados y próximo paso. Descargable en PDF o por correo.',
  },
]

const sampleReports = [
  {
    key: 'inicial',
    score: 2,
    level: 'Inicial',
    rows: [
      { name: 'Ejecución', score: 1 },
      { name: 'Configuración', score: 1 },
      { name: 'Inteligencia', score: 0 },
      { name: 'Gobernanza', score: 0 },
    ],
  },
  {
    key: 'medio',
    score: 6,
    level: 'Medio',
    rows: [
      { name: 'Ejecución', score: 2 },
      { name: 'Configuración', score: 2 },
      { name: 'Inteligencia', score: 1 },
      { name: 'Gobernanza', score: 1 },
    ],
  },
  {
    key: 'avanzado',
    score: 11,
    level: 'Avanzado',
    rows: [
      { name: 'Ejecución', score: 3 },
      { name: 'Configuración', score: 3 },
      { name: 'Inteligencia', score: 3 },
      { name: 'Gobernanza', score: 2 },
    ],
  },
]

const sampleIndex = ref(0)
const samplePaused = ref(false)
const currentSample = computed(() => sampleReports[sampleIndex.value])

const ringCircumference = 2 * Math.PI * 52
const ringDash = (score) => {
  const filled = (score / 12) * ringCircumference
  return `${filled.toFixed(1)} ${ringCircumference.toFixed(1)}`
}

const selectSample = (index) => {
  sampleIndex.value = index
}

let sampleTimer = null

onMounted(() => {
  sampleTimer = window.setInterval(() => {
    if (!samplePaused.value) {
      sampleIndex.value = (sampleIndex.value + 1) % sampleReports.length
    }
  }, 4500)
})

onUnmounted(() => {
  if (sampleTimer) window.clearInterval(sampleTimer)
})

useSeoMeta({
  title: 'Diagnóstico de adopción de IA — ASYTEC Sistemas',
  description: 'Evaluación de madurez en IA: 12 indicadores, 4 dimensiones y un informe con hallazgos priorizados y próximo paso. Sin costo.',
  ogTitle: 'Diagnóstico de adopción de IA — ASYTEC Sistemas',
  ogDescription: 'Evaluá la madurez en IA de tu empresa en 12 indicadores y recibí un informe con hallazgos priorizados.',
  ogImage: '/images/carousel1.e3fa0991.png',
})
</script>

<style scoped>
.sample-enter-active,
.sample-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.sample-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.sample-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
  .sample-enter-active,
  .sample-leave-active {
    transition: none;
  }
}
</style>