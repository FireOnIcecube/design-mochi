<script setup lang="tsx">
import NavHeader from '@/components/NavHeader.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'
import WebFooter from '@/components/WebFooter.vue'
import SearchBar from '@/components/SearchBar.vue'
import Drawer from '@/components/SearchDrawer.vue'
import TopButton from '@/components/TopButton.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header>
      <section class="border-b p-4 dark:border-gray-700"><NavHeader /></section>

      <section class="3xl:mb-20 sticky top-0 z-10 hidden lg:block">
        <CategoryMenu />

        <!-- <SearchBar /> -->
      </section>
    </header>

    <!-- <section class="bg-blue-500 px-6 py-12 text-center text-white">
    <h1 class="text-3xl font-bold md:text-5xl">設計封面</h1>
    <p class="mt-2 text-lg md:text-xl">提升點擊率！從最佳封面設計中獲取靈感</p>
  </section> -->

    <main class="grow">
      <div class="container mx-auto mt-10">
        <router-view />
        <Drawer />
      </div>
    </main>
    <footer
      class="border-outline dark:border-outline-dark mt-20 border-t bg-gray-900 py-6 text-white"
    >
      <div class="container mx-auto grid grid-cols-1 items-center px-4 md:grid-cols-3">
        <p class="justify-self-center text-sm lg:justify-self-start">© 2025 Design Mochi</p>
        <!-- <div class="mt-4 flex justify-center space-x-4 md:mt-0">
          <a href="#" class="hover:underline">關於本站</a>
          <a href="#" class="hover:underline">聯絡我們</a>
        </div> -->
      </div>
    </footer>
  </div>
</template>
