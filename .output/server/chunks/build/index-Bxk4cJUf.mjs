import { ref, mergeProps, computed, watch, reactive, unref, getCurrentScope, onScopeDispose, getCurrentInstance, onMounted, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { u as useSeoMeta } from './v3-c5szb61a.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$9 = {
  __name: "TheNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    const scrolled = ref(false);
    const mobileOpen = ref(false);
    const navItems = [
      { id: "home", label: "Home" },
      { id: "about", label: "Qui\xE9nes Somos" },
      { id: "services", label: "Servicios" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: [
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled.value ? "bg-white shadow-md py-3" : "bg-transparent py-5"
        ]
      }, _attrs))} data-v-8ba305a0><div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between" data-v-8ba305a0><a href="#home" data-v-8ba305a0><img src="https://asytec.com/_next/static/media/logotipo-azul.ad341051.png" alt="ASYTEC Sistemas" class="${ssrRenderClass(["h-10 transition-all duration-300", !scrolled.value && "brightness-0 invert"])}" data-v-8ba305a0></a><nav class="hidden md:flex items-center gap-8" data-v-8ba305a0><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(`<a${ssrRenderAttr("href", `#${item.id}`)} class="${ssrRenderClass([
          "font-heading font-semibold text-sm tracking-wider uppercase transition-colors duration-200",
          scrolled.value ? "text-gray-700 hover:text-primary-600" : "text-white hover:text-blue-200"
        ])}" data-v-8ba305a0>${ssrInterpolate(item.label)}</a>`);
      });
      _push(`<!--]--><a href="#contact" class="${ssrRenderClass([
        "px-6 py-2 font-heading font-semibold text-sm tracking-wider uppercase transition-all duration-300 rounded-sm",
        scrolled.value ? "bg-primary-600 text-white hover:bg-primary-700" : "border-2 border-white text-white hover:bg-white hover:text-primary-700"
      ])}" data-v-8ba305a0> CONTACTO </a></nav><button class="${ssrRenderClass(["md:hidden p-2", scrolled.value ? "text-gray-700" : "text-white"])}" aria-label="Men\xFA" data-v-8ba305a0>`);
      if (!mobileOpen.value) {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8ba305a0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-8ba305a0></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8ba305a0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-8ba305a0></path></svg>`);
      }
      _push(`</button></div>`);
      if (mobileOpen.value) {
        _push(`<div class="md:hidden bg-white shadow-xl" data-v-8ba305a0><nav class="flex flex-col px-6 py-4 gap-4" data-v-8ba305a0><!--[-->`);
        ssrRenderList(navItems, (item) => {
          _push(`<a${ssrRenderAttr("href", `#${item.id}`)} class="font-heading font-semibold text-sm tracking-wider uppercase text-gray-700 hover:text-primary-600 py-2 border-b border-gray-100" data-v-8ba305a0>${ssrInterpolate(item.label)}</a>`);
        });
        _push(`<!--]--><a href="#contact" class="btn-primary mt-2 justify-center" data-v-8ba305a0> CONTACTO </a></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/TheNavbar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-8ba305a0"]]);
const _sfc_main$8 = {
  __name: "HeroCarousel",
  __ssrInlineRender: true,
  setup(__props) {
    const activeIndex = ref(0);
    const slides = [
      {
        image: "https://asytec.com/_next/static/media/carousel1.e3fa0991.png",
        title: "Impulsamos el futuro de tu empresa con tecnolog\xEDa innovadora",
        subtitle: "Soluciones que transforman y llevan tu negocio al siguiente nivel."
      },
      {
        image: "https://asytec.com/_next/static/media/carrousellhero.1e6771ad.png",
        title: "Especialistas en tecnolog\xEDa y consultor\xEDa desde 1993",
        subtitle: "Liderando la innovaci\xF3n tecnol\xF3gica con m\xE1s de 30 a\xF1os de experiencia."
      },
      {
        image: "https://asytec.com/_next/static/media/carrousellhero3.8f7bcea9.png",
        title: "Llevamos soluciones tecnol\xF3gicas a empresas l\xEDderes",
        subtitle: "Descubr\xED c\xF3mo podemos ayudarte a transformar tu empresa."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "home",
        class: "relative h-screen min-h-[600px] overflow-hidden"
      }, _attrs))}><div class="swiper hero-swiper h-full"><div class="swiper-wrapper"><!--[-->`);
      ssrRenderList(slides, (slide, i) => {
        _push(`<div class="swiper-slide relative"><div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[8000ms] ease-out" style="${ssrRenderStyle(`background-image: url('${slide.image}')`)}"></div><div class="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/70 to-primary-700/40"></div><div class="relative z-10 h-full flex items-center"><div class="max-w-7xl mx-auto px-4 sm:px-8 w-full"><div class="max-w-2xl"><div class="${ssrRenderClass([{ "animate-fade-in": activeIndex.value === i }, "inline-block w-16 h-1 bg-blue-400 mb-6 opacity-0"])}" style="${ssrRenderStyle({ "animation-delay": "0.1s", "animation-fill-mode": "forwards" })}"></div><h1 class="${ssrRenderClass([{ "animate-fade-up": activeIndex.value === i }, "font-heading font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 opacity-0"])}" style="${ssrRenderStyle({ "animation-delay": "0.2s", "animation-fill-mode": "forwards" })}">${ssrInterpolate(slide.title)}</h1><p class="${ssrRenderClass([{ "animate-fade-up": activeIndex.value === i }, "text-blue-100 text-lg mb-8 opacity-0"])}" style="${ssrRenderStyle({ "animation-delay": "0.4s", "animation-fill-mode": "forwards" })}">${ssrInterpolate(slide.subtitle)}</p><div class="${ssrRenderClass([{ "animate-fade-up": activeIndex.value === i }, "opacity-0"])}" style="${ssrRenderStyle({ "animation-delay": "0.6s", "animation-fill-mode": "forwards" })}"><a href="/Brochure.pdf" target="_blank" class="btn-outline"> VER BROCHURE <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg></a></div></div></div></div></div>`);
      });
      _push(`<!--]--></div><div class="swiper-pagination !bottom-8"></div><div class="swiper-button-prev !text-white !w-12 !h-12 !bg-white/20 !rounded-full backdrop-blur-sm hover:!bg-white/40 transition-all"></div><div class="swiper-button-next !text-white !w-12 !h-12 !bg-white/20 !rounded-full backdrop-blur-sm hover:!bg-white/40 transition-all"></div></div><div class="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 opacity-70"><span class="text-white text-xs font-heading tracking-widest uppercase rotate-90 origin-center translate-x-6">Scroll</span><div class="w-px h-12 bg-white/50 animate-pulse"></div></div></section>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/HeroCarousel.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const notNullish = (val) => val != null;
const noop = () => {
};
const defaultWindow = void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useMounted() {
  const isMounted = ref(false);
  const instance = getCurrentInstance();
  if (instance) {
    onMounted(() => {
      isMounted.value = true;
    }, instance);
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useIntersectionObserver(target, callback, options = {}) {
  const {
    root,
    rootMargin = "0px",
    threshold = 0,
    window: window2 = defaultWindow,
    immediate = true
  } = options;
  const isSupported = useSupported(() => window2 && "IntersectionObserver" in window2);
  const targets = computed(() => {
    const _target = toValue(target);
    return (Array.isArray(_target) ? _target : [_target]).map(unrefElement).filter(notNullish);
  });
  let cleanup = noop;
  const isActive = ref(immediate);
  const stopWatch = isSupported.value ? watch(
    () => [targets.value, unrefElement(root), isActive.value],
    ([targets2, root2]) => {
      cleanup();
      if (!isActive.value)
        return;
      if (!targets2.length)
        return;
      const observer = new IntersectionObserver(
        callback,
        {
          root: unrefElement(root2),
          rootMargin,
          threshold
        }
      );
      targets2.forEach((el) => el && observer.observe(el));
      cleanup = () => {
        observer.disconnect();
        cleanup = noop;
      };
    },
    { immediate, flush: "post" }
  ) : noop;
  const stop = () => {
    cleanup();
    stopWatch();
    isActive.value = false;
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    isActive,
    pause() {
      cleanup();
      isActive.value = false;
    },
    resume() {
      isActive.value = true;
    },
    stop
  };
}
const _sfc_main$7 = {
  __name: "ClientLogos",
  __ssrInlineRender: true,
  setup(__props) {
    const titleRef = ref(null);
    const { stop } = useIntersectionObserver(titleRef, ([{ isIntersecting }]) => {
      var _a;
      if (isIntersecting) {
        (_a = titleRef.value) == null ? void 0 : _a.classList.add("visible");
        stop();
      }
    });
    const logos = [
      { src: "https://asytec.com/_next/static/media/austral.3fbdfd80.png", alt: "Austral" },
      { src: "https://asytec.com/_next/static/media/toyota2.9b6e8e31.png", alt: "Toyota" },
      { src: "https://asytec.com/_next/static/media/walmart2.e9e9227c.png", alt: "Walmart" },
      { src: "https://asytec.com/_next/static/media/telecom-logo-2.b42f343a.png", alt: "Telecom" },
      { src: "https://asytec.com/_next/static/media/petrobras2.804d7606.png", alt: "Petrobras" },
      { src: "https://asytec.com/_next/static/media/modo.0206bd41.png", alt: "Modo" },
      { src: "https://asytec.com/_next/static/media/edenor.d3c25ad1.png", alt: "Edenor" },
      { src: "https://asytec.com/_next/static/media/pecom.5c92efa0.png", alt: "Pecom" },
      { src: "https://asytec.com/_next/static/media/pluspetrol-logo-85781359A8-seeklogo.com.49ed8199.png", alt: "Pluspetrol" },
      { src: "https://asytec.com/_next/static/media/sadesa.8c8fc730.png", alt: "Sadesa" },
      { src: "https://asytec.com/_next/static/media/lesaffre.fdd4a5ac.png", alt: "Lesaffre" },
      { src: "https://asytec.com/_next/static/media/nutrien.915aac01.png", alt: "Nutrien" },
      { src: "https://asytec.com/_next/static/media/cgc.909c5281.png", alt: "CGC" },
      { src: "https://asytec.com/_next/static/media/metropol.svg.291bc4c5.png", alt: "Metropol" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-14 bg-gray-50 overflow-hidden border-y border-gray-100" }, _attrs))} data-v-2c0719af><div class="max-w-7xl mx-auto px-4 mb-8 text-center reveal" data-v-2c0719af><p class="text-sm font-heading font-semibold tracking-widest uppercase text-primary-500 mb-1" data-v-2c0719af>Conf\xEDan en nosotros</p><h2 class="text-2xl font-heading font-bold text-gray-700" data-v-2c0719af>Empresas l\xEDderes de la Argentina</h2></div><div class="relative" data-v-2c0719af><div class="flex gap-12 logos-track" data-v-2c0719af><!--[-->`);
      ssrRenderList([...logos, ...logos], (logo) => {
        _push(`<div class="flex-shrink-0 flex items-center justify-center" style="${ssrRenderStyle({ "width": "140px", "height": "60px" })}" data-v-2c0719af><img${ssrRenderAttr("src", logo.src)}${ssrRenderAttr("alt", logo.alt)} class="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100" loading="lazy" data-v-2c0719af></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/ClientLogos.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-2c0719af"]]);
const _sfc_main$6 = {
  __name: "MetricCounter",
  __ssrInlineRender: true,
  props: {
    value: { type: Number, required: true },
    label: { type: String, required: true },
    icon: { type: String, required: true },
    delay: { type: Number, default: 0 }
  },
  setup(__props) {
    const props = __props;
    const el = ref(null);
    const displayValue = ref(0);
    let started = false;
    const animateCount = () => {
      var _a;
      if (started) return;
      started = true;
      (_a = el.value) == null ? void 0 : _a.classList.add("visible");
      const duration = 2e3;
      const start = performance.now();
      const update = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        displayValue.value = Math.round(eased * props.value);
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    };
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        animateCount();
        stop();
      }
    }, { threshold: 0.5 });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "el",
        ref: el,
        class: "flex flex-col items-center text-center reveal",
        style: `transition-delay: ${__props.delay}ms`
      }, _attrs))}><img${ssrRenderAttr("src", __props.icon)}${ssrRenderAttr("alt", __props.label)} class="w-14 h-14 mb-3 object-contain"><div class="metric-number">${ssrInterpolate(displayValue.value)}+</div><div class="text-gray-500 font-body font-medium mt-1">${ssrInterpolate(__props.label)}</div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/MetricCounter.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "AboutSection",
  __ssrInlineRender: true,
  setup(__props) {
    const headerRef = ref(null);
    useIntersectionObserver(headerRef, ([{ isIntersecting }]) => {
      var _a;
      if (isIntersecting) (_a = headerRef.value) == null ? void 0 : _a.classList.add("visible");
    }, { threshold: 0.2 });
    const metrics = [
      {
        value: 500,
        label: "Proyectos",
        icon: "https://asytec.com/_next/static/media/1.5128f91e.png"
      },
      {
        value: 150,
        label: "Profesionales",
        icon: "https://asytec.com/_next/static/media/2.58c30918.png"
      },
      {
        value: 200,
        label: "Clientes",
        icon: "https://asytec.com/_next/static/media/12.ef88365d.png"
      },
      {
        value: 5,
        label: "Pa\xEDses",
        icon: "https://asytec.com/_next/static/media/4.921542f6.png"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MetricCounter = _sfc_main$6;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "about",
        class: "py-24 bg-white"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6"><div class="text-center mb-16 reveal"><p class="text-sm font-heading font-semibold tracking-widest uppercase text-primary-500 mb-2">Con\xF3cenos</p><h2 class="section-title">\xBFQui\xE9nes somos?</h2><div class="w-16 h-1 bg-primary-500 mx-auto mt-4 mb-6 rounded-full"></div><p class="section-subtitle max-w-2xl mx-auto"> Expertos en tecnolog\xEDa y consultor\xEDa, liderando el camino desde 1993. Impulsando la innovaci\xF3n tecnol\xF3gica desde hace m\xE1s de 30 a\xF1os. Transformamos procesos corporativos con soluciones tecnol\xF3gicas de vanguardia. </p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16"><!--[-->`);
      ssrRenderList(metrics, (metric, i) => {
        _push(ssrRenderComponent(_component_MetricCounter, {
          key: metric.label,
          value: metric.value,
          label: metric.label,
          icon: metric.icon,
          delay: i * 150
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="mt-20 flex items-center gap-4"><div class="flex-1 h-px bg-gray-200"></div><div class="w-2 h-2 rounded-full bg-primary-400"></div><div class="w-3 h-3 rounded-full bg-primary-500"></div><div class="w-2 h-2 rounded-full bg-primary-400"></div><div class="flex-1 h-px bg-gray-200"></div></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/AboutSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "ServicesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const headerRef = ref(null);
    ref([]);
    useIntersectionObserver(headerRef, ([{ isIntersecting }]) => {
      var _a;
      if (isIntersecting) (_a = headerRef.value) == null ? void 0 : _a.classList.add("visible");
    }, { threshold: 0.2 });
    const services = [
      {
        title: "Consultor\xEDa y procesos",
        image: "https://asytec.com/_next/static/media/consultoria3.277d5b8f.jpg",
        icon: "\u{1F4BC}",
        items: [
          "Software ERP: Implementaci\xF3n, customizaci\xF3n, soporte funcional/mesa de ayuda de JD Edwards, SAP, Oracle, IFS.",
          "Procesos de Negocio: relevamiento, an\xE1lisis, documentaci\xF3n, diagn\xF3stico, optimizaci\xF3n y redise\xF1o de procesos.",
          "Asesoramiento para la selecci\xF3n e implementaci\xF3n de software (CRM, ERP y otros).",
          "Dise\xF1o, implementaci\xF3n e integraci\xF3n de soluciones tecnol\xF3gicas."
        ]
      },
      {
        title: "Desarrollo de software",
        image: "https://asytec.com/_next/static/media/desarrollo3.93f477fa.jpg",
        icon: "\u{1F4BB}",
        items: [
          "Dise\xF1o de sitios institucionales.",
          "Construcci\xF3n de aplicaciones a medida, web y mobile.",
          "Integraci\xF3n de aplicaciones con sistemas de gesti\xF3n.",
          "Programaci\xF3n en m\xFAltiples plataformas: AS/400 (RPG, ILE RPG, Cobol), DB2, SQL Server, .NET, Java, PHP, C#, JavaScript, HTML/CSS, ABAP4."
        ]
      },
      {
        title: "Administraci\xF3n de plataformas",
        image: "https://asytec.com/_next/static/media/soporte.86983cf4.jpg",
        icon: "\u{1F5A5}\uFE0F",
        items: [
          "Administraci\xF3n de redes y servidores (AS/400, Windows, Linux).",
          "Monitoreo de redes y mantenimiento preventivo y correctivo.",
          "Servicio t\xE9cnico presencial y remoto.",
          "Instalaci\xF3n, configuraci\xF3n y mantenimiento de PCs, software de oficina y conexi\xF3n a Internet."
        ]
      },
      {
        title: "Seguridad de la informaci\xF3n",
        image: "https://asytec.com/_next/static/media/seguridad.cc1842ae.jpg",
        icon: "\u{1F512}",
        items: [
          "Asistencia en la operaci\xF3n e implementaci\xF3n de seguridad perimetral en redes.",
          "Control de cumplimiento de normativas SOX, PCI.",
          "Detecci\xF3n de vulnerabilidades, Test de penetraci\xF3n.",
          "An\xE1lisis auditor\xEDa seguridad inform\xE1tica: automatizaci\xF3n de controles, compliance, identificaci\xF3n y reporte de desv\xEDos."
        ]
      },
      {
        title: "Gesti\xF3n de proyectos y presupuestos de TI",
        image: "https://asytec.com/_next/static/media/gestion.04a56933.jpg",
        icon: "\u{1F4CA}",
        items: [
          "Enfoque integral para la planificaci\xF3n, administraci\xF3n y control de proyectos tecnol\xF3gicos.",
          "Gesti\xF3n de portafolios y proyectos de TI.",
          "Seguimiento del cumplimiento presupuestario y optimizaci\xF3n de costos.",
          "Control total sobre inversiones tecnol\xF3gicas para maximizar la rentabilidad."
        ]
      },
      {
        title: "Selecci\xF3n de talento",
        image: "https://asytec.com/_next/static/media/RRHH.bdec2acf.jpg",
        icon: "\u{1F465}",
        items: [
          "Amplia experiencia en b\xFAsquedas de personal con entendimiento claro del perfil solicitado.",
          "Proceso con bases de datos y redes de contactos propias y de terceros.",
          "Comunicaci\xF3n fluida con el cliente para ajustes en funci\xF3n de variables del mercado.",
          "Presentaci\xF3n de terna con informe comparativo detallado y acompa\xF1amiento hasta la incorporaci\xF3n."
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "services",
        class: "py-24 bg-gray-50"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6"><div class="text-center mb-16 reveal"><p class="text-sm font-heading font-semibold tracking-widest uppercase text-primary-500 mb-2">Lo que hacemos</p><h2 class="section-title">Nuestros Servicios</h2><div class="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full"></div></div><div class="flex flex-col gap-0"><!--[-->`);
      ssrRenderList(services, (service, i) => {
        var _a;
        _push(`<div class="${ssrRenderClass([
          "service-card grid grid-cols-1 md:grid-cols-2 overflow-hidden",
          i % 2 === 0 ? "reveal-left" : "reveal-right",
          i === 0 ? "rounded-t-2xl" : "",
          i === services.length - 1 ? "rounded-b-2xl" : ""
        ])}" style="${ssrRenderStyle(`transition-delay: ${i * 50}ms`)}"><div class="${ssrRenderClass(["relative overflow-hidden", i % 2 !== 0 ? "md:order-2" : ""])}" style="${ssrRenderStyle({ "min-height": "300px" })}"><img${ssrRenderAttr("src", service.image)}${ssrRenderAttr("alt", service.title)} class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"><div class="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-transparent"></div></div><div class="${ssrRenderClass([
          "bg-white p-10 flex flex-col justify-center",
          i % 2 !== 0 ? "md:order-1" : ""
        ])}"><div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4"><span class="text-primary-600 text-xl">${(_a = service.icon) != null ? _a : ""}</span></div><h3 class="font-heading font-bold text-2xl text-gray-800 mb-4">${ssrInterpolate(service.title)}</h3><ul class="space-y-2"><!--[-->`);
        ssrRenderList(service.items, (item) => {
          _push(`<li class="flex gap-3 text-gray-600 text-sm leading-relaxed"><span class="text-primary-500 mt-0.5 flex-shrink-0">\u2022</span><span>${ssrInterpolate(item)}</span></li>`);
        });
        _push(`<!--]--></ul></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/ServicesSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "JobsSection",
  __ssrInlineRender: true,
  setup(__props) {
    const el = ref(null);
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      var _a;
      if (isIntersecting) (_a = el.value) == null ? void 0 : _a.classList.add("visible");
    }, { threshold: 0.3 });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative py-24 overflow-hidden" }, _attrs))}><div class="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-600"></div><div class="absolute inset-0 opacity-10" style="${ssrRenderStyle({ "background-image": "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" })}"></div><div class="relative z-10 max-w-4xl mx-auto px-4 text-center reveal"><p class="text-blue-300 font-heading font-semibold tracking-widest uppercase text-sm mb-4">S\xFAmate a nuestro equipo</p><h2 class="font-heading font-extrabold text-4xl md:text-5xl text-white mb-6"> \xBFTe gustar\xEDa formar parte<br class="hidden md:block">de nuestro equipo? </h2><p class="text-blue-100 text-lg mb-10 max-w-xl mx-auto"> En ASYTEC siempre estamos en b\xFAsqueda de nuevos talentos. Encontr\xE1 la oportunidad ideal para vos. </p><a href="https://www.linkedin.com/company/asytec/jobs/" target="_blank" rel="noopener" class="inline-flex items-center gap-3 px-10 py-4 bg-white text-primary-700 font-heading font-bold text-sm tracking-wider uppercase rounded-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-blue-50"> VER B\xDASQUEDAS <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/JobsSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "ContactSection",
  __ssrInlineRender: true,
  setup(__props) {
    const headerRef = ref(null);
    const formRef = ref(null);
    const mapRef = ref(null);
    useIntersectionObserver(headerRef, ([{ isIntersecting }]) => {
      var _a;
      if (isIntersecting) (_a = headerRef.value) == null ? void 0 : _a.classList.add("visible");
    });
    useIntersectionObserver(formRef, ([{ isIntersecting }]) => {
      var _a;
      if (isIntersecting) (_a = formRef.value) == null ? void 0 : _a.classList.add("visible");
    }, { threshold: 0.1 });
    useIntersectionObserver(mapRef, ([{ isIntersecting }]) => {
      var _a;
      if (isIntersecting) (_a = mapRef.value) == null ? void 0 : _a.classList.add("visible");
    }, { threshold: 0.1 });
    const form = reactive({ name: "", phone: "", email: "", message: "" });
    const errors = reactive({ name: "", phone: "", email: "", message: "" });
    const sending = ref(false);
    const feedback = ref(null);
    const contactInfo = [
      { icon: "\u{1F4DE}", label: "Tel\xE9fono", value: "+54 11 5367-8000" },
      { icon: "\u{1F4CD}", label: "Direcci\xF3n", value: "Congreso 2171 Piso 8\xB0 Of. A, CABA" },
      { icon: "\u2709\uFE0F", label: "Email", value: "info@asytec.com" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "contact",
        class: "py-24 bg-white"
      }, _attrs))} data-v-bd482588><div class="max-w-7xl mx-auto px-4 sm:px-6" data-v-bd482588><div class="text-center mb-16 reveal" data-v-bd482588><p class="text-sm font-heading font-semibold tracking-widest uppercase text-primary-500 mb-2" data-v-bd482588>Hablemos</p><h2 class="section-title" data-v-bd482588>Contacto</h2><div class="w-16 h-1 bg-primary-500 mx-auto mt-4 mb-4 rounded-full" data-v-bd482588></div><p class="section-subtitle" data-v-bd482588>Contactanos para m\xE1s informaci\xF3n sobre nuestros servicios.</p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" data-v-bd482588><div class="reveal-left bg-gray-50 rounded-2xl p-8 shadow-sm" data-v-bd482588><form novalidate data-v-bd482588><div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5" data-v-bd482588><div data-v-bd482588><label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5" data-v-bd482588>Nombre *</label><input${ssrRenderAttr("value", form.name)} type="text" placeholder="Tu nombre completo" class="${ssrRenderClass(["w-full px-4 py-3 rounded-lg border bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent", errors.name ? "border-red-400" : "border-gray-200"])}" data-v-bd482588>`);
      if (errors.name) {
        _push(`<p class="text-red-500 text-xs mt-1" data-v-bd482588>${ssrInterpolate(errors.name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-bd482588><label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5" data-v-bd482588>Tel\xE9fono *</label><input${ssrRenderAttr("value", form.phone)} type="tel" placeholder="Tu tel\xE9fono" class="${ssrRenderClass(["w-full px-4 py-3 rounded-lg border bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent", errors.phone ? "border-red-400" : "border-gray-200"])}" data-v-bd482588>`);
      if (errors.phone) {
        _push(`<p class="text-red-500 text-xs mt-1" data-v-bd482588>${ssrInterpolate(errors.phone)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-5" data-v-bd482588><label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5" data-v-bd482588>Correo electr\xF3nico *</label><input${ssrRenderAttr("value", form.email)} type="email" placeholder="tu@email.com" class="${ssrRenderClass(["w-full px-4 py-3 rounded-lg border bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent", errors.email ? "border-red-400" : "border-gray-200"])}" data-v-bd482588>`);
      if (errors.email) {
        _push(`<p class="text-red-500 text-xs mt-1" data-v-bd482588>${ssrInterpolate(errors.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-6" data-v-bd482588><label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5" data-v-bd482588>Mensaje *</label><textarea rows="5" placeholder="\xBFEn qu\xE9 podemos ayudarte?" class="${ssrRenderClass(["w-full px-4 py-3 rounded-lg border bg-white text-gray-800 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none", errors.message ? "border-red-400" : "border-gray-200"])}" data-v-bd482588>${ssrInterpolate(form.message)}</textarea>`);
      if (errors.message) {
        _push(`<p class="text-red-500 text-xs mt-1" data-v-bd482588>${ssrInterpolate(errors.message)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(sending.value) ? " disabled" : ""} class="w-full btn-primary justify-center" data-v-bd482588>`);
      if (!sending.value) {
        _push(`<span data-v-bd482588>ENVIAR MENSAJE</span>`);
      } else {
        _push(`<span class="flex items-center gap-2" data-v-bd482588><svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" data-v-bd482588><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-bd482588></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" data-v-bd482588></path></svg> Enviando... </span>`);
      }
      _push(`</button>`);
      if (feedback.value) {
        _push(`<div class="${ssrRenderClass(["mt-4 px-4 py-3 rounded-lg text-sm text-center font-medium", feedback.value.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"])}" data-v-bd482588>${ssrInterpolate(feedback.value.message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div><div class="reveal-right flex flex-col gap-6" data-v-bd482588><div class="grid grid-cols-1 sm:grid-cols-3 gap-4" data-v-bd482588><!--[-->`);
      ssrRenderList(contactInfo, (info) => {
        _push(`<div class="bg-primary-50 rounded-xl p-4 text-center" data-v-bd482588><div class="text-2xl mb-2" data-v-bd482588>${ssrInterpolate(info.icon)}</div><p class="text-xs font-heading font-bold uppercase tracking-wider text-primary-600 mb-1" data-v-bd482588>${ssrInterpolate(info.label)}</p><p class="text-sm text-gray-600" data-v-bd482588>${ssrInterpolate(info.value)}</p></div>`);
      });
      _push(`<!--]--></div><div class="rounded-2xl overflow-hidden shadow-sm border border-gray-100" style="${ssrRenderStyle({ "height": "360px" })}" data-v-bd482588><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6571.959824930099!2d-58.46502431135536!3d-34.55406398517658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb4299e1fb7db%3A0xa763d94ef8bf1de8!2sASYTEC%20Sistemas!5e0!3m2!1ses-419!2sus!4v1738857771284!5m2!1ses-419!2sus" width="100%" height="100%" style="${ssrRenderStyle({ "border": "0" })}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ubicaci\xF3n ASYTEC Sistemas" data-v-bd482588></iframe></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/ContactSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-bd482588"]]);
const _sfc_main$1 = {
  __name: "TheFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const navItems = [
      { id: "home", label: "Home" },
      { id: "about", label: "Qui\xE9nes Somos" },
      { id: "services", label: "Servicios" },
      { id: "contact", label: "Contacto" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-900 text-white" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 py-12"><div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10"><div><img src="https://asytec.com/_next/static/media/logotipo-azul.ad341051.png" alt="ASYTEC" class="h-10 mb-4 brightness-0 invert"><p class="text-gray-400 text-sm leading-relaxed"> Expertos en tecnolog\xEDa y consultor\xEDa, liderando el camino desde 1993. Transformamos procesos corporativos con soluciones tecnol\xF3gicas de vanguardia. </p></div><div><h4 class="font-heading font-bold text-sm tracking-widest uppercase mb-4 text-gray-300">Navegaci\xF3n</h4><nav class="flex flex-col gap-2"><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(`<a${ssrRenderAttr("href", `#${item.id}`)} class="text-gray-400 hover:text-white text-sm transition-colors">${ssrInterpolate(item.label)}</a>`);
      });
      _push(`<!--]--></nav></div><div><h4 class="font-heading font-bold text-sm tracking-widest uppercase mb-4 text-gray-300">Contacto</h4><ul class="space-y-2 text-sm text-gray-400"><li>\u{1F4DE} +54 11 5367-8000</li><li>\u{1F4CD} Congreso 2171 Piso 8\xB0 Of. A<br>(C1428BVE) C.A.B.A. - Argentina</li><li><a href="mailto:info@asytec.com" class="hover:text-white transition-colors"> \u2709\uFE0F info@asytec.com </a></li></ul><div class="flex gap-4 mt-5"><a href="https://www.instagram.com/asytecsistemas/" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-600 transition-colors"><svg class="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg></a><a href="https://www.linkedin.com/company/asytec/" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-600 transition-colors"><svg class="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a></div></div></div><div class="border-t border-gray-800 pt-6 text-center text-gray-500 text-xs"> ASYTEC Sistemas S.R.L. \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Todos los derechos reservados. </div></div></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/TheFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "ASYTEC Sistemas \u2014 Tecnolog\xEDa y Consultor\xEDa desde 1993",
      description: "Expertos en tecnolog\xEDa y consultor\xEDa. M\xE1s de 30 a\xF1os impulsando la innovaci\xF3n tecnol\xF3gica con soluciones de vanguardia para empresas l\xEDderes.",
      ogTitle: "ASYTEC Sistemas",
      ogDescription: "Tecnolog\xEDa y consultor\xEDa para empresas l\xEDderes desde 1993.",
      ogImage: "https://asytec.com/_next/static/media/carousel1.e3fa0991.png"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TheNavbar = __nuxt_component_0;
      const _component_HeroCarousel = _sfc_main$8;
      const _component_ClientLogos = __nuxt_component_2;
      const _component_AboutSection = _sfc_main$5;
      const _component_ServicesSection = _sfc_main$4;
      const _component_JobsSection = _sfc_main$3;
      const _component_ContactSection = __nuxt_component_6;
      const _component_TheFooter = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_TheNavbar, null, null, _parent));
      _push(`<main>`);
      _push(ssrRenderComponent(_component_HeroCarousel, null, null, _parent));
      _push(ssrRenderComponent(_component_ClientLogos, null, null, _parent));
      _push(ssrRenderComponent(_component_AboutSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ServicesSection, null, null, _parent));
      _push(ssrRenderComponent(_component_JobsSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ContactSection, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_TheFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bxk4cJUf.mjs.map
