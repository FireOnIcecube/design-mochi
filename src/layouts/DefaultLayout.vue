<script setup lang="tsx">
import NavHeader from '@/components/NavHeader.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'
import WebFooter from '@/components/WebFooter.vue'
import SearchBar from '@/components/SearchBar.vue'
import Drawer from '@/components/SearchDrawer.vue'
import TopButton from '@/components/TopButton.vue'
</script>

<template>
  <header>
    <NavHeader />
  </header>

  <!-- <section class="bg-blue-500 px-6 py-12 text-center text-white">
    <h1 class="text-3xl font-bold md:text-5xl">設計封面</h1>
    <p class="mt-2 text-lg md:text-xl">提升點擊率！從最佳封面設計中獲取靈感</p>
  </section> -->
  <!-- <TopButton /> -->

  <main>
    <section class="mb-20">
      <CategoryMenu />
      <!-- <SearchBar /> -->
    </section>

    <div class="container mx-auto">
      <router-view />
      <Drawer />
    </div>
  </main>
  <!-- <footer>
    <WebFooter />
  </footer> -->
</template>
