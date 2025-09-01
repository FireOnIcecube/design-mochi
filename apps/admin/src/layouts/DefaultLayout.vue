<script setup lang="ts">
import NavHeader from '@admin/components/NavHeader.vue'
import Sidebar from '../components/Sidebar.vue'
import CategoryMenuBar from '../components/layout/categoryMenuBar/CategoryMenuBar.vue'
import { useThumbnailCategoryStore } from '../stores/useThumbnailCategoryStore'
import { computed, onMounted } from 'vue'
import { useThumbnailStore } from '../stores/useThumbnailStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const thumbnailStore = useThumbnailStore()
const categoryStore = useThumbnailCategoryStore()

const isVtuber = computed(() => {
  const val = route.query.isVtuber
  if (val === 'true') return true
  if (val === 'false') return false
  return false // 預設值
})

function handleToggleVtuberMode(isVtuberMode: boolean) {
  router.replace({
    path: route.path,
    query: { ...route.query, isVtuber: String(isVtuberMode) },
  })
}

onMounted(async () => {
  thumbnailStore.fetchAll({ order: { createdAt: 'desc' } })
  categoryStore.fetchAll({ order: { createdAt: 'asc' } })
})
</script>

<template>
  <div class="flex h-screen flex-col">
    <div class="bg-primary dark:bg-surface-dark border-b px-4 lg:p-4 dark:border-gray-700">
      <NavHeader />
    </div>

    <div class="flex flex-1 overflow-hidden">
      <aside class="border-r dark:border-gray-700">
        <Sidebar />
      </aside>

      <div class="flex flex-1 flex-col overflow-auto">
        <div
          class="bg-primary dark:bg-surface-dark flex w-full items-center justify-center border-b dark:border-gray-700"
        >
          <CategoryMenuBar
            :thumbnail-categories="categoryStore.data"
            :is-vtuber="isVtuber"
            @toggle-vtuber-mode="handleToggleVtuberMode"
          />
        </div>
        <main class="container mx-auto flex-1 p-4">
          <router-view />
        </main>

        <div
          class="bg-primary border-outline dark:bg-surface-dark transition-theme border-t p-4 text-center dark:border-gray-700"
        >
          <small>
            所有封面與影片素材版權均屬原創作者所有，本站僅作設計靈感分享，無意侵犯任何權益。
          </small>
          <!-- <p>© 2025 <strong>DesignMochi</strong> 🍡 | Crafted with ❤️ for creators</p> -->
        </div>
      </div>
    </div>
  </div>
</template>
