<script setup>
import { ref, onMounted } from 'vue'
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
    <div class="container mx-auto flex items-center justify-between">
      <!-- LOGO -->
      <router-link to="/" class="text-xl font-bold text-text hover:opacity-80 dark:text-text-dark">
        MyApp
      </router-link>

      <!-- 桌面版導覽選單 -->
      <nav class="hidden space-x-6 md:flex">
        <router-link
          to="/"
          class="text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
        >
          Home
        </router-link>
        <router-link
          to="/about"
          class="text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
        >
          About
        </router-link>
        <router-link
          to="/contact"
          class="text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
        >
          Contact
        </router-link>
      </nav>

      <!-- 控制黑夜模式的按鈕 -->
      <button @click="toggleDark()" class="ml-4 text-text focus:outline-none dark:text-text-dark">
        <span v-if="isDark">🌙</span>
        <span v-else>☀️</span>
      </button>

      <!-- 漢堡選單按鈕 (行動版) -->
      <button
        @click="toggleMenu"
        class="ml-4 text-text focus:outline-none dark:text-text-dark md:hidden"
      >
        <span v-if="isMenuOpen">✕</span>
        <span v-else>☰</span>
      </button>
    </div>

    <!-- 行動版選單 -->
    <div
      v-if="isMenuOpen"
      class="border-t border-gray-200 bg-primary p-4 text-text dark:border-gray-700 md:hidden"
    >
      <router-link
        to="/"
        class="block py-2 text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
      >
        Home
      </router-link>
      <router-link
        to="/about"
        class="block py-2 text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
      >
        About
      </router-link>
      <router-link
        to="/contact"
        class="block py-2 text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
      >
        Contact
      </router-link>
    </div>
  </div>
</template>
