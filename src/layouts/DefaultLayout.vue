<script setup lang="tsx">
import NavHeader from '@/components/NavHeader.vue'
</script>

<template>
  <header>
    <NavHeader />
    <!-- <MegaMenu /> -->
  </header>

  <section class="bg-blue-500 px-6 py-12 text-center text-white">
    <h1 class="text-3xl font-bold md:text-5xl">設計封面</h1>
    <p class="mt-2 text-lg md:text-xl">提升點擊率！從最佳封面設計中獲取靈感</p>
  </section>

  <div class="flex">
    <!-- 主要內容區: 使用 container -->
    <main class="flex-1 bg-gray-100">
      <div class="container mx-auto p-4">
        <h1 class="mb-4 text-2xl font-bold">主要內容</h1>
        <p>這裡是主要內容區，使用 container 來保持內容居中。</p>

        <router-view />
      </div>
    </main>
  </div>
</template>
