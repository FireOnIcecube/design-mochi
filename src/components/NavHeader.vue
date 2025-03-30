<script setup lang="tsx">
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const isMenuOpen = ref(false)

// 使用 VueUse 的 useDark 來偵測與切換黑夜模式
const isDark = useDark()
const toggleDark = useToggle(isDark)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="border-b border-gray-200 bg-primary p-4 dark:border-gray-700 dark:bg-primary-dark">
    <div class="flex items-center justify-between md:mx-4">
      <!-- LOGO -->
      <router-link
        to="/"
        class="font-mantou text-3xl text-text hover:opacity-80 dark:text-text-dark lg:text-4xl"
      >
        設計麻糬
      </router-link>

      <div class="flex items-center">
        <nav class="mr-4 space-x-4 md:flex md:space-x-8">
          <!-- <router-link
            to="/"
            class="text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
          >
            首頁
          </router-link> -->

          <!-- <router-link
            to="/contact"
            class="text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
            exact-active-class="text-red-500"
          >
            設計封面
          </router-link> -->
          <!-- <router-link
            to="/contact"
            class="text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
          >
            我的收藏
          </router-link> -->
          <button
            @click="() => toggleDark()"
            class="mx-4 text-text focus:outline-none dark:text-text-dark"
          >
            <span v-if="isDark">🌙</span>
            <span v-else>☀️</span>
          </button>
        </nav>

        <!-- 控制黑夜模式的按鈕 -->
      </div>
    </div>
  </div>
</template>
