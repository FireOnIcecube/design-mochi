<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import FilterTab from './FilterTab.vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@admin/components/ui/dialog'

import { DialogClose } from 'reka-ui'

import { FormControl, FormField, FormItem, FormMessage } from '@admin/components/ui/form'

import { Button } from '@admin/components/ui/button'
import { Search } from 'lucide-vue-next'
import { Input } from '@admin/components/ui/input'
import { useRouter } from 'vue-router'
import { ThumbnailCategory } from '@/packages/types'

const props = defineProps<{
  thumbnailCategories: ThumbnailCategory[]
}>()

const router = useRouter()

// dialog 的開關
const isOpen = ref(false)
const toggleDialog = () => {
  isOpen.value = !isOpen.value
}

// 初始化表單上的輸入欄位
const keyword = ref('')

function handleSubmit() {
  console.log('Form submitted!')
  console.info(`keyword : ${keyword.value}`)
  console.info(`selectedTags : ${JSON.stringify(selectedTags)} `)
  router.push({ name: 'ThumbnailList', query: { keyword: keyword.value, ...selectedTags } })
}

const selectedTags = reactive<Record<string, string[]>>({})

function updateSelectedTags(val: Record<string, string[]>) {
  Object.assign(selectedTags, val)
}

// 同步表單和 url query 的值

// 用於顯示用戶選項的 ui ，暫不使用
// const selectedTagList = computed(() => {
//   const result: { key: string; label: string }[] = []
//   for (const category of categories) {
//     const ids = selectedTags[category.key] || []
//     if (ids.length === category.options.length) {
//       result.push({ key: category.key, label: '全選' })
//       continue
//     }
//     for (const id of ids) {
//       const label = category.options.find((opt) => opt.id === id)?.label
//       if (label) result.push({ key: category.key, label })
//     }
//   }
//   return result
// })
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <div @click="toggleDialog" class="p-4">
        <Icon
          icon="ion:search"
          width="1.8rem"
          height="1.8rem"
          class="translate-transform text-content dark:text-content-dark duration-150 ease-out select-none group-hover:scale-105"
        />
      </div>
    </DialogTrigger>
    <DialogContent
      class="max-h-[90dvh] min-h-2/3 grid-rows-[auto_minmax(0,1fr)_auto] p-0 sm:max-w-[425px] md:max-w-2/3"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-3xl">尋找封面</DialogTitle>

        <!-- <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription> -->
      </DialogHeader>
      <div class="flex flex-col gap-4 overflow-y-auto px-6 py-4">
        <form @submit.prevent="handleSubmit" class="w-full">
          <FormField v-slot="{ componentField }" name="keyword">
            <FormItem>
              <FormControl>
                <div class="mx-auto flex w-full max-w-sm items-center justify-center gap-4">
                  <div class="relative w-full max-w-sm items-center">
                    <Input
                      type="text"
                      placeholder="輸入關鍵字..."
                      v-bind="componentField"
                      v-model="keyword"
                      class="pl-10"
                    />
                    <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
                      <Search class="text-muted-foreground size-6" />
                    </span>
                  </div>

                  <DialogClose>
                    <Button
                      type="submit"
                      class="font-notosans text-md bg-gray-800 tracking-widest text-white hover:bg-gray-800/80"
                      >搜尋</Button
                    >
                  </DialogClose>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="tags">
            <FormItem>
              <FormControl>
                <FilterTab
                  :thumbnailCategories="props.thumbnailCategories"
                  v-bind="componentField"
                  class="mt-12 grow gap-0"
                  @update="updateSelectedTags"
                />
              </FormControl>
              <!-- <FormDescription class="mx-auto"> 搜尋相關的封面。 </FormDescription> -->
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </div>

      <!-- <DialogFooter class="p-6 pt-0">
        <DialogTrigger asChild>
          <Button type="submit" @click="toggleDialog"> Save changes </Button></DialogTrigger
        >
      </DialogFooter> -->
    </DialogContent>
  </Dialog>
</template>
