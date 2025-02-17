<script setup lang="tsx">
import { ref } from 'vue'

const isCategoryOpen = ref(false)

const toggleCategoryMenu = () => {
  isCategoryOpen.value = !isCategoryOpen.value
}
</script>

<template>
  <div>
    <!-- 第一層導航：Logo & 網站介紹 -->
    <header class="fixed left-0 top-0 z-50 w-full bg-white shadow-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div class="font-mantou text-3xl">設計麻糬</div>
        <nav class="hidden space-x-6 md:flex">
          <a href="#" class="hover:text-blue-500">首頁</a>
          <a href="#" class="hover:text-blue-500">關於我們</a>
          <a href="#" class="hover:text-blue-500">聯絡</a>
        </nav>
      </div>
    </header>

    <!-- 第二層導航：分類選單（sticky） -->
    <div class="sticky top-[64px] z-40 bg-gray-100 shadow-sm">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <button @click="toggleCategoryMenu" class="text-lg font-semibold">🔍 瀏覽分類</button>
        <div class="hidden space-x-4 md:flex">
          <a href="#" class="hover:underline">字體</a>
          <a href="#" class="hover:underline">設計素材</a>
          <a href="#" class="hover:underline">YouTube 縮圖</a>
        </div>
      </nav>

      <!-- 手機版分類選單 -->
      <transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="isCategoryOpen"
          class="flex flex-col space-y-2 bg-white p-4 shadow-md md:hidden"
        >
          <a href="#" class="border-b py-2">字體</a>
          <a href="#" class="border-b py-2">設計素材</a>
          <a href="#" class="border-b py-2">YouTube 縮圖</a>
        </div>
      </transition>
    </div>

    <!-- 主要內容 -->
    <main class="mx-auto max-w-7xl p-6 pt-[112px]">
      <h1 class="text-3xl font-bold">內容區</h1>
      <p class="mt-4 text-gray-600">這是你的內容區域，現在 `main` 不會被 `nav` 遮擋了！</p>
    </main>
  </div>
</template>
