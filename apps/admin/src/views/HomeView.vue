<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
</script>

<template>
  <div class="flex justify-center">
    <div class="text-content dark:text-content-dark flex flex-col gap-8">
      <div class="space-y-2">
        <h1 class="font-notosans text-2xl">🎉 歡迎進入後台主頁</h1>
        <p class="font-notosans text-md text-gray-500">你已經成功登入，且通過白名單驗證！</p>
      </div>
      <div class="space-y-4">
        <h1 class="font-notosans text-lg">用戶: {{ auth.currentUser?.displayName }}</h1>
        <h1 class="font-notosans text-lg">電子郵件: {{ auth.currentUser?.email }}</h1>
      </div>
    </div>
  </div>
</template>
