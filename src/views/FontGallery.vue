<script setup lang="ts">
import ResourceItem from '@/components/ResourceItem.vue'
import ResourceFilter from '@/components/ResourceFilter.vue'
import { db, storage } from '@/firebase/index'
import {
  getDownloadURL,
  ref as getStorageRef,
  list,
  listAll,
  type StorageReference
} from 'firebase/storage'
import { collection, getDocs } from 'firebase/firestore'
import { resourceData } from '@/stores/resourceStore'
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

    <div class="flex mt-8 gap-4 flex-wrap">
      <!-- <ResourceFilter />
      <ResourceFilter /> -->
    </div>

    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="(data, index) in resourceData.fonts" :key="index">
        <router-link :to="{ name: 'FontInfo', params: { id: data.id } }">
          <ResourceItem :title="data.name" :img-url="data.cover_url" :type="data.type"
        /></router-link>
      </div>
    </div>
  </div>
</template>
