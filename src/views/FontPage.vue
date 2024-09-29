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
import { useFetch } from '@vueuse/core'
import { onMounted, ref } from 'vue'

// // 取得集合中的所有文件
// getDocs(fontCollection)
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, ' => ', doc.get('name'))
//     })
//   })
//   .catch((error) => {
//     console.error('無法取得資料: ', error)
//   })
const fontCollection = collection(db, 'fonts')

const imgRefs = await list(getStorageRef(storage, 'images'), { maxResults: 100 })
const imgUrls = await Promise.all(imgRefs.items.map((item) => getDownloadURL(item)))
</script>

<template>
  <div>
    <div>{{ imgUrls }}</div>
    <!-- <div v-for="(item, index) in imageUrls" :key="index">{{ item }}</div> -->
    <h3 class="text-3xl font-semibold text-[#755540]">免費字體</h3>
    <div
      class="flex flex-col gap-y-2 max-w-2xl mt-4 px-5 py-6 text-[#755540] bg-white rounded-md shadow-sm"
    >
      <div>1. 你可以透過資源類型篩選來查詢需要的字體資源</div>
      <div>2. 另有些字體為簡中或日文字體，會有缺字的問題，使用時請考慮使用情境</div>
      <div>3. 各種字體的使用規範請依照各字體網站詳細說明為準</div>
    </div>

    <div class="flex mt-8 gap-4 flex-wrap">
      <ResourceFilter />
      <ResourceFilter />

      <ResourceFilter />

      <ResourceFilter />

      <ResourceFilter />
      <ResourceFilter />
    </div>

    <div class="flex flex-col mt-4">
      <div class="py-2 -my-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ResourceItem v-for="(imgUrl, index) in imgUrls" :key="index" :img-url="imgUrl" />
        </div>
      </div>
    </div>
  </div>
</template>
