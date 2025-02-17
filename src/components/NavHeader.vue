<script setup lang="tsx">
import { ref, onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

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
        <nav class="mr-4 hidden space-x-8 md:flex">
          <router-link
            to="/"
            class="text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
          >
            首頁
          </router-link>

          <router-link
            to="/contact"
            class="text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
            exact-active-class="text-red-500"
          >
            設計封面
          </router-link>
          <!-- <router-link
            to="/contact"
            class="text-text hover:text-gray-500 dark:text-text-dark dark:hover:text-gray-400"
          >
            我的收藏
          </router-link> -->
        </nav>

        <!-- 控制黑夜模式的按鈕 -->
        <button
          @click="() => toggleDark()"
          class="mx-4 text-text focus:outline-none dark:text-text-dark"
        >
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
