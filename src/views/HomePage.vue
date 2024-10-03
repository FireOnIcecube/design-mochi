<script setup lang="tsx">
import NavItem from '@/components/NavItem.vue'
import { resourceData } from '@/composables/useResourceData'
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'

const navItems: { title: string; primaryColor: string; icon: string; routeName: string }[] = [
  {
    title: '字體資源',
    primaryColor: 'bg-sky-500',
    //icon: 'ic:round-font-download',
    icon: 'mingcute:text-2-fill',
    routeName: 'FontFamilies'
  },
  {
    title: '字卡資源',
    primaryColor: 'bg-red-500',
    // icon: 'icon-park-solid:text',

    icon: 'mingcute:text-2-fill',
    routeName: 'TextTemplates'
  },
  {
    title: '封面資源',
    primaryColor: 'bg-yellow-500',
    icon: 'gravity-ui:picture',
    routeName: 'Thumbnails'
  }
]

const hoveredItem = ref<{
  title: string
  primaryColor: string
  icon: string
} | null>(null)
</script>

<template>
  <div class="flex flex-col flex-1 relative overflow-hidden">
    <header class="mt-4 mx-10 md:mx-15 lg:mx-20 flex justify-end gap-6 z-10">
      <router-link to="/font-families">
        <div
          :class="hoveredItem ? 'text-white' : 'text-black'"
          class="font-bold duration-300 transition-all"
        >
          進入網站
        </div>
      </router-link>
      <!-- <div :class="hoveredItem ? 'text-white' : 'text-black'" class="font-bold">進入網站</div> -->
    </header>

    <div class="flex flex-row flex-1">
      <div class="flex flex-col justify-center gap-8">
        <NavItem
          v-for="(item, index) in navItems"
          :key="index"
          :title="item.title"
          :primaryColor="item.primaryColor"
          :icon="item.icon"
          :routeName="item.routeName"
          @mouseenter="hoveredItem = item"
          @mouseleave="hoveredItem = null"
        />
      </div>

      <div class="container flex items-center justify-center">
        <span v-motion-fade>
          <h1 class="text-9xl md:text-[14rem] inline-block text-black font-mantou">設計</h1>

          <div class="relative inline-block">
            <span
              :class="[
                hoveredItem?.primaryColor ?? 'bg-transparent',
                { 'scale-[40]': hoveredItem }
              ]"
              class="absolute top-1/2 left-1/2 -z-10 transform -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full transition-all duration-[600ms] opacity-50"
            ></span>
            <h1
              v-if="hoveredItem"
              v-motion-slide-visible-bottom
              class="text-9xl md:text-[14rem] inline-block text-white font-mantou"
            >
              {{ hoveredItem.title.slice(0, 2) }}
            </h1>
            <h1
              v-else
              v-motion-slide-visible-top
              :delay="200"
              class="text-9xl md:text-[14rem] inline-block text-black font-mantou"
            >
              麻糬
            </h1>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
