<script setup lang="tsx">
import { ref, computed } from 'vue'

// 關鍵字和選擇的 tags
const keyword = ref('')
const selectedTags = ref([[], [], []]) // 假設有 3 個 selector

// 模擬的每個 selector 的 tag 列表
const selectors = [
  ['JavaScript', 'Vue 3', 'CSS', 'HTML'],
  ['React', 'Node.js', 'Python', 'Go'],
  ['SQL', 'MongoDB', 'Firebase', 'MySQL']
]

// 顯示所有選擇的 tags
const allSelectedTags = computed(() => {
  return selectedTags.value.flat()
})

// 最終查詢物件
const query = ref<{ keyword: string; tags: string[] } | null>(null)

// 提交查詢的函數
const submitQuery = () => {
  query.value = {
    keyword: keyword.value,
    tags: allSelectedTags.value
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- 關鍵字搜尋 input -->
    <div class="flex items-center space-x-4">
      <input
        v-model="keyword"
        type="text"
        placeholder="搜尋關鍵字"
        class="focus:outline-hidden rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- 多個多選 selector -->
    <div v-for="(options, index) in selectors" :key="index" class="flex flex-col space-y-2">
      <label :for="'selector-' + index" class="font-medium">選擇類別 {{ index + 1 }}</label>
      <select
        v-model="selectedTags[index]"
        multiple
        :id="'selector-' + index"
        class="focus:outline-hidden rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500"
      >
        <option v-for="tag in options" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>

    <!-- 顯示選擇的 tags -->
    <div class="flex space-x-2">
      <span
        v-for="(tag, index) in allSelectedTags"
        :key="index"
        class="rounded-md bg-blue-100 px-2 py-1 text-blue-600"
      >
        {{ tag }}
      </span>
    </div>

    <!-- 查詢按鈕 -->
    <button
      @click="submitQuery"
      class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      搜尋
    </button>
  </div>

  <!-- 顯示最終查詢 -->
  <div v-if="query" class="mt-4">
    <h3>最終查詢:</h3>
    <p><strong>關鍵字:</strong> {{ query.keyword }}</p>
    <p><strong>選擇的 Tags:</strong> {{ query.tags.join(', ') }}</p>
  </div>
</template>

<style scoped>
/* Tailwind CSS 已經提供了很多樣式 */
</style>
