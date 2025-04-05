<script setup lang="tsx">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const isCategoryOpen = ref(false)

const toggleCategoryMenu = () => {
  isCategoryOpen.value = !isCategoryOpen.value
}
</script>

<template>
  <div>
    <div class="shadow-md">
      <div class="flex justify-center">
        <div class="flex space-x-2 overflow-x-auto p-3">
          <div
            class="flex-shrink-0 cursor-pointer px-8 py-2 text-xl font-bold text-text transition-transform ease-out hover:scale-95 hover:text-blue-600 active:scale-90 dark:text-text-dark dark:hover:text-blue-600"
          >
            分類一
          </div>
          <div
            class="flex-shrink-0 cursor-pointer px-8 py-2 text-xl font-bold text-text transition-transform ease-out hover:scale-95 hover:text-blue-600 active:scale-90 dark:text-text-dark dark:hover:text-blue-600"
          >
            分類二
          </div>
          <div
            class="flex-shrink-0 cursor-pointer px-8 py-2 text-xl font-bold text-text transition-transform ease-out hover:scale-95 hover:text-blue-600 active:scale-90 dark:text-text-dark dark:hover:text-blue-600"
          >
            分類三
          </div>
          <div
            class="flex-shrink-0 cursor-pointer px-8 py-2 text-xl font-bold text-text transition-transform ease-out hover:scale-95 hover:text-blue-600 active:scale-90 dark:text-text-dark dark:hover:text-blue-600"
          >
            分類四
          </div>
          <div
            class="flex-shrink-0 cursor-pointer px-8 py-2 text-xl font-bold text-text transition-transform ease-out hover:scale-95 hover:text-blue-600 active:scale-90 dark:text-text-dark dark:hover:text-blue-600"
          >
            分類五
          </div>
          <div
            class="flex-shrink-0 cursor-pointer px-8 py-2 text-xl font-bold text-text transition-transform ease-out hover:scale-95 hover:text-blue-600 active:scale-90 dark:text-text-dark dark:hover:text-blue-600"
          >
            分類六
          </div>
          <div
            class="flex-shrink-0 cursor-pointer px-8 py-2 text-xl font-bold text-text transition-transform ease-out hover:scale-95 hover:text-blue-600 active:scale-90 dark:text-text-dark dark:hover:text-blue-600"
          >
            分類七
          </div>
          <div
            class="flex-shrink-0 cursor-pointer px-8 py-2 text-xl font-bold text-text transition-transform ease-out hover:scale-95 hover:text-blue-600 active:scale-90 dark:text-text-dark dark:hover:text-blue-600"
          >
            分類八
          </div>
        </div>

        <div class="group ml-8 flex cursor-pointer items-center justify-center bg-stone-100 px-6">
          <Icon
            icon="ion:search"
            width="1.8em"
            height="1.8em"
            class="translate-transform text-text duration-150 ease-out group-hover:scale-110"
          />
        </div>
      </div>

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
  </div>
</template>
