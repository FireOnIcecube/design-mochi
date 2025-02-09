import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { MotionPlugin } from '@vueuse/motion'

import Tooltip from 'primevue/tooltip'

const app = createApp(App)

app.use(router)
app.use(MotionPlugin)

app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Aura
  }
})

// vue 的全局錯誤處理器
app.config.errorHandler = (err, instance, info) => {
  console.error('[Global Error]:', err, info)
  // 你可以在這裡整合通知系統，如 Toast 或 Sentry
}

app.directive('tooltip', Tooltip)

app.mount('#app')
