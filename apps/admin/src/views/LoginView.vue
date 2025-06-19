<template>
  <div>
    <h1>請登入</h1>
    <div ref="uiContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { auth } from '@pkg/firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { useRouter } from 'vue-router'

const uiContainer = ref<HTMLElement | null>(null)
const router = useRouter()

onMounted(() => {
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
  ui.start(uiContainer.value!, {
    signInOptions: [
      {
        provider: 'google.com',
      },
    ],
    signInSuccessUrl: '/', // 或使用 callback 自行導向
    callbacks: {
      signInSuccessWithAuthResult() {
        router.push('/')
        return false
      },
    },
  })
})
</script>
