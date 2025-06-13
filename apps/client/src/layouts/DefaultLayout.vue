<script setup lang="tsx">
import NavHeader from '@client/components/NavHeader.vue'
import CategoryMenu from '@client/components/CategoryMenu.vue'
import WebFooter from '@client/components/WebFooter.vue'
import SearchBar from '@client/components/SearchBar.vue'
import TopButton from '@client/components/TopButton.vue'

const filters = [
  {
    key: 'CATEGORY',
    label: '分類',
    options: [
      { id: 1, label: '科技產品', value: 'tech' },
      { id: 2, label: '生活用品', value: 'life' },
      { id: 3, label: '藝術設計', value: 'design' }
    ]
  },
  {
    key: 'TASTE',
    label: '特色',
    options: [
      { id: 1, label: '極簡風', value: 'minimal' },
      { id: 2, label: '繽紛活潑', value: 'colorful' }
    ]
  },
  {
    key: 'TOPIC',
    label: '主題',
    options: [
      { id: 1, label: '教育', value: 'education' },
      { id: 2, label: '娛樂', value: 'entertainment' },
      { id: 3, label: '旅遊', value: 'travel' }
    ]
  },
  {
    key: 'SHAPE',
    label: '形狀',
    options: [
      { id: 1, label: '方形', value: 'square' },
      { id: 2, label: '圓形', value: 'circle' }
    ]
  },
  {
    key: 'COLOR',
    label: '顏色',
    options: [
      { id: 1, label: '紅色', value: 'red' },
      { id: 2, label: '藍色', value: 'blue' },
      { id: 3, label: '綠色', value: 'green' },
      { id: 4, label: '黑色', value: 'black' }
    ]
  },
  {
    key: 'MEDIA',
    label: '媒體類型',
    options: [
      { id: 1, label: '圖片', value: 'image' },
      { id: 2, label: '影片', value: 'video' },
      { id: 3, label: '動畫', value: 'animation' }
    ]
  },
  {
    key: 'RANKING',
    label: '排行',
    options: [
      { id: 1, label: '熱門', value: 'popular' },
      { id: 2, label: '最新', value: 'newest' }
    ]
  }
]
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="border-b px-4 lg:p-4 dark:border-gray-700">
      <NavHeader />
    </header>

    <section class="sticky top-0 z-10 hidden xl:block">
      <CategoryMenu :filters="filters" />
    </section>

    <!-- Banner 暫不啟用-->

    <!-- <section class="bg-blue-500 px-6 py-12 text-center text-white">
    <h1 class="text-3xl font-bold md:text-5xl">設計封面</h1>
    <p class="mt-2 text-lg md:text-xl">提升點擊率！從最佳封面設計中獲取靈感</p>
  </section> -->

    <main class="3xl:mt-20 grow">
      <div class="container mx-auto mt-10">
        <router-view />
      </div>
    </main>
    <footer class="border-outline dark:border-outline-dark mt-20 border-t bg-gray-900">
      <WebFooter />
    </footer>
  </div>
</template>
