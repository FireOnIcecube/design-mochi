<script setup lang="tsx">
import { ref } from 'vue'

const categories = ['电子产品', '服饰', '家居', '运动', '图书']
const selectedCategories = ref([])
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <label
      v-for="category in categories"
      :key="category"
      class="flex cursor-pointer items-center space-x-2 rounded-lg border px-3 py-1"
      :class="{ 'bg-blue-500 text-white': selectedCategories.includes(category) }"
    >
      <input type="checkbox" :value="category" v-model="selectedCategories" class="hidden" />
      <span>{{ category }}</span>
    </label>
  </div>

  <div class="mt-4">
    <p>已选择分类: {{ selectedCategories.join(', ') || '无' }}</p>
  </div>
</template>

<style scoped>
/* 额外的样式（可选） */
</style>
