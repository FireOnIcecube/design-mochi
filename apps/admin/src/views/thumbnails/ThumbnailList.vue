<script setup lang="ts">
import {
  fetchThumbnails,
  buildThumbnailQuery,
  editThumbnail,
} from '@pkg/firebase/db/entities/thumbnail'
import { Thumbnail, ThumbnailQueryOptions } from '@/packages/types'
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { ThumbnailCard } from '@/apps/admin/src/components/thumbnailCard'
import { PaginationBar } from '@admin/components/common/paginationBar'
import { useThumbnailStore } from '@admin/stores/useThumbnailStore'
import { useRoute, useRouter } from 'vue-router'
import { usePageSync } from '@admin/composables/usePageSync'

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

async function onThumbnailToggleHidden({ id, value }: { id: string; value: boolean }) {
  await editThumbnail(id, { isHidden: value })

  await thumbnailStore.fetchAll({ order: { createdAt: 'desc' } })
}

function handlePageChange(newPage: number) {
  currentPage.value = newPage
}

onMounted(async () => {
  thumbnailStore.fetchAll({ order: { createdAt: 'desc' } })
})

// 同步頁碼和 page query
usePageSync(currentPage, totalPages)
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
        <ThumbnailCard :thumbnail="item" @toggle-hidden="onThumbnailToggleHidden" />
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
