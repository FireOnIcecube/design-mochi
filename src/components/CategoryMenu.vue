<script setup lang="tsx">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
const isCategoryOpen = ref(false)

const toggleCategoryMenu = () => {
  isCategoryOpen.value = !isCategoryOpen.value
}

const categories = ref([
  { name: '分類一', items: ['項目 A', '項目 B'] },
  { name: '分類二', items: ['項目 A'] },
  { name: '分類三', items: ['項目 A', '項目 B', '項目 C'] },
  { name: '分類四', items: ['項目 A'] },
  { name: '分類五', items: ['項目 A', '項目 B', '項目 C', '項目 D'] },
  { name: '分類六', items: ['項目 A'] },
  { name: '分類七', items: ['項目 A', '項目 B'] },
  { name: '分類八', items: ['項目 A', '項目 B', '項目 C'] }
])
</script>

<template>
  <div class="bg-surface dark:bg-surface-dark transition-theme shadow-md">
    <div class="mx-auto flex max-w-screen-xl justify-center">
      <div class="flex flex-nowrap gap-[2vw] p-2">
        <div v-for="(category, index) in categories" :key="index" class="shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger> {{ category.name }} </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- <div
            class="text-content dark:text-content-dark shrink-0 cursor-pointer px-4 py-2 text-lg font-bold transition-transform ease-out hover:scale-95 hover:text-blue-600 active:scale-90 dark:hover:text-blue-600"
          >
            {{ category.name }}
          </div> -->
        </div>
      </div>

      <div
        class="group ml-8 flex cursor-pointer items-center justify-center bg-gray-200 px-6 dark:bg-gray-800"
      >
        <Icon
          icon="ion:search"
          width="1.8em"
          height="1.8em"
          class="translate-transform text-content dark:text-content-dark duration-150 ease-out group-hover:scale-110"
        />
      </div>
    </div>

    <!-- 手機版分類選單 -->
    <transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="isCategoryOpen" class="flex flex-col space-y-2 bg-white p-4 shadow-md md:hidden">
        <a href="#" class="border-b py-2">字體</a>
        <a href="#" class="border-b py-2">設計素材</a>
        <a href="#" class="border-b py-2">YouTube 縮圖</a>
      </div>
    </transition>
  </div>
</template>
