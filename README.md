# ASYTEC Sistemas — Nuxt 3

Rediseño del sitio web de ASYTEC Sistemas usando **Vue 3 + Nuxt 3**.

## Stack

- **Nuxt 3** — SSR/SSG framework
- **Vue 3** — Composition API
- **Tailwind CSS** — utilidades CSS
- **Swiper** — carousel del hero
- **VueUse** — composables utilitarios (IntersectionObserver, etc.)

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo (http://localhost:3000)
npm run dev

# 3. Build para producción
npm run build

# 4. Generación estática
npm run generate
```

## Estructura

```
asytec-nuxt/
├── pages/
│   └── index.vue              ← Página principal (one-page)
├── components/
│   ├── layout/
│   │   ├── TheNavbar.vue      ← Navbar sticky con scroll effect
│   │   └── TheFooter.vue      ← Footer completo
│   ├── sections/
│   │   ├── HeroCarousel.vue   ← Carousel hero con Swiper
│   │   ├── ClientLogos.vue    ← Logos con infinite scroll
│   │   ├── AboutSection.vue   ← Quiénes somos + métricas
│   │   ├── ServicesSection.vue← 6 servicios alternados
│   │   ├── JobsSection.vue    ← CTA búsquedas laborales
│   │   └── ContactSection.vue ← Formulario + mapa
│   └── ui/
│       └── MetricCounter.vue  ← Contador animado
├── assets/css/main.css        ← Estilos globales + Tailwind
├── server/api/
│   └── contact.post.ts        ← API Route para formulario
├── nuxt.config.ts
├── tailwind.config.js
└── package.json
```

## Configurar el formulario de contacto

Editar `server/api/contact.post.ts` e integrar un servicio de email:

### Con Resend (recomendado)
```bash
npm install resend
```
```ts
// .env
RESEND_API_KEY=re_xxxx
```

### Con Nodemailer
```bash
npm install nodemailer
```

## Deploy

El proyecto está listo para deployar en:
- **Vercel**: `npm run build` + deploy automático
- **Netlify**: `npm run generate` para sitio estático
- **Node server**: `npm run build && node .output/server/index.mjs`
