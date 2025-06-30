<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
</script>

<template>
  <div class="text-content dark:text-content-dark">
    <h1>🎉 歡迎進入後台主頁</h1>
    <h1>用戶: {{ auth.currentUser?.displayName }}</h1>
    <h1>電子郵件: {{ auth.currentUser?.email }}</h1>
    <p>你已經成功登入，且通過白名單驗證！</p>
  </div>
</template>
