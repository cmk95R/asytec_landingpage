<template>
  <div>
    <TheNavbar />
    <main>
      <HeroCarousel />
      <ClientLogos />
      <AboutSection />
      <ServicesSection />
      <SocialFeed />
      <JobsSection />
      <ContactSection />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'ASYTEC Sistemas — Tecnología y Consultoría desde 1993',
  description: 'Expertos en tecnología y consultoría. Más de 30 años impulsando la innovación tecnológica con soluciones de vanguardia para empresas líderes.',
  ogTitle: 'ASYTEC Sistemas',
  ogDescription: 'Tecnología y consultoría para empresas líderes desde 1993.',
  ogImage: 'https://asytec.com/_next/static/media/carousel1.e3fa0991.png',
})
</script>
