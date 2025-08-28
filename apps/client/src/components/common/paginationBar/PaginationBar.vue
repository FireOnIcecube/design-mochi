<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'change', newPage: number): void
}>()

const pageOffsetNum = 2

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages) return
  if (page === props.currentPage) return

  emit('change', page)
}

const pagesToShow = computed(() => {
  const pages = []

  const middleVisiblePages = pageOffsetNum * 2 + 1 // 可見中間頁數（含當前頁），例如 2 左右 + 當前頁 = 5

  // 如果總頁數小於等於中間可見頁碼數 + 第一頁和最後一頁，則顯示所有頁碼
  if (props.totalPages <= middleVisiblePages + 2) {
    for (let i = 1; i <= props.totalPages; i++) pages.push(i)
    return pages
  }

  const firstPage = 1 // 第一頁
  const lastPage = props.totalPages //最後一頁
  const minMiddlePage = firstPage + 1 // 中間可列入的最小頁碼
  const maxMiddlePage = lastPage - 1 // 中間可列入的最大頁碼

  // 計算中間要顯示的頁碼範圍
  const startPage = Math.max(props.currentPage - pageOffsetNum, minMiddlePage)
  const endPage = Math.min(props.currentPage + pageOffsetNum, maxMiddlePage)

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
  <div class="flex select-none items-center space-x-1 text-lg">
    <!-- Prev -->
    <button
      class="text-content dark:text-content-dark rounded px-2 py-1 hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 dark:hover:bg-gray-700"
      :disabled="props.currentPage === 1"
      @click="goToPage(props.currentPage - 1)"
    >
      Prev
    </button>

    <!-- Pages -->
    <button
      v-for="(p, i) in pagesToShow"
      :key="i"
      class="text-content dark:text-content-dark rounded px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
      :class="{
        'bg-blue-500 text-white': p === props.currentPage,
        'cursor-default': p === '...',
        'pointer-events-none': p === '...'
      }"
      @click="typeof p === 'number' && goToPage(p)"
    >
      {{ p }}
    </button>

    <!-- Next -->
    <button
      class="text-content dark:text-content-dark rounded px-2 py-1 hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 dark:hover:bg-gray-700"
      :disabled="props.currentPage === props.totalPages"
      @click="goToPage(props.currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>
