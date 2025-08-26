import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import { MotionPlugin } from '@vueuse/motion'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(MotionPlugin)

// vue 的全局錯誤處理器
app.config.errorHandler = (err, instance, info) => {
  console.error('[Global Error]:', err, info)
  // 你可以在這裡整合通知系統，如 Toast 或 Sentry
}

app.use(pinia)
app.mount('#app')
