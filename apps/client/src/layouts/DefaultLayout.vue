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
      { id: 1, label: '遊戲實況', value: 'gaming' },
      { id: 2, label: '日常雜談', value: 'talk' },
      { id: 3, label: '音樂 / Cover', value: 'music' },
      { id: 4, label: '開箱 / 評測', value: 'review' },
      { id: 5, label: '教學 / 知識型', value: 'education' },
      { id: 6, label: '節目單元 / 特輯', value: 'program' },
      { id: 7, label: '搞笑 / 創意短片', value: 'comedy' }
    ]
  },
  {
    key: 'STYLE',
    label: '設計風格',
    options: [
      { id: 1, label: '極簡', value: 'minimal' },
      { id: 2, label: '插畫風', value: 'illustration' },
      { id: 3, label: '潮流感', value: 'trendy' },
      { id: 4, label: '寫實風', value: 'realistic' },
      { id: 5, label: '拼貼風', value: 'collage' },
      { id: 6, label: '漫畫風', value: 'comic' },
      { id: 7, label: '手寫字感', value: 'handwritten' }
    ]
  },
  {
    key: 'COLOR',
    label: '主色調',
    options: [
      { id: 1, label: '紅色', value: 'red' },
      { id: 2, label: '藍色', value: 'blue' },
      { id: 3, label: '黑白灰', value: 'mono' },
      { id: 4, label: '霓虹色系', value: 'neon' },
      { id: 5, label: '馬卡龍', value: 'pastel' },
      { id: 6, label: '大地色系', value: 'earth' }
    ]
  },
  {
    key: 'SHAPE',
    label: '構圖樣式',
    options: [
      { id: 1, label: '大頭特寫', value: 'closeup' },
      { id: 2, label: '左右分割', value: 'split' },
      { id: 3, label: '中置角色', value: 'center' },
      { id: 4, label: '多圖拼貼', value: 'multi' },
      { id: 5, label: '標題主導', value: 'text-heavy' }
    ]
  },
  {
    key: 'MEDIA',
    label: '素材類型',
    options: [
      { id: 1, label: '靜態圖', value: 'image' },
      { id: 2, label: '動圖 / 動態封面', value: 'animated' },
      { id: 3, label: '影片頭圖', value: 'video' }
    ]
  },
  {
    key: 'CREATOR_TYPE',
    label: '創作者類型',
    options: [
      { id: 1, label: 'Vtuber', value: 'vtuber' },
      { id: 2, label: '實體 Youtuber', value: 'human' },
      { id: 3, label: '企業品牌', value: 'brand' }
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
