<script setup lang="tsx">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

import { useDarkMode } from '@/composables/useDarkMode'

const isMenuOpen = ref(false)

const { isDarkMode, toggleDarkMode } = useDarkMode()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="flex items-center justify-between md:mx-4">
    <!-- LOGO -->
    <router-link
      to="/"
      class="font-mantou text-content dark:text-content-dark text-3xl hover:opacity-80 lg:text-4xl"
    >
      設計麻糬
    </router-link>

    <div class="flex items-center">
      <nav class="mr-4 space-x-4 md:flex md:space-x-8">
        <!-- <router-link
            to="/"
            class="text-content hover:text-gray-500 dark:text-content-dark dark:hover:text-gray-400"
          >
            首頁
          </router-link> -->

        <!-- <router-link
            to="/contact"
            class="text-content hover:text-gray-500 dark:text-content-dark dark:hover:text-gray-400"
            exact-active-class="text-red-500"
          >
            設計封面
          </router-link> -->
        <!-- <router-link
            to="/contact"
            class="text-content hover:text-gray-500 dark:text-content-dark dark:hover:text-gray-400"
          >
            我的收藏
          </router-link> -->

        <label class="swap swap-rotate text-content dark:text-content-dark">
          <input type="checkbox" class="theme-controller hidden" @change="() => toggleDarkMode()" />

          <Icon icon="uil:sun" width="2.0rem" height="2.0rem" class="swap-off fill-current" />

          <Icon icon="uil:moon" width="2.0rem" height="2.0rem" class="swap-on fill-current" />
        </label>
      </nav>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
