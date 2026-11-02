<template>
  <Teleport to="body">
    <Transition name="diag-modal">
      <div
        v-if="isOpen"
        class="diagnostico-modal fixed inset-0 z-[100] flex items-stretch md:items-center justify-center md:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="diag-modal-title"
      >
        <div class="diagnostico-modal-backdrop absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="close" />

        <div
          ref="panel"
          tabindex="-1"
          class="diagnostico-modal-panel relative w-full max-w-5xl max-h-[100dvh] md:max-h-[90vh] overflow-y-auto bg-gray-50 md:rounded-2xl shadow-2xl outline-none"
        >
          <div class="diagnostico-modal-header sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 min-w-0">
              <img src="/images/logotipo-azul.png" alt="ASYTEC Sistemas" class="h-7 w-auto flex-shrink-0" />
              <span id="diag-modal-title" class="text-sm font-heading font-semibold text-gray-700 truncate">
                Diagnóstico de adopción de IA
              </span>
            </div>

            <button
              ref="closeBtn"
              type="button"
              @click="close"
              class="diagnostico-modal-close flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Cerrar diagnóstico"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <TestSection embedded />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const { isOpen, close } = useDiagnosticoModal()

const panel = ref(null)
const closeBtn = ref(null)
let previousActive = null

const lockScroll = (locked) => {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  document.body.classList.toggle('diag-modal-open', locked)
}

const focusable = () => {
  if (!panel.value) return []
  return Array.from(
    panel.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  ).filter((el) => !el.disabled && el.offsetParent !== null)
}

const onKeydown = (event) => {
  if (!isOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key === 'Tab') {
    const nodes = focusable()
    if (!nodes.length) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

watch(isOpen, async (open) => {
  lockScroll(open)
  if (open) {
    previousActive = document.activeElement
    await nextTick()
    closeBtn.value?.focus()
  } else if (previousActive && typeof previousActive.focus === 'function') {
    previousActive.focus()
    previousActive = null
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  lockScroll(false)
})
</script>

<style scoped>
.diag-modal-enter-active,
.diag-modal-leave-active {
  transition: opacity 0.22s ease;
}
.diag-modal-enter-active .diagnostico-modal-panel,
.diag-modal-leave-active .diagnostico-modal-panel {
  transition: transform 0.22s ease, opacity 0.22s ease;
}
.diag-modal-enter-from,
.diag-modal-leave-to {
  opacity: 0;
}
.diag-modal-enter-from .diagnostico-modal-panel,
.diag-modal-leave-to .diagnostico-modal-panel {
  transform: translateY(12px) scale(0.99);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .diag-modal-enter-active,
  .diag-modal-leave-active,
  .diag-modal-enter-active .diagnostico-modal-panel,
  .diag-modal-leave-active .diagnostico-modal-panel {
    transition: none;
  }
}
</style>