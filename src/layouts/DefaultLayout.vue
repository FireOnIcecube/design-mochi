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
  <header class="bg-primary dark:bg-primary-dark p-4 border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto flex items-center justify-between">
      <!-- LOGO -->
      <router-link to="/" class="text-gray-900 dark:text-white text-xl font-bold hover:opacity-80">
        MyApp
      </router-link>

      <!-- 桌面版導覽選單 -->
      <nav class="hidden md:flex space-x-6">
        <router-link
          to="/"
          class="text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
        >
          Home
        </router-link>
        <router-link
          to="/about"
          class="text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
        >
          About
        </router-link>
        <router-link
          to="/contact"
          class="text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
        >
          Contact
        </router-link>
      </nav>

      <!-- 控制黑夜模式的按鈕 -->
      <button @click="toggleDark()" class="text-gray-900 dark:text-white focus:outline-none ml-4">
        <span v-if="isDark">🌙</span>
        <span v-else>☀️</span>
      </button>

      <!-- 漢堡選單按鈕 (行動版) -->
      <button
        @click="toggleMenu"
        class="md:hidden text-gray-900 dark:text-text-dark focus:outline-none ml-4"
      >
        <span v-if="isMenuOpen">✕</span>
        <span v-else>☰</span>
      </button>
    </div>

    <!-- 行動版選單 -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700"
    >
      <router-link
        to="/"
        class="block text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 py-2"
      >
        Home
      </router-link>
      <router-link
        to="/about"
        class="block text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 py-2"
      >
        About
      </router-link>
      <router-link
        to="/contact"
        class="block text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 py-2"
      >
        Contact
      </router-link>
    </div>
  </header>
</template>
