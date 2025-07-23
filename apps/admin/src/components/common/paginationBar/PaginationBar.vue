<script setup lang="ts">
import { ref, computed } from 'vue'

const currentPage = ref(6)
const totalPages = 20
const pageOffsetNum = 3

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    currentPage.value = page
  }
}

const pagesToShow = computed(() => {
  const pages = []

  const middleVisiblePages = pageOffsetNum * 2 + 1 // 可見中間頁數（含當前頁），例如 2 左右 + 當前頁 = 5

  // 如果總頁數小於等於中間可見頁碼數 + 第一頁和最後一頁，則顯示所有頁碼
  if (totalPages <= middleVisiblePages + 2) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
    return pages
  }

  const firstPage = 1 // 第一頁
  const lastPage = totalPages //最後一頁
  const minMiddlePage = firstPage + 1 // 中間可列入的最小頁碼
  const maxMiddlePage = lastPage - 1 // 中間可列入的最大頁碼

  // 計算中間要顯示的頁碼範圍
  const startPage = Math.max(currentPage.value - pageOffsetNum, minMiddlePage)
  const endPage = Math.min(currentPage.value + pageOffsetNum, maxMiddlePage)

  // 建立頁碼陣列
  pages.push(firstPage) // 總是顯示第一頁

  if (startPage > minMiddlePage) pages.push('...')
  for (let i = startPage; i <= endPage; i++) pages.push(i)
  if (endPage < maxMiddlePage) pages.push('...')

  pages.push(lastPage) // 總是顯示最後一頁

  return pages
})
</script>

<template>
  <div class="flex items-center space-x-1 text-sm select-none">
    <!-- Prev -->
    <button
      class="rounded px-2 py-1 hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Prev
    </button>

    <!-- Pages -->
    <button
      v-for="(p, i) in pagesToShow"
      :key="i"
      class="rounded px-2 py-1 hover:bg-gray-200"
      :class="{
        'bg-blue-500 text-white': p === currentPage,
        'cursor-default': p === '...',
        'pointer-events-none': p === '...',
      }"
      @click="typeof p === 'number' && goToPage(p)"
    >
      {{ p }}
    </button>

    <!-- Next -->
    <button
      class="rounded px-2 py-1 hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>
