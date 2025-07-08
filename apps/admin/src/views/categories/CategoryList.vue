<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { db } from '@pkg/firebase/index'
import type { ThumbnailCategory } from '@pkg/firebase/db/types'
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { thumbnailConverter } from '@pkg/firebase/db/entities/thumbnailCategory'
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue'
import CategoryCreateModal from '@admin/components/CategoryCreateModal.vue'

const docRef = collection(db, 'thumbnail_categories').withConverter(thumbnailConverter)

const thumbnailCategories = ref<ThumbnailCategory[]>([])

async function fetchCategories() {
  try {
    const q = query(docRef, orderBy('createdAt', 'asc'))
    const categories = await getDocs(q)
    thumbnailCategories.value = categories.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      }
    })
    console.log(
      'Categories fetched:',
      categories.docs.map((doc) => doc.data()),
    )
  } catch (error) {
    alert('無法載入分類資料，請稍後再試。')
    console.error('Error fetching categories:', error)
  }
}

async function handleCategoryCreate(formData: { name: string; slug: string }) {
  try {
    await addDoc(docRef, {
      ...formData,
      createdAt: serverTimestamp(),
    })
    await fetchCategories()
  } catch (error) {
    alert('無法創建封面類別，請稍後再試。')
    console.error('Error create categories:', error)
  }
}

onMounted(() => {
  fetchCategories()
})

const searchTerm = ref('')

const filteredCategories = computed(() => {
  return thumbnailCategories.value.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.value.toLowerCase().trim()),
  )
})

function openCreateModal() {
  alert('打開新增分類 Modal')
}

function editCategory(category: ThumbnailCategory) {
  alert(`編輯分類: ${category.name}`)
}

function deleteCategory(id) {
  if (confirm('確定要刪除這個分類嗎？')) {
    thumbnailCategories.value = thumbnailCategories.value.filter((cat) => cat.id !== id)
  }
}
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
      <CategoryCreateModal @submit="handleCategoryCreate" />
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
        <tr>
          <th class="border-b px-4 py-2 text-left">名稱</th>
          <th class="border-b px-4 py-2 text-left">識別名(用於網址，必須唯一)</th>
          <th class="border-b px-4 py-2 text-right">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in filteredCategories" :key="category.id">
          <td class="border-b px-4 py-2">{{ category.name }}</td>
          <td class="border-b px-4 py-2">{{ category.slug }}</td>
          <td class="flex justify-end gap-2 border-b px-4 py-2">
            <button
              class="cursor-pointer text-blue-600 hover:underline"
              @click="editCategory(category)"
            >
              編輯
            </button>
            <button
              class="cursor-pointer text-red-600 hover:underline"
              @click="deleteCategory(category.id)"
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
