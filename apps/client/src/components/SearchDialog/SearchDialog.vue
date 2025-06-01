<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@client/components/ui/dialog'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@client/components/ui/tabs'

import { Button } from '@client/components/ui/button'
import { Search } from 'lucide-vue-next'
import { Input } from '@client/components/ui/input'
import { Checkbox } from '@client/components/ui/checkbox'

const isOpen = ref(false)
const toggleDialog = () => {
  isOpen.value = !isOpen.value
}

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

        <!-- Checkbox Group -->
        <Tabs :default-value="categories[0].key" class="mt-12 grow gap-0 overflow-x-hidden">
          <TabsList
            class="max-h-1/2 mx-auto flex h-auto max-w-full flex-wrap justify-start gap-2 overflow-x-auto p-0 xl:flex-nowrap"
          >
            <TabsTrigger
              v-for="(category, index) in categories"
              :key="index"
              :value="category.key"
              class="font-notosans dark:data-[state=active]:bg-background rounded-b-none border-b-0 p-5"
            >
              <div class="flex space-x-2">
                <label class="leading-none">{{ category.label }}</label>
                <Checkbox disabled class="disabled:cursor-default disabled:opacity-100" />
              </div>
            </TabsTrigger>
          </TabsList>

          <div class="border-outline dark:border-outline-dark w-full grow overflow-y-auto border-2">
            <TabsContent
              v-for="(category, index) in categories"
              :key="index"
              :value="category.key"
              class="h-full"
            >
              <div class="mx-auto h-full overflow-y-auto px-6 py-12 xl:w-3/4">
                <div class="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
                  <div class="col-span-full flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      for="terms"
                      class="lg:text-md font-notosans text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 xl:text-lg"
                    >
                      全選
                    </label>
                  </div>
                  <div
                    v-for="(option, optionIndex) in category.options"
                    :key="optionIndex"
                    class="flex items-center space-x-2"
                  >
                    <Checkbox :id="option.value" />
                    <label
                      :for="option.value"
                      class="lg:text-md font-notosans text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 xl:text-lg"
                    >
                      {{ option.label }}
                    </label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <DialogFooter class="p-6 pt-0">
        <DialogTrigger asChild>
          <Button type="submit" @click="toggleDialog"> Save changes </Button></DialogTrigger
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
