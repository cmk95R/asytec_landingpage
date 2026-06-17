<template>
  <section id="services" class="py-24 bg-gray-50 relative overflow-hidden">
    <!-- Decoración de fondo -->
    <div aria-hidden="true" class="absolute inset-0 pointer-events-none">
      <div class="absolute -top-20 -left-20 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-50" />
      <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-40" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-20 reveal" ref="headerRef">
        
        <h2 class="section-title">Nuestros Servicios</h2>
        <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full reveal-bar" />
        <p class="section-subtitle max-w-2xl mx-auto mt-5 reveal-sub">
          Soluciones integrales de tecnología y consultoría, diseñadas para impulsar el crecimiento de tu empresa.
        </p>
      </div>

      <!-- Services -->
      <div class="flex flex-col gap-12 md:gap-20">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          :ref="el => serviceRefs[i] = el"
          :class="[
            'service-card grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch group/card',
            i % 2 === 0 ? 'reveal-left' : 'reveal-right',
          ]"
          :style="`transition-delay: ${i * 80}ms`"
        >
          <!-- Image -->
          <div
            :class="['service-image relative overflow-hidden rounded-2xl shadow-lg border border-gray-100', i % 2 !== 0 ? 'md:order-2' : '']"
            style="min-height: 300px"
          >
            <NuxtImg
              :src="service.image"
              :alt="service.title"
              format="webp"
              loading="lazy"
              class="service-img absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-primary-700/10 to-transparent transition-opacity duration-500 group-hover/card:opacity-70" />

            <!-- Shimmer overlay al hover -->
            <div class="shimmer absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-out" />

            <!-- Badge numerado -->
            <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary-700 font-heading font-extrabold text-sm shadow-md ring-2 ring-primary-200 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12">
                0{{ i + 1 }}
              </span>
            </div>

            <!-- Ícono flotante grande -->
            <div class="absolute bottom-4 right-4 z-10 transition-all duration-500 group-hover/card:scale-110 group-hover/card:-rotate-6">
              <span class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-sm text-primary-600 shadow-lg ring-1 ring-primary-100" v-html="service.icon" />
            </div>
          </div>

          <!-- Content -->
          <div
            :class="[
              'service-content bg-white p-8 lg:p-12 flex flex-col justify-center rounded-2xl shadow-md border border-gray-100 relative',
              i % 2 !== 0 ? 'md:order-1' : '',
            ]"
          >
            <!-- Acento lateral -->
            <span class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary-500 rounded-r-full transition-all duration-500 group-hover/card:h-2/3" />

            <div class="flex items-center gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100 transition-all duration-500 group-hover/card:bg-primary-600 group-hover/card:text-white group-hover/card:rotate-6" v-html="service.icon" />
              <h3 class="font-heading font-bold text-2xl text-gray-800 group-hover/card:text-primary-700 transition-colors duration-300">{{ service.title }}</h3>
            </div>

            <ul class="space-y-3">
              <li
                v-for="(item, j) in service.items"
                :key="item"
                class="service-item flex gap-3 text-gray-600 text-sm leading-relaxed"
                :style="`transition-delay: ${j * 80 + 200}ms`"
              >
                <span class="check-bullet flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary-50 text-primary-600 inline-flex items-center justify-center transition-all duration-300 group-hover/card:bg-primary-600 group-hover/card:text-white">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <span>{{ item }}</span>
              </li>
            </ul>

           
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const headerRef = ref(null)
const serviceRefs = ref([])

useIntersectionObserver(headerRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    headerRef.value?.classList.add('visible')
    setTimeout(() => headerRef.value?.classList.add('sub-visible'), 400)
    setTimeout(() => headerRef.value?.classList.add('bar-visible'), 200)
  }
}, { threshold: 0.2 })

onMounted(() => {
  serviceRefs.value.forEach((el) => {
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible')
        el.querySelectorAll('.service-item').forEach((it) => it.classList.add('visible'))
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(el)
  })
})

const checkIcon = '<svg fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>'

const services = [
  {
    title: 'Consultoría y procesos',
    image: '/images/consultoria3.277d5b8f.jpg',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
    items: [
      'Software ERP: Implementación, customización, soporte funcional/mesa de ayuda de JD Edwards, SAP, Oracle, IFS.',
      'Procesos de Negocio: relevamiento, análisis, documentación, diagnóstico, optimización y rediseño de procesos.',
      'Asesoramiento para la selección e implementación de software (CRM, ERP y otros).',
      'Diseño, implementación e integración de soluciones tecnológicas.',
    ],
  },
  {
    title: 'Desarrollo de software',
    image: '/images/desarrollo3.93f477fa.jpg',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
    items: [
      'Diseño de sitios institucionales.',
      'Construcción de aplicaciones a medida, web y mobile.',
      'Integración de aplicaciones con sistemas de gestión.',
      'Programación en múltiples plataformas: AS/400 (RPG, ILE RPG, Cobol), DB2, SQL Server, .NET, Java, PHP, C#, JavaScript, HTML/CSS, ABAP4.',
    ],
  },
  {
    title: 'Administración de plataformas',
    image: '/images/soporte.86983cf4.jpg',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>',
    items: [
      'Administración de redes y servidores (AS/400, Windows, Linux).',
      'Monitoreo de redes y mantenimiento preventivo y correctivo.',
      'Servicio técnico presencial y remoto.',
      'Instalación, configuración y mantenimiento de PCs, software de oficina y conexión a Internet.',
    ],
  },
  {
    title: 'Seguridad de la información',
    image: '/images/seguridad.cc1842ae.jpg',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    items: [
      'Asistencia en la operación e implementación de seguridad perimetral en redes.',
      'Control de cumplimiento de normativas SOX, PCI.',
      'Detección de vulnerabilidades, Test de penetración.',
      'Análisis auditoría seguridad informática: automatización de controles, compliance, identificación y reporte de desvíos.',
    ],
  },
  {
    title: 'Gestión de proyectos y presupuestos de TI',
    image: '/images/gestion.04a56933.jpg',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
    items: [
      'Enfoque integral para la planificación, administración y control de proyectos tecnológicos.',
      'Gestión de portafolios y proyectos de TI.',
      'Seguimiento del cumplimiento presupuestario y optimización de costos.',
      'Control total sobre inversiones tecnológicas para maximizar la rentabilidad.',
    ],
  },
  {
    title: 'Selección de talento',
    image: '/images/RRHH.bdec2acf.jpg',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
    items: [
      'Amplia experiencia en búsquedas de personal con entendimiento claro del perfil solicitado.',
      'Proceso con bases de datos y redes de contactos propias y de terceros.',
      'Comunicación fluida con el cliente para ajustes en función de variables del mercado.',
      'Presentación de terna con informe comparativo detallado y acompañamiento hasta la incorporación.',
    ],
  },
]
</script>

<style scoped>
/* Reveal base */
.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

.reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.8s ease, transform 0.8s ease; }
.reveal-left.visible { opacity: 1; transform: translateX(0); }

.reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
.reveal-right.visible { opacity: 1; transform: translateX(0); }

/* Header stagger */
.reveal-badge { display: inline-flex; opacity: 0; transform: translateY(-10px); transition: opacity 0.5s ease, transform 0.5s ease; }
.reveal.visible .reveal-badge { opacity: 1; transform: translateY(0); }

.reveal-bar { transform: scaleX(0); transform-origin: center; transition: transform 0.6s ease; }
.reveal.visible .bar-visible { transform: scaleX(1); }

.reveal-sub { opacity: 0; transform: translateY(10px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible .sub-visible { opacity: 1; transform: translateY(0); }

/* Card hover */
.service-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.service-card:hover {
  transform: translateY(-6px);
}

/* Image zoom on card hover */
.service-img {
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.service-card:hover .service-img {
  transform: scale(1.08);
}

/* Shimmer sobre la imagen */
.shimmer {
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%);
  pointer-events: none;
}

/* Items de la lista */
.service-item {
  opacity: 0;
  transform: translateX(-15px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.service-item.visible {
  opacity: 1;
  transform: translateX(0);
}
.service-card:hover .service-item { transform: translateX(4px); }

/* Check bullet hover */
.check-bullet {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}
.service-card:hover .check-bullet {
  transform: scale(1.1) rotate(-6deg);
}
</style>
