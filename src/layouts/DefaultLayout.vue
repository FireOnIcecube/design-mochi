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
      <NavHeader />
    </header>

    <!-- <section class="bg-blue-500 px-6 py-12 text-center text-white">
    <h1 class="text-3xl font-bold md:text-5xl">設計封面</h1>
    <p class="mt-2 text-lg md:text-xl">提升點擊率！從最佳封面設計中獲取靈感</p>
  </section> -->
    <!-- <TopButton /> -->

    <main class="flex-grow">
      <section class="sticky top-0 z-10 hidden lg:block 3xl:mb-20">
        <CategoryMenu />

        <!-- <SearchBar /> -->
      </section>

      <div class="container mx-auto mt-10">
        <router-view />
        <Drawer />
      </div>
    </main>
    <footer class="mt-20 bg-gray-900 py-6 text-white">
      <div class="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        <p class="text-sm">© 2025 Design-Mochi</p>
        <div class="mt-4 flex space-x-4 md:mt-0">
          <a href="#" class="hover:underline">關於本站</a>
          <a href="#" class="hover:underline">聯絡我們</a>
        </div>
      </div>
    </footer>
  </div>
</template>
