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
      { id: 1, label: 'A', value: 'A' },
      { id: 2, label: 'B', value: 'B' },
      { id: 3, label: 'C', value: 'C' }
    ]
  },
  {
    key: 'TASTE',
    label: '特色',
    options: [
      { id: 1, label: 'A', value: 'A' },
      { id: 2, label: 'B', value: 'B' }
    ]
  },
  {
    key: 'TOPIC',
    label: '主題',
    options: [
      { id: 1, label: 'X', value: 'X' },
      { id: 2, label: 'Y', value: 'Y' }
    ]
  },
  {
    key: 'SHAPE',
    label: '形狀',
    options: [
      { id: 1, label: 'A', value: 'A' },
      { id: 2, label: 'B', value: 'B' }
    ]
  },
  {
    key: 'COLOR',
    label: '顏色',
    options: [
      { id: 1, label: '紅色', value: 'red' },
      { id: 2, label: '藍色', value: 'blue' },
      { id: 3, label: '綠色', value: 'green' }
    ]
  },
  {
    key: 'MEDIA',
    label: '媒體',
    options: [
      { id: 1, label: '測試項目 A', value: 'A' },
      { id: 2, label: '測試項目 B', value: 'B' },
      { id: 3, label: '測試項目 C', value: 'C' },
      { id: 4, label: '測試項目 D', value: 'D' },
      { id: 5, label: '測試項目 E', value: 'E' },
      { id: 6, label: '測試項目 F', value: 'F' }
    ]
  },
  {
    key: 'RANKING',
    label: '排行',
    options: [
      { id: 1, label: 'Top 1', value: '1' },
      { id: 2, label: 'Top 2', value: '2' }
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
