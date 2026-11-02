import { shallowReactive, reactive, effectScope, getCurrentScope, hasInjectionContext, getCurrentInstance, inject, toRef, shallowRef, isReadonly, isRef, isShallow, isReactive, toRaw, defineComponent, provide, h, ref, Suspense, Fragment, computed, watch, mergeProps, unref, useSSRContext, nextTick, defineAsyncComponent, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, createApp } from "vue";
import { $fetch } from "C:/Users/CMK-DEV/Desktop/2025 - DEV/asytec_landingpage-master/asytec_landingpage-master/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import { baseURL, publicAssetsURL } from "#internal/nuxt/paths";
import { createHooks } from "C:/Users/CMK-DEV/Desktop/2025 - DEV/asytec_landingpage-master/asytec_landingpage-master/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import { getContext, executeAsync } from "C:/Users/CMK-DEV/Desktop/2025 - DEV/asytec_landingpage-master/asytec_landingpage-master/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import { sanitizeStatusCode, createError as createError$1, appendHeader } from "C:/Users/CMK-DEV/Desktop/2025 - DEV/asytec_landingpage-master/asytec_landingpage-master/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import { START_LOCATION, createMemoryHistory, createRouter, RouterView } from "vue-router";
import { defu } from "C:/Users/CMK-DEV/Desktop/2025 - DEV/asytec_landingpage-master/asytec_landingpage-master/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import { hasProtocol, joinURL, withQuery, parseURL, encodePath, decodePath, isScriptProtocol } from "C:/Users/CMK-DEV/Desktop/2025 - DEV/asytec_landingpage-master/asytec_landingpage-master/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderTeleport, ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode } from "vue/server-renderer";
import "@emailjs/browser";
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
const crawlLinks = true;
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.21.5";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
import.meta.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
function freezeHead(head) {
  const realPush = head.push;
  head.push = () => ({ dispose: () => {
  }, patch: () => {
  }, _poll: () => {
  } });
  return () => {
    head.push = realPush;
  };
}
const unhead_FVWQz8Z4_fjG_Tj4tIbPfDLu9Omwtm5O5F6liDHX3K0 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    if (nuxtApp.ssrContext.islandContext) {
      const unfreeze = freezeHead(head);
      nuxtApp.hooks.hookOnce("app:created", unfreeze);
    }
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const matcher = (m, p) => {
  return [];
};
const _routeRulesMatcher = (path) => defu({}, ...matcher().map((r) => r.data).reverse());
const routeRulesMatcher = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher(path);
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const _routes = [
  {
    name: "index",
    path: "/",
    component: () => import("./_nuxt/index-D5SMwYAq.js")
  },
  {
    name: "diagnostico",
    path: "/diagnostico",
    component: () => import("./_nuxt/diagnostico-Z6T_Xugh.js")
  }
];
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    if (from === START_LOCATION) {
      return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
    }
    return new Promise((resolve) => {
      const doScroll = () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      };
      nuxtApp.hooks.hookOnce("page:loading:end", () => {
        const transitionPromise = nuxtApp["~transitionPromise"];
        if (transitionPromise) {
          transitionPromise.then(doScroll);
        } else {
          doScroll();
        }
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const hashMode = false;
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    status: result && (result.status || result.statusCode) || 404,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes2 = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes: routes2
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      const lastTo = to.matched.at(-1)?.components?.default;
      const lastFrom = from.matched.at(-1)?.components?.default;
      if (lastTo === lastFrom) {
        syncCurrentRoute();
        return;
      }
      if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const error = /* @__PURE__ */ useError();
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    const hasDeferredRoute = false;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        const routeRules = getRouteRules({ path: to.path });
        if (routeRules.appMiddleware) {
          for (const key in routeRules.appMiddleware) {
            if (routeRules.appMiddleware[key]) {
              middlewareEntries.add(key);
            } else {
              middlewareEntries.delete(key);
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0 && !error.value) {
        return nuxtApp.runWithContext(() => showError(createError({
          status: 404,
          fatal: false,
          statusText: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        if (hasDeferredRoute) ;
        else {
          await router.replace({
            ...resolvedInitialRoute,
            force: true
          });
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_oORbE2KmX2h_MEvhTzTCN_sOYDaRRH9DSMwV10AUN2k = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function prerenderRoutes(path) {
  if (!import.meta.prerender) {
    return;
  }
  const paths = toArray$1(path);
  appendHeader(useRequestEvent(), "x-nitro-prerender", paths.map((p) => encodeURIComponent(p)).join(", "));
}
let routes;
const prerender_server_Q5fQt2xgHSP48WoyhdkDAkXhMuBuSQ1b8dxJyQXtYz8 = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  if (!import.meta.prerender || hashMode) {
    return;
  }
  if (routes && !routes.length) {
    return;
  }
  routes ||= Array.from(processRoutes(([__temp, __restore] = executeAsync(() => routerOptions.routes?.(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes));
  const batch = routes.splice(0, 10);
  prerenderRoutes(batch);
});
const OPTIONAL_PARAM_RE = /^\/?:.*(?:\?|\(\.\*\)\*)$/;
function shouldPrerender(path) {
  return crawlLinks;
}
function processRoutes(routes2, currentPath = "/", routesToPrerender = /* @__PURE__ */ new Set()) {
  for (const route of routes2) {
    if (OPTIONAL_PARAM_RE.test(route.path) && !route.children?.length && shouldPrerender()) {
      routesToPrerender.add(currentPath);
    }
    if (route.path.includes(":")) {
      continue;
    }
    const fullPath = joinURL(currentPath, route.path);
    {
      routesToPrerender.add(fullPath);
    }
    if (route.children) {
      processRoutes(route.children, fullPath, routesToPrerender);
    }
  }
  return routesToPrerender;
}
const plugins = [
  unhead_FVWQz8Z4_fjG_Tj4tIbPfDLu9Omwtm5O5F6liDHX3K0,
  plugin,
  revive_payload_server_oORbE2KmX2h_MEvhTzTCN_sOYDaRRH9DSMwV10AUN2k,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  prerender_server_Q5fQt2xgHSP48WoyhdkDAkXhMuBuSQ1b8dxJyQXtYz8
];
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const _imports_0 = publicAssetsURL("/images/logotipo-azul.png");
const _imports_1 = publicAssetsURL("/images/ISOTIPO AZUL.png");
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const iconEjecucion = '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>';
const iconConfig = '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>';
const iconInteligencia = '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>';
const iconGobernanza = '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>';
const ringRadius = 52;
const _sfc_main$4 = {
  __name: "TestSection",
  __ssrInlineRender: true,
  props: {
    embedded: { type: Boolean, default: false }
  },
  setup(__props) {
    (/* @__PURE__ */ useRuntimeConfig()).public.emailjs;
    const step = ref("intro");
    const progress = ref(0);
    const answers = reactive({});
    const user = reactive({ name: "", email: "", company: "", role: "", area: "", size: "", consent: false });
    const sending = ref(false);
    const emailStatus = ref(null);
    ref("q-left");
    const hasSaved = ref(false);
    ref(false);
    const openArea = ref(null);
    ref(null);
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" });
    const areas = reactive([
      {
        id: "ejecucion",
        name: "Ejecución",
        icon: iconEjecucion,
        description: "¿La IA hace cosas en tu día a día?",
        questions: [
          { q: "¿La IA responde consultas a través de un canal oficial de tu empresa? (chatbot en la web, WhatsApp, asistente en el chat interno)", weight: 1 },
          { q: "¿Usan IA para crear o revisar documentos y contenido?", weight: 1 },
          { q: "¿La IA automatiza algún proceso recurrente de principio a fin?", weight: 1 }
        ]
      },
      {
        id: "configuracion",
        name: "Configuración",
        icon: iconConfig,
        description: "¿La IA está conectada a tu empresa?",
        questions: [
          { q: "¿La IA consulta una base de conocimiento propia de tu empresa?", weight: 1 },
          { q: "¿La IA está integrada con algún sistema que ya usan?", weight: 1 },
          { q: "¿Monitorean el uso de la IA con registros o métricas?", weight: 1 }
        ]
      },
      {
        id: "inteligencia",
        name: "Inteligencia",
        icon: iconInteligencia,
        description: "¿La IA te ayuda a decidir?",
        questions: [
          { q: "¿La IA analiza datos de tu empresa y genera insights para tomar decisiones?", weight: 1 },
          { q: "¿Usan IA para analizar información no estructurada? (encuestas, comentarios, reuniones)", weight: 1 },
          { q: "¿La IA propone acciones o recomendaciones concretas?", weight: 1 }
        ]
      },
      {
        id: "gobernanza",
        name: "Gobernanza",
        icon: iconGobernanza,
        description: "¿El uso de la IA está bajo control?",
        questions: [
          { q: "¿Existe una política formal de uso de IA en tu empresa?", weight: 1 },
          { q: "¿La solución de IA cumple requisitos de privacidad y seguridad? (protección de datos, control de accesos, auditoría)", weight: 1 },
          { q: "¿El equipo recibe formación y tiene un canal para reportar errores? (capacitación y lugar donde avisar si algo falla)", weight: 1 }
        ]
      }
    ]);
    const questions = computed(() => areas.flatMap((a) => a.questions.map((q) => ({ ...q, areaId: a.id }))));
    const currentQuestion = computed(() => questions.value[progress.value]);
    const currentArea = computed(() => areas.find((a) => a.id === currentQuestion.value.areaId));
    const indicatorIndex = computed(() => {
      const area = currentArea.value;
      const offset = areas.slice(0, areas.indexOf(area)).reduce((s, a) => s + a.questions.length, 0);
      return progress.value - offset + 1;
    });
    const totalScore = computed(() => Object.values(answers).filter(Boolean).length);
    const areaSegments = computed(() => {
      let offset = 0;
      return areas.map((area) => {
        const total = area.questions.length;
        let answered = 0;
        for (let i = 0; i < total; i++) {
          if (answers[offset + i] !== void 0) answered++;
        }
        const active = progress.value >= offset && progress.value < offset + total;
        const done = answered === total;
        offset += total;
        return { done, active };
      });
    });
    const ringCircumference = 2 * Math.PI * ringRadius;
    const ringDash = computed(() => {
      const pct = totalScore.value / questions.value.length;
      return `${(pct * ringCircumference).toFixed(2)} ${ringCircumference.toFixed(2)}`;
    });
    const levelLabel = (s) => {
      if (s === 0) return "No iniciada";
      if (s === 1) return "Inicial";
      if (s === 2) return "En desarrollo";
      return "Avanzada";
    };
    const levelBg = (s) => {
      if (s === 0) return "bg-red-400";
      if (s === 1) return "bg-amber-400";
      if (s === 2) return "bg-primary-400";
      return "bg-primary-600";
    };
    const levelDot = (s) => {
      if (s === 0) return "bg-red-400";
      if (s === 1) return "bg-amber-400";
      if (s === 2) return "bg-primary-400";
      return "bg-primary-600";
    };
    const globalLevel = computed(() => {
      const s = totalScore.value;
      if (s <= 3) return { label: "Punto de partida", profile: "Perfil inicial: la IA todavía no forma parte de la operación de forma establecida." };
      if (s <= 6) return { label: "Nivel inicial", profile: "Bases sentadas: hay iniciativas puntuales que todavía no se sistematizaron." };
      if (s <= 9) return { label: "En consolidación", profile: "Avanzando con orden: la IA ya está presente en varias dimensiones y se mide su impacto." };
      return { label: "Avanzado", profile: "Adopción madura: la IA está conectada a la operación y usada para decidir." };
    });
    const resumenEjecutivo = computed(() => {
      const s = totalScore.value;
      const empresa = user.company || "Tu empresa";
      if (s <= 3) return `${empresa} todavía no tiene la IA como parte de la operación. Es posible que algunas personas la usen por su cuenta, pero no hay un uso establecido, conectado a los sistemas ni con reglas claras. La buena noticia: estás en el punto donde las primeras decisiones tienen más impacto. Elegir bien un primer caso de uso y ponerle reglas mínimas desde el inicio evita la mayoría de los problemas que aparecen después.`;
      if (s <= 6) return `${empresa} dio pasos iniciales con IA. Hay casos puntuales que funcionan, pero todavía falta conectar la IA a los sistemas propios, medir su uso y formalizar las prácticas. Es un buen momento para ordenar lo que funciona, cerrar los grises de gobernanza y pasar de la experimentación a algo más estructural.`;
      if (s <= 9) return `${empresa} está consolidando su adopción de IA. La IA ya está conectada a la operación en varias áreas y se mide su impacto. Las oportunidades pendientes están en la profundidad del uso y en la formalización de prácticas. Es momento de profesionalizar lo que funciona y empezar a usarla para decidir, no solo para ejecutar.`;
      return `${empresa} tiene una adopción madura de IA. Está conectada a los sistemas, se mide, hay gobernanza y la usa para tomar decisiones. Las oportunidades restantes son de optimización: ampliar cobertura, mejorar la calidad de los insights y mantener la formación del equipo al día.`;
    });
    const oportunidades = computed(() => {
      const sorted = [...areas].sort((a, b) => a.score - b.score);
      return sorted.slice(0, 3).map((a) => {
        if (a.id === "ejecucion") return "Usar IA para crear y revisar contenido, responder consultas o automatizar un proceso de punta a punta. Es la puerta de entrada más simple y donde el ahorro de tiempo se ve primero. Empezar por un caso de uso concreto con entrada clara.";
        if (a.id === "configuracion") return "Conectar la IA al conocimiento propio de la empresa y a los sistemas que ya usan. Hoy la IA responde con generalidades; conectada a la documentación y procesos reales es donde realmente cambia la productividad.";
        if (a.id === "inteligencia") return "Usar IA para analizar datos y generar insights, no solo para producir. Pedirle que explique causas y patrones, que analice información no estructurada y que proponga acciones concretas para usar como insumo en reuniones de decisión.";
        if (a.id === "gobernanza") return "Definir una política formal de uso de IA, verificar privacidad y seguridad, y armar un canal de formación y reporte de errores. Sin reglas claras, cada persona decide por su cuenta qué comparte y con qué herramienta.";
        return `Avanzar en ${a.name.toLowerCase()}.`;
      });
    });
    const proximoPaso = computed(() => {
      const lowest = [...areas].sort((a, b) => a.score - b.score)[0];
      if (lowest.id === "ejecucion") return "Elegí un tipo de contenido que se produce seguido (propuestas, informes, comunicados) y definí un flujo: la IA hace el borrador, una persona revisa. O identificá un proceso repetitivo con entrada clara y automatizalo.";
      if (lowest.id === "configuracion") return "Reuní los documentos que más se consultan en un solo lugar, asigná un responsable de mantenerlos y conectá la IA a esa base. Después, elegí un sistema donde el equipo pasa más tiempo y explorá qué integración ya está disponible.";
      if (lowest.id === "inteligencia") return "Tomá un informe que el área produce todos los meses y pedile a la IA que explique causas y patrones, no solo que resuma. Compará con la lectura del equipo. Después, hacé que proponga acciones concretas para usar como insumo en la próxima reunión.";
      if (lowest.id === "gobernanza") return "Redactá una política de una página: qué herramientas están permitidas, qué datos no se pueden ingresar, quién aprueba nuevos usos. Comunicarla y designar a alguien responsable de revisarla y mantenerla al día.";
      return "Elegí un solo caso de uso de bajo riesgo y alto volumen, y hacelo bien antes de sumar otro.";
    });
    const areaOffset = (areaIndex) => areas.slice(0, areaIndex).reduce((s, a) => s + a.questions.length, 0);
    const isYes = (areaIndex, questionIndex) => answers[areaOffset(areaIndex) + questionIndex] === true;
    const persist = () => {
      return;
    };
    watch([progress, answers], persist, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "diagnostico",
        class: __props.embedded ? "relative py-2 bg-transparent" : "relative py-20 bg-gray-50"
      }, _attrs))} data-v-ccc08f1c><div class="relative max-w-4xl mx-auto px-4 sm:px-6" data-v-ccc08f1c>`);
      if (step.value === "intro") {
        _push(`<div class="text-center" data-v-ccc08f1c><div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 max-w-2xl mx-auto" data-v-ccc08f1c><img${ssrRenderAttr("src", _imports_0)} alt="ASYTEC Sistemas" class="h-9 w-auto mx-auto mb-8" data-v-ccc08f1c><p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-3" data-v-ccc08f1c> Evaluación de madurez en IA </p><h2 class="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4" data-v-ccc08f1c>Diagnóstico de adopción de IA</h2><p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8" data-v-ccc08f1c> 12 indicadores sobre lo que tu empresa ya hace hoy. Al finalizar se genera un informe con el puntaje por dimensión, los hallazgos priorizados y un próximo paso concreto. </p><div class="border-t border-gray-100 pt-8 mb-8 text-left" data-v-ccc08f1c><p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-4 text-center" data-v-ccc08f1c>Dimensiones evaluadas</p><ul class="space-y-3 text-sm text-gray-700" data-v-ccc08f1c><!--[-->`);
        ssrRenderList(areas, (area) => {
          _push(`<li class="flex items-center gap-3" data-v-ccc08f1c><span class="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0" data-v-ccc08f1c><span class="w-4 h-4" data-v-ccc08f1c>${area.icon ?? ""}</span></span><div data-v-ccc08f1c><strong class="text-gray-900" data-v-ccc08f1c>${ssrInterpolate(area.name)}</strong><span class="text-gray-500" data-v-ccc08f1c> — ${ssrInterpolate(area.description)}</span></div></li>`);
        });
        _push(`<!--]--></ul></div>`);
        if (hasSaved.value) {
          _push(`<div class="space-y-3" data-v-ccc08f1c><button class="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl" data-v-ccc08f1c> Continuar evaluación <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ccc08f1c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-v-ccc08f1c></path></svg></button><button class="w-full text-sm text-gray-500 hover:text-primary-700 transition-colors py-2" data-v-ccc08f1c> Empezar de nuevo </button><p class="text-xs text-gray-400" data-v-ccc08f1c>Tenés una evaluación sin terminar guardada en este dispositivo.</p></div>`);
        } else {
          _push(`<button class="inline-flex items-center gap-2 px-10 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl" data-v-ccc08f1c> Comenzar evaluación <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ccc08f1c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-v-ccc08f1c></path></svg></button>`);
        }
        _push(`<p class="text-xs text-gray-500 mt-6" data-v-ccc08f1c> Sin costo. Los datos de contacto se solicitan únicamente al final, para enviarte el informe. </p></div></div>`);
      } else if (step.value === "questions") {
        _push(`<div data-v-ccc08f1c><div class="mb-8" data-v-ccc08f1c><div class="flex items-center justify-between mb-3" data-v-ccc08f1c><p class="text-xs font-heading font-bold uppercase tracking-[0.18em] text-primary-700" data-v-ccc08f1c>${ssrInterpolate(currentArea.value.name)}</p><p class="text-xs text-gray-500" aria-live="polite" data-v-ccc08f1c> Indicador ${ssrInterpolate(indicatorIndex.value)} de ${ssrInterpolate(currentArea.value.questions.length)}</p></div><div class="grid grid-cols-4 gap-2" role="progressbar"${ssrRenderAttr("aria-valuenow", progress.value + 1)}${ssrRenderAttr("aria-valuemin", 1)}${ssrRenderAttr("aria-valuemax", questions.value.length)} aria-label="Avance de la evaluación" data-v-ccc08f1c><!--[-->`);
        ssrRenderList(areas, (area, ai) => {
          _push(`<div class="${ssrRenderClass(["h-1.5 rounded-full transition-colors duration-300", areaSegments.value[ai].done ? "bg-primary-600" : areaSegments.value[ai].active ? "bg-primary-400" : "bg-gray-200"])}" data-v-ccc08f1c></div>`);
        });
        _push(`<!--]--></div></div><div class="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-sm" data-v-ccc08f1c><h3 class="text-xl md:text-2xl font-heading font-semibold text-gray-900 text-center mb-8 leading-snug" data-v-ccc08f1c>${ssrInterpolate(currentQuestion.value.q)}</h3><div class="bg-gray-100 rounded-xl p-1.5 grid grid-cols-2 gap-1.5" role="group" aria-label="Respuesta" data-v-ccc08f1c><button type="button"${ssrRenderAttr("aria-pressed", answers[progress.value] === true)} class="${ssrRenderClass([
          "py-4 rounded-lg font-heading font-semibold text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          answers[progress.value] === true ? "bg-primary-600 text-white shadow-sm" : "bg-white text-gray-700 hover:text-primary-700 hover:bg-white/80"
        ])}" data-v-ccc08f1c> Sí </button><button type="button"${ssrRenderAttr("aria-pressed", answers[progress.value] === false)} class="${ssrRenderClass([
          "py-4 rounded-lg font-heading font-semibold text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          answers[progress.value] === false ? "bg-primary-700 text-white shadow-sm" : "bg-white text-gray-700 hover:text-primary-700 hover:bg-white/80"
        ])}" data-v-ccc08f1c> No </button></div></div><div class="flex items-center justify-between mt-6 max-w-2xl mx-auto" data-v-ccc08f1c>`);
        if (progress.value > 0) {
          _push(`<button class="text-sm text-gray-500 hover:text-primary-700 transition-colors" data-v-ccc08f1c> ← Anterior </button>`);
        } else {
          _push(`<span class="text-sm text-transparent select-none" data-v-ccc08f1c>← Anterior</span>`);
        }
        _push(`<span class="hidden sm:inline text-xs text-gray-400" data-v-ccc08f1c>Atajos: 1 = Sí · 2 = No · ← volver</span></div></div>`);
      } else if (step.value === "results") {
        _push(`<div class="report print-report" data-v-ccc08f1c><div class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden" data-v-ccc08f1c><div class="border-b border-gray-100 px-6 md:px-10 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-v-ccc08f1c><img${ssrRenderAttr("src", _imports_0)} alt="ASYTEC Sistemas" class="h-8 w-auto" data-v-ccc08f1c><div class="text-left sm:text-right" data-v-ccc08f1c><p class="text-xs font-heading font-bold uppercase tracking-[0.18em] text-primary-600" data-v-ccc08f1c>Informe de diagnóstico</p><p class="text-xs text-gray-500 mt-1" data-v-ccc08f1c>${ssrInterpolate(user.company || "Organización")} · ${ssrInterpolate(unref(today))}</p></div></div><div class="px-6 md:px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-gray-100" data-v-ccc08f1c><div class="flex justify-center" data-v-ccc08f1c><div class="relative w-40 h-40" data-v-ccc08f1c><svg viewBox="0 0 120 120" class="w-full h-full -rotate-90" data-v-ccc08f1c><circle cx="60" cy="60" r="52" fill="none" stroke="#e6f0fa" stroke-width="10" data-v-ccc08f1c></circle><circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" class="text-primary-600 transition-all duration-700"${ssrRenderAttr("stroke-dasharray", ringDash.value)} data-v-ccc08f1c></circle></svg><div class="absolute inset-0 flex flex-col items-center justify-center" data-v-ccc08f1c><span class="font-heading font-extrabold text-3xl text-gray-900" data-v-ccc08f1c>${ssrInterpolate(totalScore.value)}</span><span class="text-xs text-gray-500" data-v-ccc08f1c>de ${ssrInterpolate(questions.value.length)}</span></div></div></div><div class="md:col-span-2 text-center md:text-left" data-v-ccc08f1c><p class="text-xs font-heading font-bold uppercase tracking-[0.18em] text-gray-400 mb-2" data-v-ccc08f1c>Nivel de madurez</p><p class="font-heading font-bold text-2xl text-primary-700 mb-2" data-v-ccc08f1c>${ssrInterpolate(globalLevel.value.label)}</p><p class="text-gray-600 leading-relaxed" data-v-ccc08f1c>${ssrInterpolate(globalLevel.value.profile)}</p></div></div><div class="px-6 md:px-10 py-8 border-b border-gray-100" data-v-ccc08f1c><h3 class="font-heading font-bold text-base text-gray-900 mb-6" data-v-ccc08f1c>Resultado por dimensión</h3><div class="space-y-5" data-v-ccc08f1c><!--[-->`);
        ssrRenderList(areas, (area, ai) => {
          _push(`<div data-v-ccc08f1c><div class="flex items-center justify-between mb-2" data-v-ccc08f1c><div class="flex items-center gap-2.5" data-v-ccc08f1c><span class="${ssrRenderClass(["w-2 h-2 rounded-full", levelDot(area.score)])}" data-v-ccc08f1c></span><span class="font-medium text-gray-800 text-sm" data-v-ccc08f1c>${ssrInterpolate(area.name)}</span></div><span class="text-xs text-gray-500" data-v-ccc08f1c>${ssrInterpolate(area.score)}/${ssrInterpolate(area.questions.length)} · ${ssrInterpolate(levelLabel(area.score))}</span></div><div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden" data-v-ccc08f1c><div class="${ssrRenderClass([levelBg(area.score), "h-1.5 rounded-full transition-all duration-700"])}" style="${ssrRenderStyle(`width: ${area.score / area.questions.length * 100}%`)}" data-v-ccc08f1c></div></div></div>`);
        });
        _push(`<!--]--></div></div><div class="px-6 md:px-10 py-8 space-y-8" data-v-ccc08f1c><div data-v-ccc08f1c><h3 class="font-heading font-bold text-base text-gray-900 mb-3" data-v-ccc08f1c>Resumen ejecutivo</h3><p class="text-gray-700 leading-relaxed" data-v-ccc08f1c>${ssrInterpolate(resumenEjecutivo.value)}</p></div>`);
        if (oportunidades.value.length) {
          _push(`<div data-v-ccc08f1c><h3 class="font-heading font-bold text-base text-gray-900 mb-4" data-v-ccc08f1c>Hallazgos priorizados</h3><ul class="space-y-4" data-v-ccc08f1c><!--[-->`);
          ssrRenderList(oportunidades.value, (op, i) => {
            _push(`<li class="flex gap-4" data-v-ccc08f1c><span class="flex-shrink-0 w-7 h-7 rounded-full bg-primary-50 text-primary-700 text-xs font-bold flex items-center justify-center mt-0.5" data-v-ccc08f1c>${ssrInterpolate(i + 1)}</span><span class="text-gray-700 leading-relaxed text-sm md:text-base" data-v-ccc08f1c>${ssrInterpolate(op)}</span></li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-primary-50 border border-primary-100 rounded-xl p-6" data-v-ccc08f1c><p class="text-xs font-heading font-bold uppercase tracking-[0.18em] text-primary-700 mb-2" data-v-ccc08f1c>Próximo paso</p><p class="text-gray-800 leading-relaxed" data-v-ccc08f1c>${ssrInterpolate(proximoPaso.value)}</p></div></div><div class="px-6 md:px-10 pb-8" data-v-ccc08f1c><h3 class="font-heading font-bold text-base text-gray-900 mb-3" data-v-ccc08f1c>Detalle por dimensión</h3><div class="divide-y divide-gray-100 border-t border-gray-100" data-v-ccc08f1c><!--[-->`);
        ssrRenderList(areas, (area, ai) => {
          _push(`<div data-v-ccc08f1c><button class="w-full flex items-center justify-between gap-4 py-4 text-left"${ssrRenderAttr("aria-expanded", openArea.value === ai)} data-v-ccc08f1c><span class="flex items-center gap-2.5" data-v-ccc08f1c><span class="${ssrRenderClass(["w-2 h-2 rounded-full", levelDot(area.score)])}" data-v-ccc08f1c></span><span class="font-medium text-gray-800 text-sm" data-v-ccc08f1c>${ssrInterpolate(area.name)}</span></span><span class="flex items-center gap-3" data-v-ccc08f1c><span class="text-xs text-gray-500" data-v-ccc08f1c>${ssrInterpolate(area.score)}/${ssrInterpolate(area.questions.length)}</span><svg class="${ssrRenderClass(["w-4 h-4 text-gray-400 transition-transform duration-200", openArea.value === ai && "rotate-180"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ccc08f1c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ccc08f1c></path></svg></span></button>`);
          if (openArea.value === ai) {
            _push(`<div class="pb-4 pl-4.5 space-y-2" data-v-ccc08f1c><p class="text-xs text-gray-500 mb-2" data-v-ccc08f1c>${ssrInterpolate(area.description)}</p><ul class="space-y-2" data-v-ccc08f1c><!--[-->`);
            ssrRenderList(area.questions, (q, qi) => {
              _push(`<li class="flex items-start gap-2.5 text-sm" data-v-ccc08f1c><span class="${ssrRenderClass(["mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0", isYes(ai, qi) ? "bg-primary-100 text-primary-700" : "bg-red-50 text-red-500"])}" data-v-ccc08f1c>`);
              if (isYes(ai, qi)) {
                _push(`<svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" data-v-ccc08f1c><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-v-ccc08f1c></path></svg>`);
              } else {
                _push(`<svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" data-v-ccc08f1c><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-ccc08f1c></path></svg>`);
              }
              _push(`</span><span class="text-gray-600" data-v-ccc08f1c>${ssrInterpolate(q.q)}</span></li>`);
            });
            _push(`<!--]--></ul></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div><div class="border-t border-gray-100 px-6 md:px-10 py-5 flex items-center justify-between gap-4" data-v-ccc08f1c><p class="text-[11px] text-gray-400 leading-relaxed max-w-md" data-v-ccc08f1c> Informe generado a partir de ${ssrInterpolate(questions.value.length)} indicadores. Es un punto de partida, no una auditoría técnica. </p><img${ssrRenderAttr("src", _imports_1)} alt="ASYTEC" class="h-6 w-auto opacity-60" data-v-ccc08f1c></div></div><div class="no-print flex flex-col sm:flex-row gap-3 justify-center mt-8" data-v-ccc08f1c><button class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-lg" data-v-ccc08f1c> Descargar informe (PDF) <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ccc08f1c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M4 6h16M4 6a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2" data-v-ccc08f1c></path></svg></button><button class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-gray-200 text-gray-700 font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:border-primary-600 hover:text-primary-700" data-v-ccc08f1c> Recibir por mail <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ccc08f1c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-ccc08f1c></path></svg></button><button class="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-gray-500 text-sm transition-colors hover:text-primary-700" data-v-ccc08f1c> Borrar mis datos </button></div></div>`);
      } else if (step.value === "send") {
        _push(`<div data-v-ccc08f1c>`);
        if (emailStatus.value === "ok") {
          _push(`<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-xl mx-auto text-center" data-v-ccc08f1c><span class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 text-primary-600 mb-5" data-v-ccc08f1c><svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-ccc08f1c><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-v-ccc08f1c></path></svg></span><h3 class="font-heading font-bold text-xl text-gray-900 mb-2" data-v-ccc08f1c>Informe enviado</h3><p class="text-gray-600 text-sm leading-relaxed mb-6" data-v-ccc08f1c> Te enviamos el informe a <strong data-v-ccc08f1c>${ssrInterpolate(user.email)}</strong>. Revisá tu bandeja de entrada o la carpeta de spam. </p><button class="text-sm text-primary-700 hover:text-primary-800 font-medium" data-v-ccc08f1c> ← Volver al informe </button></div>`);
        } else {
          _push(`<div data-v-ccc08f1c><div class="text-center mb-10" data-v-ccc08f1c><p class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-primary-600 mb-3" data-v-ccc08f1c>Último paso</p><h2 class="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3" data-v-ccc08f1c>Recibir el informe completo</h2><p class="text-gray-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed" data-v-ccc08f1c> Enviamos el informe con el detalle por dimensión y el próximo paso recomendado. </p></div><form class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-xl mx-auto space-y-4" data-v-ccc08f1c><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-ccc08f1c><div data-v-ccc08f1c><label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5" data-v-ccc08f1c>Nombre *</label><input${ssrRenderAttr("value", user.name)} type="text" required placeholder="Tu nombre" class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent" data-v-ccc08f1c></div><div data-v-ccc08f1c><label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5" data-v-ccc08f1c>Email corporativo *</label><input${ssrRenderAttr("value", user.email)} type="email" required placeholder="tu@empresa.com" class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent" data-v-ccc08f1c></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-ccc08f1c><div data-v-ccc08f1c><label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5" data-v-ccc08f1c>Empresa *</label><input${ssrRenderAttr("value", user.company)} type="text" required placeholder="Nombre de tu empresa" class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent" data-v-ccc08f1c></div><div data-v-ccc08f1c><label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5" data-v-ccc08f1c>Cargo</label><input${ssrRenderAttr("value", user.role)} type="text" placeholder="Ej: Gerente de Operaciones" class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent" data-v-ccc08f1c></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-ccc08f1c><div data-v-ccc08f1c><label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5" data-v-ccc08f1c>Área evaluada</label><select class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent" data-v-ccc08f1c><option value="" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "") : ssrLooseEqual(user.area, "")) ? " selected" : ""}>Opcional</option><option value="Toda la empresa" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "Toda la empresa") : ssrLooseEqual(user.area, "Toda la empresa")) ? " selected" : ""}>Toda la empresa</option><option value="Atención al Cliente" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "Atención al Cliente") : ssrLooseEqual(user.area, "Atención al Cliente")) ? " selected" : ""}>Atención al Cliente</option><option value="Finanzas" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "Finanzas") : ssrLooseEqual(user.area, "Finanzas")) ? " selected" : ""}>Finanzas</option><option value="Legal" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "Legal") : ssrLooseEqual(user.area, "Legal")) ? " selected" : ""}>Legal</option><option value="Marketing" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "Marketing") : ssrLooseEqual(user.area, "Marketing")) ? " selected" : ""}>Marketing</option><option value="Operaciones" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "Operaciones") : ssrLooseEqual(user.area, "Operaciones")) ? " selected" : ""}>Operaciones</option><option value="Recursos Humanos" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "Recursos Humanos") : ssrLooseEqual(user.area, "Recursos Humanos")) ? " selected" : ""}>Recursos Humanos</option><option value="Tecnología" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "Tecnología") : ssrLooseEqual(user.area, "Tecnología")) ? " selected" : ""}>Tecnología</option><option value="Ventas" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "Ventas") : ssrLooseEqual(user.area, "Ventas")) ? " selected" : ""}>Ventas</option><option value="Otra" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.area) ? ssrLooseContain(user.area, "Otra") : ssrLooseEqual(user.area, "Otra")) ? " selected" : ""}>Otra</option></select></div><div data-v-ccc08f1c><label class="block text-xs font-heading font-semibold uppercase tracking-wider text-gray-500 mb-1.5" data-v-ccc08f1c>Tamaño</label><select class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm transition-all duration-200 outline-none focus:bg-white focus:ring-2 focus:ring-primary-400 focus:border-transparent" data-v-ccc08f1c><option value="" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.size) ? ssrLooseContain(user.size, "") : ssrLooseEqual(user.size, "")) ? " selected" : ""}>Opcional</option><option value="1-10" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.size) ? ssrLooseContain(user.size, "1-10") : ssrLooseEqual(user.size, "1-10")) ? " selected" : ""}>1 a 10 personas</option><option value="11-50" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.size) ? ssrLooseContain(user.size, "11-50") : ssrLooseEqual(user.size, "11-50")) ? " selected" : ""}>11 a 50 personas</option><option value="51-200" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.size) ? ssrLooseContain(user.size, "51-200") : ssrLooseEqual(user.size, "51-200")) ? " selected" : ""}>51 a 200 personas</option><option value="201+" data-v-ccc08f1c${ssrIncludeBooleanAttr(Array.isArray(user.size) ? ssrLooseContain(user.size, "201+") : ssrLooseEqual(user.size, "201+")) ? " selected" : ""}>Más de 200 personas</option></select></div></div><label class="flex items-start gap-3 text-xs text-gray-600 pt-2 cursor-pointer" data-v-ccc08f1c><input${ssrIncludeBooleanAttr(Array.isArray(user.consent) ? ssrLooseContain(user.consent, null) : user.consent) ? " checked" : ""} type="checkbox" required class="mt-0.5 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" data-v-ccc08f1c><span data-v-ccc08f1c>Acepto recibir el informe y comunicaciones relacionadas. Podés darte de baja cuando quieras.</span></label><button type="submit"${ssrIncludeBooleanAttr(sending.value) ? " disabled" : ""} class="w-full mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-heading font-bold text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-lg disabled:opacity-60" data-v-ccc08f1c>`);
          if (!sending.value) {
            _push(`<span data-v-ccc08f1c>Enviar informe</span>`);
          } else {
            _push(`<span class="flex items-center gap-2" data-v-ccc08f1c><svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" data-v-ccc08f1c><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-ccc08f1c></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" data-v-ccc08f1c></path></svg> Enviando... </span>`);
          }
          _push(`</button>`);
          if (emailStatus.value === "error") {
            _push(`<p class="text-red-600 text-xs text-center" data-v-ccc08f1c> No pudimos enviar el informe. Escribinos a info@asytec.com. </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button type="button" class="w-full text-sm text-gray-500 hover:text-primary-700 transition-colors py-2" data-v-ccc08f1c> ← Volver al informe </button></form></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/TestSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ccc08f1c"]]);
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useDiagnosticoModal = () => {
  const isOpen = useState("diagnostico-modal-open", () => false);
  const open = () => {
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };
  return { isOpen, open, close, toggle };
};
const _sfc_main$3 = {
  __name: "DiagnosticoModal",
  __ssrInlineRender: true,
  setup(__props) {
    const { isOpen } = useDiagnosticoModal();
    ref(null);
    const closeBtn = ref(null);
    let previousActive = null;
    watch(isOpen, async (open) => {
      if (open) {
        previousActive = (void 0).activeElement;
        await nextTick();
        closeBtn.value?.focus();
      } else if (previousActive && typeof previousActive.focus === "function") {
        previousActive.focus();
        previousActive = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TestSection = __nuxt_component_0;
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(isOpen)) {
          _push2(`<div class="diagnostico-modal fixed inset-0 z-[100] flex items-stretch md:items-center justify-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="diag-modal-title" data-v-0a4c7022><div class="diagnostico-modal-backdrop absolute inset-0 bg-gray-900/60 backdrop-blur-sm" data-v-0a4c7022></div><div tabindex="-1" class="diagnostico-modal-panel relative w-full max-w-5xl max-h-[100dvh] md:max-h-[90vh] overflow-y-auto bg-gray-50 md:rounded-2xl shadow-2xl outline-none" data-v-0a4c7022><div class="diagnostico-modal-header sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4" data-v-0a4c7022><div class="flex items-center gap-3 min-w-0" data-v-0a4c7022><img${ssrRenderAttr("src", _imports_0)} alt="ASYTEC Sistemas" class="h-7 w-auto flex-shrink-0" data-v-0a4c7022><span id="diag-modal-title" class="text-sm font-heading font-semibold text-gray-700 truncate" data-v-0a4c7022> Diagnóstico de adopción de IA </span></div><button type="button" class="diagnostico-modal-close flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" aria-label="Cerrar diagnóstico" data-v-0a4c7022><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" data-v-0a4c7022><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-0a4c7022></path></svg></button></div>`);
          _push2(ssrRenderComponent(_component_TestSection, { embedded: "" }, null, _parent));
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sections/DiagnosticoModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-0a4c7022"]]);
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    watch(() => route.hash, (hash) => {
      if (!hash) return;
      setTimeout(() => {
        const el = (void 0).querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0$1;
      const _component_DiagnosticoModal = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(ssrRenderComponent(_component_DiagnosticoModal, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const status = Number(_error.statusCode || 500);
    const is404 = status === 404;
    const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import("./_nuxt/error-404-B9H92GiO.js"));
    const _Error = defineAsyncComponent(() => import("./_nuxt/error-500-D5SuGPeX.js"));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ status: unref(status), statusText: unref(statusText), statusCode: unref(status), statusMessage: unref(statusText), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.21.5_@parcel+watcher_2acd9ae26e8c5dd00dffc5f73e0dcaf7/node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    function invokeAppErrorHandler(err, target, info) {
      const errorHandler = nuxtApp.vueApp.config.errorHandler;
      if (errorHandler && !errorHandler.__nuxt_default) {
        try {
          errorHandler(err, target, info);
        } catch (handlerError) {
          console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
        }
      }
    }
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        invokeAppErrorHandler(err, target, info);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.21.5_@parcel+watcher_2acd9ae26e8c5dd00dffc5f73e0dcaf7/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));
export {
  _export_sfc as _,
  useRuntimeConfig as a,
  useRequestEvent as b,
  useDiagnosticoModal as c,
  useRoute as d,
  entry_default as default,
  _imports_0 as e,
  useRouter as f,
  encodeRoutePath as g,
  nuxtLinkDefaults as h,
  navigateTo as n,
  resolveRouteObject as r,
  tryUseNuxtApp as t,
  useNuxtApp as u
};
//# sourceMappingURL=server.mjs.map
