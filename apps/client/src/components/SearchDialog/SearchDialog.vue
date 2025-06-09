<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
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

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@client/components/ui/form'

import { Button } from '@client/components/ui/button'
import { Filter, Search } from 'lucide-vue-next'
import { Input } from '@client/components/ui/input'
import { useForm } from 'vee-validate'

const isOpen = ref(false)
const toggleDialog = () => {
  isOpen.value = !isOpen.value
}

const form = useForm()
const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})

// mockFilterData
const categories = [
  {
    key: 'CATEGORY',
    label: '分類',
    options: [
      { id: 1, label: 'A', value: 'A' },
      { id: 2, label: 'B', value: 'B' },
      { id: 3, label: 'C', value: 'C' }
    ]
  },
  {
    key: 'TASTE',
    label: '特色',
    options: [
      { id: 1, label: 'A', value: 'A' },
      { id: 2, label: 'B', value: 'B' }
    ]
  },
  {
    key: 'TOPIC',
    label: '主題',
    options: [
      { id: 1, label: 'X', value: 'X' },
      { id: 2, label: 'Y', value: 'Y' }
    ]
  },
  {
    key: 'SHAPE',
    label: '形狀',
    options: [
      { id: 1, label: 'A', value: 'A' },
      { id: 2, label: 'B', value: 'B' }
    ]
  },
  {
    key: 'COLOR',
    label: '顏色',
    options: [
      { id: 1, label: '紅色', value: 'red' },
      { id: 2, label: '藍色', value: 'blue' },
      { id: 3, label: '綠色', value: 'green' }
    ]
  },
  {
    key: 'MEDIA',
    label: '媒體',
    options: [
      { id: 1, label: '測試項目 A', value: 'A' },
      { id: 2, label: '測試項目 B', value: 'B' },
      { id: 3, label: '測試項目 C', value: 'C' },
      { id: 4, label: '測試項目 D', value: 'D' },
      { id: 5, label: '測試項目 E', value: 'E' },
      { id: 6, label: '測試項目 F', value: 'F' }
    ]
  },
  {
    key: 'RANKING',
    label: '排行',
    options: [
      { id: 1, label: 'Top 1', value: '1' },
      { id: 2, label: 'Top 2', value: '2' }
    ]
  }
]

const selectedTags = reactive<Record<string, number[]>>({})

function updateSelectedTags(val: Record<string, number[]>) {
  Object.assign(selectedTags, val)
}

const selectedTagList = computed(() => {
  const result: { key: string; label: string }[] = []
  for (const category of categories) {
    const ids = selectedTags[category.key] || []
    for (const id of ids) {
      const label = category.options.find((opt) => opt.id === id)?.label
      if (label) result.push({ key: category.key, label })
    }
  }
  return result
})
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
        <div>{{ selectedTagList }}</div>
        <form @submit.prevent="onSubmit" class="w-full">
          <FormField v-slot="{ componentField }" name="keyword">
            <FormItem>
              <FormControl>
                <div class="mx-auto flex w-full max-w-sm items-center justify-center gap-1.5">
                  <div class="relative w-full max-w-sm items-center">
                    <Input
                      type="text"
                      placeholder="輸入關鍵字..."
                      v-bind="componentField"
                      class="pl-10"
                    />
                    <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
                      <Search class="text-muted-foreground size-6" />
                    </span>
                  </div>

                  <Button type="submit" class="font-notosans text-md tracking-widest">搜尋</Button>
                </div>
              </FormControl>
              <!-- <FormDescription class="mx-auto"> 搜尋相關的封面。 </FormDescription> -->
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="tags">
            <FormItem>
              <FormControl>
                <FilterTab
                  :categories="categories"
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
