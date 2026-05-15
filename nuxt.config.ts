import { join } from 'node:path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image',
    (_options, nuxt) => {
      nuxt.hook('modules:done', () => {
        const postcssOptions =
          nuxt.options.postcss ??
          (nuxt.options.build as { postcss?: { postcssOptions?: { plugins?: Record<string, unknown> } } })
            ?.postcss?.postcssOptions ??
          (nuxt.options.build as { postcss?: { plugins?: Record<string, unknown> } })?.postcss
        const plugins = postcssOptions?.plugins
        const tailwindPlugin = plugins?.tailwindcss
        if (
          typeof tailwindPlugin === 'string' &&
          tailwindPlugin.includes('.nuxt/tailwind/postcss.mjs')
        ) {
          plugins!.tailwindcss = join(nuxt.options.rootDir, 'tailwind.config.js')
        }
      })
    },
  ],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  app: {
    head: {
      title: 'ASYTEC Sistemas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Expertos en tecnología y consultoría, liderando el camino desde 1993. Más de 30 años impulsando la innovación tecnológica.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap' }
      ]
    }
  }
})
