<template>
  <div>
    <TheNavbar />
    <main>

      <!-- HERO INTRO -->
      <section class="relative pt-32 pb-16 bg-white overflow-hidden">
        <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
          <div class="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-40" />
          <div class="absolute bottom-0 right-10 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-30" />
        </div>
        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p class="text-xs md:text-sm font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-4">Test gratuito · 5 minutos</p>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 leading-tight mb-6">
            ¿Tu empresa está lista para usar IA?
          </h1>
          <p class="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            12 preguntas de Sí o No sobre lo que tu empresa ya hace. Al terminar recibís un análisis de 4 áreas con tus fortalezas, tus tres mayores oportunidades y un próximo paso concreto.
          </p>
          <a href="#test-section"
            class="inline-flex items-center gap-2 px-10 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5">
            Empezar el test
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <p class="text-sm text-gray-500 mt-4">Es gratis. Te pedimos los datos solo al final, porque el análisis va por ahí.</p>
        </div>
      </section>

      <!-- PARA QUÉ SIRVE -->
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="text-center mb-14">
            <h2 class="section-title">Para qué sirve</h2>
            <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            <p class="section-subtitle max-w-2xl mx-auto mt-5">Para dejar de adivinar por dónde empezar.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article class="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-xl transition-all duration-500">
              <div class="w-14 h-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="font-heading font-bold text-lg text-gray-900 mb-3">Te ubica</h3>
              <p class="text-sm text-gray-600 leading-relaxed">La mayoría de las empresas no sabe si está adelantada o atrasada con la IA porque no tiene con qué compararse. El test te da una posición concreta en cuatro áreas, no una sensación.</p>
            </article>

            <article class="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-xl transition-all duration-500">
              <div class="w-14 h-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </div>
              <h3 class="font-heading font-bold text-lg text-gray-900 mb-3">Te ordena la prioridad</h3>
              <p class="text-sm text-gray-600 leading-relaxed">No todas las áreas valen lo mismo. El análisis te marca las tres áreas con mayor oportunidad: las que más impacto te dan por el menor esfuerzo.</p>
            </article>

            <article class="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:shadow-xl transition-all duration-500">
              <div class="w-14 h-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h3 class="font-heading font-bold text-lg text-gray-900 mb-3">Te deja un próximo paso</h3>
              <p class="text-sm text-gray-600 leading-relaxed">Termina con algo que podés hacer esta semana sin contratar a nadie. Si después querés ayuda, sabés para qué la estás pidiendo.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- QUÉ HACE -->
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="text-center mb-14">
            <h2 class="section-title">Qué hace</h2>
            <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            <p class="section-subtitle max-w-2xl mx-auto mt-5">12 preguntas, 4 áreas, un análisis.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white font-heading font-extrabold text-2xl mb-5 shadow-md">01</div>
              <h3 class="font-heading font-bold text-lg text-gray-900 mb-3">Respondés Sí o No</h3>
              <p class="text-sm text-gray-600 leading-relaxed">12 preguntas sobre lo que tu empresa ya hace hoy: sus procesos, sus datos, su equipo y sus herramientas. Sin escalas del uno al diez ni "depende": o pasa en tu empresa o no pasa.</p>
            </article>

            <article class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white font-heading font-extrabold text-2xl mb-5 shadow-md">02</div>
              <h3 class="font-heading font-bold text-lg text-gray-900 mb-3">Se puntúa en el momento</h3>
              <p class="text-sm text-gray-600 leading-relaxed">Cada área se calcula con tus respuestas apenas terminás. No hay nadie leyendo del otro lado ni una consultoría disfrazada de formulario.</p>
            </article>

            <article class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white font-heading font-extrabold text-2xl mb-5 shadow-md">03</div>
              <h3 class="font-heading font-bold text-lg text-gray-900 mb-3">Recibís el análisis</h3>
              <p class="text-sm text-gray-600 leading-relaxed">Tu puntaje por área, tus fortalezas, las tres oportunidades más grandes y el paso siguiente. Te lo mandamos por mail para que lo tengas y lo puedas compartir con tu equipo.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- PARA QUIÉN ES -->
      <section class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="text-center mb-14">
            <h2 class="section-title">Para quién es</h2>
            <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            <p class="section-subtitle max-w-2xl mx-auto mt-5">Si decidís sobre el trabajo de otros, te sirve.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article class="bg-white border-2 border-green-200 rounded-2xl p-8">
              <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="font-heading font-bold text-lg text-gray-900">Te sirve si</h3>
              </div>
              <ul class="space-y-3 text-sm text-gray-700">
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span>Dirigís una PyME o un área y tenés que decidir dónde meter IA primero.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span>Probaste ChatGPT con tu equipo y no supiste cómo seguir.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span>Te ofrecieron soluciones de IA y no tenés con qué evaluarlas.</span>
                </li>
              </ul>
            </article>

            <article class="bg-white border-2 border-red-200 rounded-2xl p-8">
              <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 class="font-heading font-bold text-lg text-gray-900">No te sirve si</h3>
              </div>
              <ul class="space-y-3 text-sm text-gray-700">
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>Buscás una herramienta puntual y ya sabés cuál.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span>Querés una auditoría técnica de tus sistemas: esto mira tu operación, no tu stack.</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <!-- CIERRE CTA -->
      <section class="py-20 bg-white">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 class="text-3xl md:text-4xl font-heading font-extrabold text-gray-900 leading-tight mb-5">
            Cinco minutos ahora, o seis meses probando cosas sueltas.
          </h2>
          <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            El test es gratis y el análisis también. Lo peor que puede pasar es que confirmes que vas bien.
          </p>
          <a href="#test-section"
            class="inline-flex items-center gap-2 px-10 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-0.5">
            Hacer el test
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      <!-- TEST -->
      <div id="test-section" class="scroll-mt-20">
        <TestSection />
      </div>

    </main>
    <TheFooter />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Diagnóstico IA — ¿Tu empresa está lista para usar IA? | ASYTEC Sistemas',
  description: '17 preguntas, 5 áreas clave. En 5 minutos conocé tu nivel de madurez IT y recibí un análisis con tus fortalezas, oportunidades y un próximo paso concreto.',
  ogTitle: 'Diagnóstico IA — ASYTEC Sistemas',
  ogDescription: 'Evaluá la madurez tecnológica de tu empresa en 5 minutos.',
  ogImage: '/images/carousel1.e3fa0991.png',
})
</script>