import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'

export function useDarkMode() {
  const isDarkMode = useDark({ disableTransition: false })
  const toggleDarkMode = useToggle(isDarkMode)

  return { isDarkMode, toggleDarkMode }
}
