<script setup lang="tsx">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const isOpen = ref(false)
const toggleDrawer = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div @click="toggleDrawer" class="p-4">
    <Icon
      icon="ion:search"
      width="1.8rem"
      height="1.8rem"
      class="translate-transform text-content dark:text-content-dark duration-150 ease-out select-none group-hover:scale-105"
    />
  </div>

  <!-- 遮罩層 (點擊可關閉) -->
  <div
    v-if="isOpen"
    @click="toggleDrawer"
    class="fixed inset-0 z-10 cursor-default bg-black opacity-50 transition-opacity"
  ></div>

  <!-- Drawer -->
  <transition
    enter-active-class="transition transform duration-300 ease-in-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition transform duration-300 ease-in-out"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="isOpen"
      class="bg-surface dark:bg-surface-dark fixed top-0 right-0 z-20 h-full w-80 transform p-4 shadow-lg"
    >
      <button @click="toggleDrawer" class="mb-4 cursor-pointer text-gray-600">Close</button>
      <p class="text-content dark:text-content-dark text-lg font-bold">這是 Drawer 內容</p>
      <p class="text-content dark:text-content-dark">你可以在這裡放一些選單、按鈕、或其他內容。</p>
    </div>
  </transition>
</template>
