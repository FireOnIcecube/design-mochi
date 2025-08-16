<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@admin/components/ui/tabs'
import { Checkbox } from '@admin/components/ui/checkbox'
import { computed, onMounted, reactive, ref } from 'vue'
import { ThumbnailCategory } from '@/packages/types'

const props = defineProps<{
  thumbnailCategories: ThumbnailCategory[]
}>()
const rawSelectedTags = reactive<Record<string, Set<string>>>({})

const emit = defineEmits<{
  (e: 'update', selectedTags: Record<string, string[]>): void
}>()

function updateSelectedTags() {
  const convertedTags = Object.fromEntries(
    Object.entries(rawSelectedTags).map(([k, v]) => [k, Array.from(v)]),
  )

  emit('update', convertedTags)
}

// 初始化每個分類為空 Set
onMounted(() => {
  props.thumbnailCategories.forEach((cat) => {
    rawSelectedTags[cat.id] = new Set()
  })

  updateSelectedTags()
})

function isChecked(catId: string, tagSlug: string) {
  return rawSelectedTags[catId]?.has(tagSlug) ?? false
}

function toggleOption(catId: string, tagSlug: string, checked: boolean | 'indeterminate') {
  if (checked !== true && checked !== false) return
  const set = rawSelectedTags[catId]
  if (!set) return

  if (checked) {
    set.add(tagSlug)
  } else {
    set.delete(tagSlug)
  }

  // 替換 Set 實例以觸發 reactivity
  rawSelectedTags[catId] = new Set(set)
}

function isAllSelected(catId: string) {
  const category = props.thumbnailCategories.find((c) => c.id === catId)
  const set = rawSelectedTags[catId]
  return category && set?.size === category.tags?.length
}

function isIndeterminate(catId: string) {
  const category = props.thumbnailCategories.find((c) => c.id === catId)
  const set = rawSelectedTags[catId]
  return category && set && set.size > 0 && set.size < (category.tags?.length ?? 0)
}

function toggleAll(catId: string, checked: boolean | 'indeterminate') {
  if (checked !== true && checked !== false) return

  const category = props.thumbnailCategories.find((c) => c.id === catId)
  if (!category) return

  rawSelectedTags[catId] = checked ? new Set((category.tags ?? []).map((t) => t.slug)) : new Set()
}
</script>

<template>
  <Tabs :default-value="props.thumbnailCategories[0].id" class="overflow-x-hidden">
    <TabsList
      class="mx-auto flex h-auto max-h-1/2 max-w-full flex-wrap justify-start gap-2 overflow-x-auto p-0 xl:flex-nowrap"
    >
      <TabsTrigger
        v-for="(category, index) in props.thumbnailCategories"
        :key="index"
        :value="category.id"
        class="font-notosans dark:data-[state=active]:bg-background rounded-b-none border-b-0 p-5"
      >
        <div class="flex space-x-2">
          <label class="leading-none">{{ category.name }}</label>
          <input
            type="checkbox"
            disabled
            :checked="isAllSelected(category.id)"
            :indeterminate="isIndeterminate(category.id)"
          />
        </div>
      </TabsTrigger>
    </TabsList>

    <div class="border-outline dark:border-outline-dark w-full grow overflow-y-auto border-2">
      <TabsContent
        v-for="(category, index) in props.thumbnailCategories"
        :key="index"
        :value="category.id"
        class="h-full"
      >
        <div class="mx-auto h-full overflow-y-auto px-6 py-12 xl:w-3/4">
          <div class="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            <!-- 全選 Checkbox -->
            <div class="col-span-full flex items-center space-x-2">
              <label
                class="lg:text-md font-notosans text-sm leading-none font-medium select-none xl:text-lg"
              >
                <Checkbox
                  :modelValue="isAllSelected(category.id)"
                  @update:modelValue="
                    (checked) => {
                      toggleAll(category.id, checked)
                      updateSelectedTags()
                    }
                  "
                />
                全選
              </label>
            </div>

            <!-- 各選項 Checkbox -->
            <div v-for="tag in category.tags" :key="tag.id" class="flex items-center space-x-2">
              <label
                :for="tag.id"
                class="lg:text-md font-notosans text-sm leading-none font-medium select-none xl:text-lg"
              >
                <Checkbox
                  :id="tag.id"
                  :modelValue="isChecked(category.id, tag.slug)"
                  @update:modelValue="
                    (checked) => {
                      toggleOption(category.id, tag.slug, checked)
                      updateSelectedTags()
                    }
                  "
                />
                {{ tag.id }}
              </label>
            </div>
          </div>
        </div>
      </TabsContent>
    </div>
  </Tabs>
</template>
