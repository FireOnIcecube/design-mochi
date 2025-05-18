<script setup lang="tsx">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useDarkMode } from '@/composables/useDarkMode'
import BurgerMenu from './BurgerMenu.vue'

const { isDarkMode, toggleDarkMode } = useDarkMode()
</script>

<template>
  <div
    class="bg-surface dark:bg-surface-dark transition-theme flex items-center justify-between md:mx-4"
  >
    <router-link
      to="/"
      class="font-mantou text-content dark:text-content-dark text-2xl hover:opacity-80 lg:text-4xl"
    >
      設計麻糬
    </router-link>

    <div>
      <nav class="flex gap-2 lg:mr-4">
        <!-- <router-link
            to="/contact"
            class="text-content hover:text-gray-500 dark:text-content-dark dark:hover:text-gray-400"
          >
            我的收藏
          </router-link> -->

        <label class="swap swap-rotate text-content dark:text-content-dark">
          <input type="checkbox" class="theme-controller hidden" @change="() => toggleDarkMode()" />

          <Icon icon="uil:sun" class="swap-off h-6 w-6 fill-current lg:h-8 lg:w-8" />

          <Icon icon="uil:moon" class="swap-on h-6 w-6 fill-current lg:h-8 lg:w-8" />
        </label>

        <BurgerMenu />
      </nav>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
