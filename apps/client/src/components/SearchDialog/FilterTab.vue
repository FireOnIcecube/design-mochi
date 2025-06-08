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

const selectedMap = reactive(new Map<string, Set<string>>())

props.categories.forEach((cat) => {
  if (!selectedMap.has(cat.key)) {
    selectedMap.set(cat.key, new Set())
  }
})

function isChecked(catId: string, value: string) {
  return selectedMap.get(catId)?.has(value) ?? false
}

function toggleOption(catId: string, value: string) {
  const set = selectedMap.get(catId)
  if (!set) return
  set.has(value) ? set.delete(value) : set.add(value)
}

function isAllSeleted(catId: string) {
  const category = props.categories.find((c) => c.key === catId)
  const set = selectedMap.get(catId)
  return category && set?.size === category.options.length
}

function isIndeterminate(catId: string) {
  const category = props.categories.find((c) => c.key === catId)
  const set = selectedMap.get(catId)
  return category && set && set.size > 0 && set.size < category.options.length
}

function toggleAll(catId: string) {
  const category = props.categories.find((c) => c.key === catId)
  const set = selectedMap.get(catId)
  if (!category || !set) return

  if (set.size === category.options.length) {
    set.clear()
  } else {
    category.options.forEach((opt) => set.add(opt.value))
  }
}
</script>

<template>
  <pre class="rounded bg-gray-100 p-2 text-sm">{{
    [...selectedMap].map(([k, v]) => [k, [...v]])
  }}</pre>

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
          <Checkbox
            disabled
            :checked="isAllSeleted(category.key)"
            :indeterminate="isIndeterminate(category.key)"
            class="disabled:cursor-default disabled:opacity-100"
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
            <div class="col-span-full flex items-center space-x-2">
              <Checkbox
                id="terms"
                :modelValue="isAllSeleted(category.key)"
                :indeterminate="isIndeterminate(category.key)"
                @click="toggleAll(category.key)"
              />
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
              <Checkbox
                :name="option.id.toString()"
                :value="option.value"
                :id="option.id.toString()"
                :modelValue="isChecked(category.key, option.value)"
                @click="toggleOption(category.key, option.value)"
              />
              <label
                :for="option.id.toString()"
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
</template>
