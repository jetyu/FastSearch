import { computed, ref, watchEffect } from 'vue'
import useConfig from './useConfig'
import { getAsRoot } from '../util'

const theme = useConfig({
  name: 'theme',
  defaultVal: 'auto',
  reg: /^(auto|dark|light)$/
})

const colorScheme = typeof window.matchMedia === 'function'
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null
const systemDark = ref(Boolean(colorScheme?.matches))

function onColorSchemeChange (event) {
  systemDark.value = event.matches
}

if (colorScheme) {
  if (typeof colorScheme.addEventListener === 'function') {
    colorScheme.addEventListener('change', onColorSchemeChange)
  } else if (typeof colorScheme.addListener === 'function') {
    colorScheme.addListener(onColorSchemeChange)
  }
}

const resolvedTheme = computed(() => {
  if (theme.value === 'dark' || theme.value === 'light') return theme.value
  return systemDark.value ? 'dark' : 'light'
})

export default function useTheme () {
  watchEffect(() => {
    const root = getAsRoot()
    if (!root) return
    root.dataset.asTheme = resolvedTheme.value
    root.style.colorScheme = resolvedTheme.value
  })

  return {
    theme,
    resolvedTheme
  }
}
