<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
// import SearchForm from '@client/components/SearchForm.vue'

import { storage } from '../firebase'
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes
} from 'firebase/storage'
import imageCompression from 'browser-image-compression'

// ✅ 從資料庫取得的篩選欄位與對應選項
const filterConfig = [
  {
    key: 'category',
    label: '分類',
    options: [
      { label: '水果', value: 'fruit' },
      { label: '蔬菜', value: 'veg' },
      { label: '飲料', value: 'drink' }
    ]
  },
  {
    key: 'ranking',
    label: '排名',
    options: [
      { label: 'Top 1', value: 'top1' },
      { label: 'Top 2', value: 'top2' }
    ]
  }
]

const route = useRoute()
const router = useRouter()

// ✅ 將 URL query → 轉為完整 model 物件（用於表單初始化）
const filterModel = computed(() => {
  const q = route.query
  const model = {}
  for (const { key } of filterConfig) {
    const raw = q[key]
    if (raw) {
      model[key] = Array.isArray(raw) ? raw : [raw]
    } else {
      model[key] = []
    }
  }
  return model
})

// ✅ 處理送出 → 更新 URL query
const handleSubmit = (model) => {
  const newQuery = {}
  for (const key in model) {
    const arr = model[key]
    if (arr.length) {
      newQuery[key] = arr
    }
  }
  router.push({ query: newQuery })
}

// 上傳圖片
const selectedFile = ref<File | null>(null)
const imgUrl = ref<String>('')
const previewUrl = ref<string>('')

function handleChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    URL.revokeObjectURL(previewUrl.value)

    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(selectedFile.value)
  }
}

async function uploadImage() {
  if (!selectedFile.value) return

  try {
    const filename = selectedFile.value.name
    const fileRef = storageRef(storage, `uploads/${filename}`)
    const snapshot = await uploadBytes(fileRef, selectedFile.value)

    console.log('Uploaded!', snapshot.ref)
    imgUrl.value = await getDownloadURL(snapshot.ref)
  } catch (err) {
    console.error('上傳圖片失敗: ', err)
  }
}
</script>

<template>
  <!-- <SearchForm :filterConfig="filterConfig" :modelValue="filterModel" @submit="handleSubmit" /> -->
  <hr />

  <div class="mt-20 space-y-4 p-4">
    <h1 class="text-xl font-bold">圖片上傳 MVP</h1>
    <input accept="image/*" type="file" @change="handleChange" />
    <button
      :disabled="!selectedFile"
      class="rounded bg-green-500 px-4 py-2 text-white"
      @click="uploadImage"
    >
      上傳
    </button>

    <img :src="previewUrl" />
  </div>
</template>
