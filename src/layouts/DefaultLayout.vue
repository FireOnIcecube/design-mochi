<script setup lang="tsx">
import NavHeader from '@/components/NavHeader.vue'
import CategoryMenu from '@/components/CategoryMenu.vue'
import WebFooter from '@/components/WebFooter.vue'
import SearchBar from '@/components/SearchBar.vue'
import TopButton from '@/components/TopButton.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 border-b px-4 lg:static lg:p-4 dark:border-gray-700">
      <NavHeader />
    </header>

    <section class="sticky top-0 z-10 hidden lg:block">
      <CategoryMenu />
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
    <footer class="border-outline dark:border-outline-dark mt-20 border-t">
      <WebFooter />
    </footer>
  </div>
</template>
