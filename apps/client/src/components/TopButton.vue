<script setup lang="tsx">
import { ref, onMounted, onUnmounted } from 'vue'

// 記錄滾動位置
const showButton = ref(false)

// 監聽滾動事件
const handleScroll = () => {
  showButton.value = window.scrollY > 200
}

// 返回頂部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 註冊 & 移除滾動監聽
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <!-- 返回 TOP 按鈕 -->
  <button
    v-show="showButton"
    @click="scrollToTop"
    class="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-opacity duration-300 hover:bg-blue-600"
  >
    ⬆️
  </button>
</template>
