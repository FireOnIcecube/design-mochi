<script setup lang="ts">
import { fetchThumbnails, buildThumbnailQuery } from '@pkg/firebase/db/entities/thumbnail'
import { Thumbnail, ThumbnailQueryOptions } from '@/packages/types'
import { onMounted, ref } from 'vue'
import { ThumbnailCard } from '@/apps/admin/src/components/thumbnailCard'
import { PaginationBar } from '@admin/components/common/paginationBar'

const thumbnails = ref<Thumbnail[]>([])
const currentPage = ref(1)
const pageSize = 12
const totalPages = ref(1)
const totalCount = ref(0)
const pageCursors = ref<any[]>([]) // 每頁最後一筆 snapshot，用來實作 startAfter

async function loadTotalCount() {
  const options: ThumbnailQueryOptions = {}

  // 不可添加 limit，需要獲取總數
  if (options.limit) {
    console.error('無法在獲取總數時使用 limit。')
    return
  }

  const q = buildThumbnailQuery(options)

  try {
    const snapshot = await fetchThumbnails(q)
    totalCount.value = snapshot.length
    totalPages.value = Math.ceil(totalCount.value / pageSize)
  } catch (e) {
    alert('無法載入縮圖總數，請稍後再試')
  }
}

async function loadThumbnails() {
  const q = buildThumbnailQuery({
    limit: 2,
    order: { createdAt: 'desc' },
  })
  try {
    thumbnails.value = await fetchThumbnails(q)
  } catch (error) {
    alert('無法載入縮圖資料，請稍後再試。')
    console.error('Error fetching thumbnails:', error)
  }
}

function handlePageChange(newPage: number) {
  currentPage.value = newPage
}

onMounted(() => {
  loadTotalCount()
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

    <div class="text-content dark:text-content-dark text-2xl leading-10">
      <div>資料總數: {{ totalCount }}</div>
      <div>每頁容量: {{ pageSize }}</div>
      <div>總共頁數: {{ totalPages }}</div>
    </div>
  </template>
  <template v-else>
    <p class="text-center text-gray-500">沒有縮圖可顯示</p>
  </template>
</template>
