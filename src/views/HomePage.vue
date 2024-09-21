<script setup lang="tsx">
import NavItem from '@/components/NavItem.vue'
import { Icon } from '@iconify/vue'

const navItems: { title: string; primaryColor: string; icon: string }[] = [
  {
    title: '字體資源',
    primaryColor: 'bg-sky-500',
    icon: 'ic:round-font-download'
  },
  {
    title: '字卡資源',
    primaryColor: 'bg-red-500',
    icon: 'ic:round-font-download'
  },
  {
    title: '封面資源',
    primaryColor: 'bg-yellow-500',
    icon: 'ic:round-font-download'
  }
]
</script>

<template>
  <div class="flex flex-col flex-1 relative overflow-hidden">
    <header class="mt-4 mx-10 md:mx-15 lg:mx-20 flex justify-end gap-6 z-10">
      <router-link to="/fonts"> <div class="font-bold">進入網站</div> </router-link>
      <div class="font-bold">關於我們</div>
    </header>

    <div class="flex flex-row flex-1">
      <div class="flex flex-col justify-center gap-8">
        <!-- <div
          class="flex items-center justify-end gap-2 py-2.5 px-4 z-10 bg-sky-500 rounded-r-full cursor-pointer peer"
        >
          <div class="text-white font-semibold tracking-wide text-lg lg:text-xl">字體資源</div>

          <Icon icon="ic:round-font-download" class="text-white text-6xl lg:text-4xl" />
        </div> -->

        <NavItem
          v-for="(item, index) in navItems"
          :key="index"
          :title="item.title"
          :primaryColor="item.primaryColor"
          :icon="item.icon"
        />

        <span
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-transparent transition-all duration-500 peer-hover:bg-red-500 peer-hover:opacity-50 peer-hover:scale-[30]"
        ></span>

        <!-- <div
         peer-hover:bg-[#b3d3e7]
          class="flex items-center justify-end bg-[#F8C1E1] w-16 h-16 rounded-r-full cursor-pointer"
        ></div>

        <div
          class="flex items-center justify-end bg-[#F0E4CB] w-16 h-16 rounded-r-full cursor-pointer"
        ></div>
        <div
          class="flex items-center justify-end bg-[#ED1C24] w-16 h-16 rounded-r-full cursor-pointer"
        ></div>
        <div
          class="flex items-center justify-end bg-[#82B8D9] w-16 h-16 rounded-r-full cursor-pointer"
        ></div> -->
      </div>

      <div class="container flex items-center justify-center">
        <span v-motion-fade>
          <h1 class="text-9xl font-[900] md:text-[12rem] inline-block text-white">你好</h1>
          <h1 class="text-9xl font-[900] md:text-[12rem] inline-block">世界</h1>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
