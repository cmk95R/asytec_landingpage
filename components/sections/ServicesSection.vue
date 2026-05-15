<template>
  <section id="services" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="text-center mb-16 reveal" ref="headerRef">
        <p class="text-sm font-heading font-semibold tracking-widest uppercase text-primary-500 mb-2">Lo que hacemos</p>
        <h2 class="section-title">Nuestros Servicios</h2>
        <div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
      </div>

      <!-- Services -->
      <div class="flex flex-col gap-0">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          :ref="el => serviceRefs[i] = el"
          :class="[
            'service-card grid grid-cols-1 md:grid-cols-2 overflow-hidden',
            i % 2 === 0 ? 'reveal-left' : 'reveal-right',
            i === 0 ? 'rounded-t-2xl' : '',
            i === services.length - 1 ? 'rounded-b-2xl' : '',
          ]"
          :style="`transition-delay: ${i * 50}ms`"
        >
          <!-- Image -->
          <div
            :class="['relative overflow-hidden', i % 2 !== 0 ? 'md:order-2' : '']"
            style="min-height: 300px"
          >
            <img
              :src="service.image"
              :alt="service.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-transparent" />
          </div>

          <!-- Content -->
          <div
            :class="[
              'bg-white p-10 flex flex-col justify-center',
              i % 2 !== 0 ? 'md:order-1' : '',
            ]"
          >
            <h3 class="font-heading font-bold text-2xl text-gray-800 mb-4">{{ service.title }}</h3>
            <ul class="space-y-2">
              <li
                v-for="item in service.items"
                :key="item"
                class="flex gap-3 text-gray-600 text-sm leading-relaxed"
              >
                <span class="text-primary-500 mt-0.5 flex-shrink-0">•</span>
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
  if (isIntersecting) headerRef.value?.classList.add('visible')
}, { threshold: 0.2 })

onMounted(() => {
  serviceRefs.value.forEach((el) => {
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible')
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(el)
  })
})

const services = [
  {
    title: 'Consultoría y procesos',
    image: 'https://asytec.com/_next/static/media/consultoria3.277d5b8f.jpg',
    items: [
      'Software ERP: Implementación, customización, soporte funcional/mesa de ayuda de JD Edwards, SAP, Oracle, IFS.',
      'Procesos de Negocio: relevamiento, análisis, documentación, diagnóstico, optimización y rediseño de procesos.',
      'Asesoramiento para la selección e implementación de software (CRM, ERP y otros).',
      'Diseño, implementación e integración de soluciones tecnológicas.',
    ],
  },
  {
    title: 'Desarrollo de software',
    image: 'https://asytec.com/_next/static/media/desarrollo3.93f477fa.jpg',
    items: [
      'Diseño de sitios institucionales.',
      'Construcción de aplicaciones a medida, web y mobile.',
      'Integración de aplicaciones con sistemas de gestión.',
      'Programación en múltiples plataformas: AS/400 (RPG, ILE RPG, Cobol), DB2, SQL Server, .NET, Java, PHP, C#, JavaScript, HTML/CSS, ABAP4.',
    ],
  },
  {
    title: 'Administración de plataformas',
    image: 'https://asytec.com/_next/static/media/soporte.86983cf4.jpg',
    items: [
      'Administración de redes y servidores (AS/400, Windows, Linux).',
      'Monitoreo de redes y mantenimiento preventivo y correctivo.',
      'Servicio técnico presencial y remoto.',
      'Instalación, configuración y mantenimiento de PCs, software de oficina y conexión a Internet.',
    ],
  },
  {
    title: 'Seguridad de la información',
    image: 'https://asytec.com/_next/static/media/seguridad.cc1842ae.jpg',
    items: [
      'Asistencia en la operación e implementación de seguridad perimetral en redes.',
      'Control de cumplimiento de normativas SOX, PCI.',
      'Detección de vulnerabilidades, Test de penetración.',
      'Análisis auditoría seguridad informática: automatización de controles, compliance, identificación y reporte de desvíos.',
    ],
  },
  {
    title: 'Gestión de proyectos y presupuestos de TI',
    image: 'https://asytec.com/_next/static/media/gestion.04a56933.jpg',
    items: [
      'Enfoque integral para la planificación, administración y control de proyectos tecnológicos.',
      'Gestión de portafolios y proyectos de TI.',
      'Seguimiento del cumplimiento presupuestario y optimización de costos.',
      'Control total sobre inversiones tecnológicas para maximizar la rentabilidad.',
    ],
  },
  {
    title: 'Selección de talento',
    image: 'https://asytec.com/_next/static/media/RRHH.bdec2acf.jpg',
    items: [
      'Amplia experiencia en búsquedas de personal con entendimiento claro del perfil solicitado.',
      'Proceso con bases de datos y redes de contactos propias y de terceros.',
      'Comunicación fluida con el cliente para ajustes en función de variables del mercado.',
      'Presentación de terna con informe comparativo detallado y acompañamiento hasta la incorporación.',
    ],
  },
]
</script>
