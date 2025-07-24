<script setup lang="ts">
import { fetchThumbnails, buildThumbnailQuery } from '@pkg/firebase/db/entities/thumbnail'
import { Thumbnail, ThumbnailQueryOptions } from '@/packages/types'
import { onMounted, ref, computed, watch } from 'vue'
import { ThumbnailCard } from '@/apps/admin/src/components/thumbnailCard'
import { PaginationBar } from '@admin/components/common/paginationBar'

// 原始全部資料
const allThumbnails = ref<Thumbnail[]>([])

// 當前頁顯示資料
const thumbnails = ref<Thumbnail[]>([])

const currentPage = ref(1)
const pageSize = 30

const totalCount = computed(() => allThumbnails.value.length)
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize))

// 根據 currentPage 切割資料
function updateThumbnailsByPage() {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  thumbnails.value = allThumbnails.value.slice(start, end)
}

async function loadAllThumbnails() {
  const q = buildThumbnailQuery({
    order: { createdAt: 'desc' },
  })
  try {
    allThumbnails.value = await fetchThumbnails(q)
    updateThumbnailsByPage()
  } catch (error) {
    alert('無法載入縮圖資料，請稍後再試。')
    console.error('Error fetching thumbnails:', error)
  }
}

function handlePageChange(newPage: number) {
  currentPage.value = newPage
}

// 切換頁碼時，重新切割資料
watch(currentPage, updateThumbnailsByPage)

onMounted(() => {
  loadAllThumbnails()
})
</script>

<template>
  <h1 class="text-content dark:text-content-dark flex text-2xl leading-10">ThumbnailList</h1>

  <template v-if="thumbnails && thumbnails.length > 0">
    <div class="text-content dark:text-content-dark space-x-4 text-2xl leading-10">
      <span>資料總數: {{ totalCount }}</span>
      <span> 每頁容量: {{ pageSize }}</span>
      <span> 總共頁數: {{ totalPages }}</span>
    </div>

    <div
      class="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12 xl:grid-cols-4"
    >
      <div v-for="item in thumbnails" :key="item.id">
        <ThumbnailCard :thumbnail="item" />
      </div>
    </div>

    <div class="mt-10 flex justify-end">
      <PaginationBar
        :currentPage="currentPage"
        :totalPages="totalPages"
        @change="handlePageChange"
      />
    </div>
  </template>

  <template v-else>
    <p class="text-center text-gray-500">沒有縮圖可顯示</p>
  </template>
</template>
