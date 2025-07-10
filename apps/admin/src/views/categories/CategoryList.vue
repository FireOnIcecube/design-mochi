<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { db } from '@pkg/firebase/index'
import type {
  ThumbnailCategory,
  ThumbnailCategoryCreateData,
  ThumbnailCategoryEditData,
} from '@pkg/types'
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import {
  createThumbnailCategory,
  deleteCategory,
  fetchThumbnailCategory,
  thumbnailConverter,
} from '@pkg/firebase/db/entities/thumbnailCategory'
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue'
import CategoryCreateModal from '@admin/components/CategoryCreateModal.vue'
import CategoryEditModal from '@admin/components/CategoryEditModal.vue'

const thumbnailCategories = ref<ThumbnailCategory[]>([])

async function handleFetchCategory() {
  try {
    thumbnailCategories.value = await fetchThumbnailCategory()
  } catch (error) {
    alert('無法載入分類資料，請稍後再試。')
    console.error('Error fetching categories:', error)
  }
}

async function handleCreateCategory(formData: ThumbnailCategoryCreateData) {
  try {
    await createThumbnailCategory(formData)
    await handleFetchCategory()
  } catch (error) {
    alert('無法新增分類資料，請稍後再試。')
    console.error('Error add categories:', error)
  }
}

function handleEditCategory(formData: ThumbnailCategoryEditData) {
  try {
  } catch (error) {
    alert('無法編輯封面類別，請稍後再試。')
    console.error('Error edit categories:', error)
  }
}

const searchTerm = ref('')

const filteredCategories = computed(() => {
  return thumbnailCategories.value.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.value.toLowerCase().trim()),
  )
})

async function handleDeleteCategory(id: string) {
  try {
    await deleteCategory(id)
    await handleFetchCategory()
  } catch (error) {
    alert('無法編輯封面類別，請稍後再試。')
    console.error('Error delete categories:', error)
  }
}

onMounted(() => {
  handleFetchCategory()
})
</script>

<template>
  <div class="p-6">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-content dark:text-content-dark text-2xl font-bold">分類管理</h1>
      <!-- <button
        class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        @click="openCreateModal"
      >
        新增分類
      </button> -->
      <CategoryCreateModal @submit="handleCreateCategory" />
    </div>

    <div class="mb-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="搜尋分類名稱..."
        class="w-full rounded border px-4 py-2"
      />
    </div>

    <table class="min-w-full rounded border bg-white shadow-sm">
      <thead class="bg-gray-100">
        <tr class="border-b">
          <th class="px-4 py-2 text-left">名稱</th>
          <th class="px-4 py-2 text-left">識別名(用於網址，必須唯一)</th>
          <th class="px-4 py-2 text-right">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in filteredCategories" :key="category.id" class="border-b">
          <td class="px-4 py-2">{{ category.name }}</td>
          <td class="px-4 py-2">{{ category.slug }}</td>
          <td class="flex justify-end gap-2 px-4 py-2">
            <CategoryEditModal :id="category.id" @refetch="handleFetchCategory" />
            <!-- <button
              class="cursor-pointer text-blue-600 hover:underline"
              @click="editCategory(category)"
            >
              編輯
            </button> -->
            <button
              class="cursor-pointer text-red-600 hover:underline"
              @click="handleDeleteCategory(category.id)"
            >
              刪除
            </button>
          </td>
        </tr>
        <tr v-if="filteredCategories.length === 0">
          <td colspan="3" class="py-4 text-center text-gray-500">找不到符合的分類</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
