<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@client/components/ui/tabs'
import { Checkbox } from '@client/components/ui/checkbox'
import { computed, onMounted, reactive, ref } from 'vue'

const props = defineProps<{
  categories: {
    key: string
    label: string
    options: { id: number; label: string; value: string }[]
  }[]
}>()

// 選取狀態：每個類別 key 對應一組 Set<string>
const selectedMap = reactive<Record<string, Set<string>>>({})

// 初始化每個分類為空 Set
onMounted(() => {
  props.categories.forEach((cat) => {
    selectedMap[cat.key] = new Set()
  })
})

function isChecked(catId: string, value: string) {
  return selectedMap[catId]?.has(value) ?? false
}

function toggleOption(catId: string, value: string, checked: boolean | 'indeterminate') {
  if (checked !== true && checked !== false) return
  const set = selectedMap[catId]
  if (!set) return

  if (checked) {
    set.add(value)
  } else {
    set.delete(value)
  }

  // 替換 Set 實例以觸發 reactivity
  selectedMap[catId] = new Set(set)
}

function isAllSelected(catId: string) {
  const category = props.categories.find((c) => c.key === catId)
  const set = selectedMap[catId]
  return category && set?.size === category.options.length
}

function isIndeterminate(catId: string) {
  const category = props.categories.find((c) => c.key === catId)
  const set = selectedMap[catId]
  return category && set && set.size > 0 && set.size < category.options.length
}

function toggleAll(catId: string, checked: boolean | 'indeterminate') {
  if (checked !== true && checked !== false) return

  const category = props.categories.find((c) => c.key === catId)
  if (!category) return

  selectedMap[catId] = checked ? new Set(category.options.map((opt) => opt.value)) : new Set()
}
</script>

<template>
  <Tabs :default-value="props.categories[0].key" class="overflow-x-hidden">
    <TabsList
      class="max-h-1/2 mx-auto flex h-auto max-w-full flex-wrap justify-start gap-2 overflow-x-auto p-0 xl:flex-nowrap"
    >
      <TabsTrigger
        v-for="(category, index) in props.categories"
        :key="index"
        :value="category.key"
        class="font-notosans dark:data-[state=active]:bg-background rounded-b-none border-b-0 p-5"
      >
        <div class="flex space-x-2">
          <label class="leading-none">{{ category.label }}</label>
          <input
            type="checkbox"
            disabled
            :checked="isAllSelected(category.key)"
            :indeterminate="isIndeterminate(category.key)"
          />
        </div>
      </TabsTrigger>
    </TabsList>

    <div class="border-outline dark:border-outline-dark w-full grow overflow-y-auto border-2">
      <TabsContent
        v-for="(category, index) in props.categories"
        :key="index"
        :value="category.key"
        class="h-full"
      >
        <div class="mx-auto h-full overflow-y-auto px-6 py-12 xl:w-3/4">
          <div class="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            <!-- 全選 Checkbox -->
            <div class="col-span-full flex items-center space-x-2">
              <label
                class="lg:text-md font-notosans select-none text-sm font-medium leading-none xl:text-lg"
              >
                <Checkbox
                  :modelValue="isAllSelected(category.key)"
                  @update:modelValue="(checked) => toggleAll(category.key, checked)"
                />
                全選
              </label>
            </div>

            <!-- 各選項 Checkbox -->
            <div
              v-for="(option, optionIndex) in category.options"
              :key="optionIndex"
              class="flex items-center space-x-2"
            >
              <label
                :for="option.id.toString()"
                class="lg:text-md font-notosans select-none text-sm font-medium leading-none xl:text-lg"
              >
                <Checkbox
                  :id="option.id.toString()"
                  :modelValue="isChecked(category.key, option.value)"
                  @update:modelValue="
                    (checked) => toggleOption(category.key, option.value, checked)
                  "
                />
                {{ option.label }}
              </label>
            </div>
          </div>
        </div>
      </TabsContent>
    </div>
  </Tabs>
</template>
