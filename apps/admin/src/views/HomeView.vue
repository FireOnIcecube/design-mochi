<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = getAuth()

function logout() {
  signOut(auth).then(() => {
    router.push('/login')
  })
}
</script>

<!-- src/views/Home.vue -->
<template>
  <div class="container mx-auto bg-red-200">
    <h1>🎉 歡迎進入後台主頁</h1>
    <h1>用戶: {{ auth.currentUser?.displayName }}</h1>
    <h1>電子郵件: {{ auth.currentUser?.email }}</h1>
    <p>你已經成功登入，且通過白名單驗證！</p>
    <button @click="logout">登出</button>
  </div>
</template>
