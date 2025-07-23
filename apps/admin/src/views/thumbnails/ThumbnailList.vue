<script setup lang="ts">
import { fetchThumbnails } from '@/packages/firebase/db/entities/thumbnail'
import { Thumbnail } from '@/packages/types'
import { onMounted, ref } from 'vue'
import { ThumbnailCard } from '@/apps/admin/src/components/thumbnailCard'
import { PaginationBar } from '@admin/components/common/paginationBar'

const thumbnails = ref<Thumbnail[]>([])
const currentPage = ref(1)
const totalPages = 20 // 假設有20頁，實際應根據後端數據動態計算

async function loadThumbnails() {
  try {
    thumbnails.value = await fetchThumbnails()
  } catch (error) {
    alert('無法載入縮圖資料，請稍後再試。')
    console.error('Error fetching thumbnails:', error)
  }
}

function handlePageChange(newPage: number) {
  currentPage.value = newPage
}

onMounted(() => {
  loadThumbnails()
})
</script>

<template>
  <h1>ThumbnailList</h1>
  <template v-if="thumbnails && thumbnails.length > 0">
    <div class="grid grid-cols-2 gap-y-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12 xl:grid-cols-4">
      <div v-for="item in thumbnails" :key="item.id">
        <ThumbnailCard :thumbnail="item" />
      </div>
    </div>
    <PaginationBar :currentPage="currentPage" :totalPages="totalPages" @change="handlePageChange" />
  </template>
  <template v-else>
    <p class="text-center text-gray-500">沒有縮圖可顯示</p>
  </template>
</template>
