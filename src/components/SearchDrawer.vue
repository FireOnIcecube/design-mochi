<script setup lang="tsx">
import { ref } from 'vue'

const isOpen = ref(false)
const toggleDrawer = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <!-- 觸發按鈕 -->
  <button
    @click="toggleDrawer"
    class="fixed right-4 bottom-4 rounded-full bg-blue-500 p-3 text-white shadow-lg transition-colors hover:bg-blue-600"
  >
    Open Drawer
  </button>

  <!-- 遮罩層 (點擊可關閉) -->
  <div
    v-if="isOpen"
    @click="toggleDrawer"
    class="fixed inset-0 z-10 bg-black opacity-50 transition-opacity"
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
      class="fixed top-0 right-0 z-20 h-full w-64 transform bg-white p-4 shadow-lg"
    >
      <button @click="toggleDrawer" class="mb-4 text-gray-600">Close</button>
      <p class="text-lg font-bold">這是 Drawer 內容</p>
      <p>你可以在這裡放一些選單、按鈕、或其他內容。</p>
    </div>
  </transition>
</template>
