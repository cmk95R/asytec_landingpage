import { hasInjectionContext, inject } from "vue";
import { useSeoMeta as useSeoMeta$1, useHead as useHead$1, headSymbol } from "C:/Users/cfvhc/OneDrive/Desktop/asytec-nuxt/asytec-nuxt/node_modules/.pnpm/@unhead+vue@2.1.15_vue@3.5.34_typescript@5.9.3_/node_modules/@unhead/vue/dist/index.mjs";
import { t as tryUseNuxtApp } from "../server.mjs";
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || tryUseNuxtApp();
  return nuxt?.ssrContext?.head || nuxt?.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  });
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}
function useSeoMeta(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useSeoMeta$1(input, { head, ...options });
  }
}
export {
  useSeoMeta as a,
  useHead as u
};
//# sourceMappingURL=v3-c5szb61a.js.map
