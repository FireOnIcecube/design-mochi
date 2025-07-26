<script setup lang="ts">
import { fetchThumbnails, buildThumbnailQuery } from '@pkg/firebase/db/entities/thumbnail'
import { Thumbnail, ThumbnailQueryOptions } from '@/packages/types'
import { onMounted, ref, computed, watch } from 'vue'
import { ThumbnailCard } from '@/apps/admin/src/components/thumbnailCard'
import { PaginationBar } from '@admin/components/common/paginationBar'
import { useThumbnailStore } from '@admin/stores/useThumbnailStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const thumbnailStore = useThumbnailStore()

// 原始全部資料
const allThumbnails = computed(() => thumbnailStore.thumbnails)

// 當前頁顯示資料
const thumbnails = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return allThumbnails.value.slice(start, end)
})
const currentPage = ref(Number(route.query.page) || 1)
const pageSize = 30

const totalCount = computed(() => allThumbnails.value.length)
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize))

function handlePageChange(newPage: number) {
  currentPage.value = newPage
}

onMounted(() => {
  thumbnailStore.fetchAll({ order: { createdAt: 'desc' } })
})

watch(currentPage, (newPage) => {
  router.push({
    query: {
      ...route.query,
      page: newPage.toString(),
    },
  })
})

watch(
  () => route.query.page, // ← 第一個參數：要監看的資料（是個 function）
  (newPage) => {
    // ← 第二個參數：資料變動時執行的回呼
    const page = Number(newPage)
    if (!Number.isInteger(page) || page < 1 || page > totalPages.value) {
      currentPage.value = 1
    } else {
      currentPage.value = page
    }
  },
  { immediate: true }, // ← 第三個參數：watch 選項（立刻執行一次）
)
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
