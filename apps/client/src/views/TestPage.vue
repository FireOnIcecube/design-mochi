<template>
  <SearchForm :filterConfig="filterConfig" :modelValue="filterModel" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import SearchForm from '@client/components/SearchForm.vue'

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
</script>
