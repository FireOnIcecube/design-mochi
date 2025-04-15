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
    class="fixed bottom-4 right-4 rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600"
  >
    Open Drawer
  </button>

  <!-- 遮罩層 (點擊可關閉) -->
  <div
    v-if="isOpen"
    @click="toggleDrawer"
    class="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity"
  ></div>

  <!-- Drawer -->
  <transition name="slide">
    <div v-if="isOpen" class="fixed right-0 top-0 z-20 h-full w-64 bg-white p-4 shadow-lg">
      <button @click="toggleDrawer" class="mb-4 text-gray-600">Close</button>
      <p class="text-lg font-bold">這是 Drawer 內容</p>
      <p>你可以在這裡放一些選單、按鈕、或其他內容。</p>
    </div>
  </transition>
</template>

<style>
/* 進場動畫 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
