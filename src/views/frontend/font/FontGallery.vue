<script setup lang="ts">
import ResourceItem from '@/components/ResourceItem.vue'
import ResourceFilter from '@/components/ResourceFilter.vue'
import { db } from '@/firebase'
import { fetchFontList } from '@/firebase/db/entities/font'
import { onMounted, ref } from 'vue'
import type { Font } from '@/firebase/db/types'

const items = ref<Font[]>([])
const isLoading = ref(false)

const fetchData = async () => {
  try {
    isLoading.value = true
    items.value = await fetchFontList(db)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch data')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <h3 class="text-3xl font-semibold text-[#755540]">免費字體</h3>
    <div
      class="flex flex-col gap-y-2 max-w-2xl mt-4 px-5 py-6 text-[#755540] bg-white rounded-md shadow-sm"
    >
      <p>1. 你可以透過資源類型篩選來查詢需要的字體資源</p>
      <p>2. 另有些字體為簡中或日文字體，會有缺字的問題，使用時請考慮使用情境</p>
      <p>3. 各種字體的使用規範請依照各字體網站詳細說明為準</p>
    </div>

    <div class="flex mt-8 gap-4 flex-wrap"></div>

    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="(item, index) in items" :key="index">
        <router-link :to="{ name: 'FontInfo', params: { id: item.id } }">
          <ResourceItem :title="item.name" :img-url="item.coverUrl" :type="item.type"
        /></router-link>
      </div>
    </div>
  </div>
</template>
