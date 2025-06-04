<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import FilterTab from './FilterTab.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@client/components/ui/dialog'

import { Button } from '@client/components/ui/button'
import { Filter, Search } from 'lucide-vue-next'
import { Input } from '@client/components/ui/input'

const isOpen = ref(false)
const toggleDialog = () => {
  isOpen.value = !isOpen.value
}

//
// const isAllChecked = (options: (typeof categories)[number]['options']) =>
//   options.every((i) => i.checked)
// const isSomeChecked = (options: (typeof categories)[number]['options']) =>
//   options.some((i) => i.checked) && !isAllChecked(items)

// mockFilterData
const categories = [
  {
    key: 'CATEGORY',
    label: '分類',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' }
    ]
  },
  {
    key: 'TASTE',
    label: '特色',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' }
    ]
  },
  {
    key: 'TOPIC',
    label: '主題',
    options: [
      { label: 'X', value: 'X' },
      { label: 'Y', value: 'Y' }
    ]
  },
  {
    key: 'SHAPE',
    label: '形狀',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' }
    ]
  },
  {
    key: 'COLOR',
    label: '顏色',
    options: [
      { label: '紅色', value: 'red' },
      { label: '藍色', value: 'blue' },
      { label: '綠色', value: 'green' }
    ]
  },
  {
    key: 'MEDIA',
    label: '媒體',
    options: [
      { label: '測試項目 A', value: 'A' },
      { label: '測試項目 B', value: 'B' },
      { label: '測試項目 C', value: 'C' },
      { label: '測試項目 D', value: 'D' },
      { label: '測試項目 E', value: 'E' },
      { label: '測試項目 F', value: 'F' }
    ]
  },
  {
    key: 'RANKING',
    label: '排行',
    options: [
      { label: 'Top 1', value: '1' },
      { label: 'Top 2', value: '2' }
    ]
  }
]
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <div @click="toggleDialog" class="p-4">
        <Icon
          icon="ion:search"
          width="1.8rem"
          height="1.8rem"
          class="translate-transform text-content dark:text-content-dark select-none duration-150 ease-out group-hover:scale-105"
        />
      </div>
    </DialogTrigger>
    <DialogContent
      class="md:max-w-2/3 min-h-2/3 max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] p-0 sm:max-w-[425px]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-3xl">尋找封面</DialogTitle>
        <!-- <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> -->
      </DialogHeader>
      <div class="flex flex-col gap-4 overflow-y-auto px-6 py-4">
        <!-- Search Input -->
        <div class="mx-auto flex w-full max-w-sm items-center justify-center gap-1.5">
          <div class="relative w-full max-w-sm items-center">
            <Input id="search" type="text" placeholder="Search..." class="pl-10" />
            <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
              <Search class="text-muted-foreground size-6" />
            </span>
          </div>

          <Button type="submit" class="font-notosans text-md tracking-widest">搜尋</Button>
        </div>

        <FilterTab :categories="categories" class="mt-12 grow gap-0" />
      </div>

      <!-- <DialogFooter class="p-6 pt-0">
        <DialogTrigger asChild>
          <Button type="submit" @click="toggleDialog"> Save changes </Button></DialogTrigger
        >
      </DialogFooter> -->
    </DialogContent>
  </Dialog>
</template>
