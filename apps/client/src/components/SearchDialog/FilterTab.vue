<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@client/components/ui/tabs'
import { Checkbox } from '@client/components/ui/checkbox'
import { computed, onMounted } from 'vue'

const props = defineProps<{
  categories: {
    key: string
    label: string
    options: { label: string; value: string }[]
  }[]
}>()

defineExpose({})

onMounted(() => {
  // This is a placeholder for any initialization logic if needed
})
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
          <Checkbox disabled class="disabled:cursor-default disabled:opacity-100" />
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
</template>
