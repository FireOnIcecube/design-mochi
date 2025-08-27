<script setup lang="ts">
import { editThumbnail, deleteThumbnail } from '@pkg/firebase/db/entities/thumbnail'
import { Thumbnail } from '@/packages/types'
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { ThumbnailCard } from '@/apps/client/src/components/thumbnail/thumbnailCard'
import { PaginationBar } from '@client/components/common/paginationBar'
import { useThumbnailStore } from '@client/stores/useThumbnailStore'
import { useRoute, useRouter } from 'vue-router'
import { usePageSync } from '@client/composables/usePageSync'
import { useThumbnailCategoryStore } from '@client/stores/useThumbnailCategoryStore'
import { ThumbnailDetailModal } from '@client/components/thumbnail/thumbnailDetailModal'

const modalRef = ref<InstanceType<typeof ThumbnailDetailModal>>()
const route = useRoute()
const router = useRouter()

const thumbnailStore = useThumbnailStore()
const categoryStore = useThumbnailCategoryStore()

// 計算出要監聽的 query（排除 page & limit）
const allThumbnails = computed(() => {
  const { page, limit, keyword, isVtuber, ...rest } = route.query
  let filtered = thumbnailStore.data

  // keyword 篩選
  if (keyword) {
    filtered = filtered.filter((thumb) =>
      thumb.name.toLowerCase().includes((keyword as string).toLowerCase())
    )
  }

  // 是否為 vtuber
  if (isVtuber == 'true') {
    filtered = filtered.filter((t) => t.isVtuber)
  }

  // 不顯示封存的 thumbnail 僅前台使用
  filtered = filtered.filter((t) => !t.isArchived)

  // 動態分類篩選
  for (const [categoryKey, selectedTags] of Object.entries(rest)) {
    if (!selectedTags || (Array.isArray(selectedTags) && selectedTags.length === 0)) {
      continue // 沒有選中任何 tags 就跳過
    }

    filtered = filtered.filter((thumb) => {
      // 找到該 thumb 的 category
      const cat = thumb.categories.find((c) => c.category === categoryKey)
      if (!cat) return false // 沒有這個分類就不符合

      // 判斷是否有 tag 交集
      return cat.tags.some((tag) => (selectedTags as string[]).includes(tag))
    })
  }
  return filtered
})

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

// 點擊卡片
function openThumbnailModal(t: Thumbnail) {
  router.push({ name: 'ThumbnailList', params: { id: t.id }, query: route.query }) // 更新 URL
  modalRef.value?.open(t)
}

// 換頁
function handlePageChange(newPage: number) {
  currentPage.value = newPage
}

onMounted(async () => {
  if (!thumbnailStore.data.length) {
    await thumbnailStore.fetchAll()
  }
  if (!categoryStore.data.length) {
    await categoryStore.fetchAll()
  }

  tryOpenModalFromRoute()
})

// 同步頁碼和 page query
usePageSync(currentPage, totalPages)

// route 監聽 id，自動打開 modal
watch(
  () => route.params.id,
  () => {
    tryOpenModalFromRoute()
  }
)

async function tryOpenModalFromRoute() {
  const id = route.params.id
  if (!id) return

  // 確保 store 資料載入完成
  if (!thumbnailStore.data.length) {
    await thumbnailStore.fetchAll({ order: { createdAt: 'desc' } })
  }

  await nextTick() // 等 modalRef 綁定完成

  // 找出對應的 thumbnail
  const t = thumbnailStore.data.find((th) => th.id === id)
  if (t) {
    modalRef.value?.open(t)
  }
}
</script>

<template>
  <template v-if="thumbnails && thumbnails.length > 0">
    <div
      class="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12 xl:grid-cols-4"
    >
      <div
        v-for="item in thumbnails"
        :key="item.id"
        class="rounded-md p-2 transition duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <ThumbnailCard :thumbnail="item" :openThumbnailModal="openThumbnailModal" />
      </div>

      <ThumbnailDetailModal ref="modalRef" />
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
