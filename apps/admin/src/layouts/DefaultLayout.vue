<script setup lang="ts">
import NavHeader from '@admin/components/NavHeader.vue'
import Sidebar from '../components/Sidebar.vue'
import CategoryMenuBar from '../components/layout/categoryMenuBar/CategoryMenuBar.vue'
import { useThumbnailCategoryStore } from '../stores/useThumbnailCategoryStore'
import { onMounted } from 'vue'
import { useThumbnailStore } from '../stores/useThumbnailStore'

const thumbnailStore = useThumbnailStore()
const categoryStore = useThumbnailCategoryStore()

onMounted(async () => {
  thumbnailStore.fetchAll({ order: { createdAt: 'desc' } })
  categoryStore.fetchAll({ order: { createdAt: 'asc' } })
})
</script>

<template>
  <div class="flex h-screen flex-col">
    <div class="border-b px-4 lg:p-4 dark:border-gray-700">
      <NavHeader />
    </div>

    <div class="flex flex-1 overflow-hidden">
      <aside class="border-r dark:border-gray-700">
        <Sidebar />
      </aside>

      <div class="flex flex-1 flex-col overflow-auto">
        <div class="bg-surface dark:bg-surface-dark h-16 w-full border-b dark:border-gray-700">
          <CategoryMenuBar :thumbnail-categories="categoryStore.data" />
        </div>
        <main class="container mx-auto flex-1 p-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
