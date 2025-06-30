<script lang="ts" setup>
import { signOut, getAuth } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = getAuth()

function logout() {
  signOut(auth)
    .then(() => {
      router.go(0)
    })
    .catch((error) => {
      console.error('登出失敗:', error)
      alert('登出失敗，請稍後再試')
    })
}

const links = [
  { name: '管理封面', path: 'thumbnails' },
  { name: '管理類別', path: 'categories' },
]
</script>

<template>
  <div class="flex h-full w-64 flex-col bg-gray-100 p-4 dark:bg-gray-800">
    <ul class="flex-1">
      <li v-for="link in links" :key="link.path" class="mb-2">
        <router-link
          :to="{ path: link.path }"
          class="block cursor-pointer rounded px-4 py-2 text-gray-700 transition-colors select-none hover:bg-gray-200 active:scale-95 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <span class="text-lg font-black"> {{ link.name }} </span>
        </router-link>
      </li>
    </ul>
    <button
      class="bg-surface-dark dark:bg-surface cursor-pointer rounded-lg py-2 shadow-md transition-colors hover:bg-gray-700 active:scale-95 active:shadow-inner dark:hover:bg-gray-200"
      @click="logout"
    >
      <span class="text-content-dark dark:text-content font-notosans text-lg">登出</span>
    </button>
  </div>
</template>
