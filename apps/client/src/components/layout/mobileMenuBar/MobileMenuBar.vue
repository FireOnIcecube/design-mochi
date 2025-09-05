<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import MenuIcon from './MenuIcon.vue'
import { SearchDialog } from '@client/components/common/SearchDialog'
import { useThumbnailCategoryStore } from '@client/stores/useThumbnailCategoryStore'
import { Icon } from '@iconify/vue'

const isOpen = ref(false)
const categoryStore = useThumbnailCategoryStore()

const props = defineProps<{
  isVtuber: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-vtuber-mode', value: boolean): void
}>()

const localVtuber = ref<boolean>(false)

function onToggleVtuberMode() {
  localVtuber.value = !localVtuber.value
  emit('toggle-vtuber-mode', localVtuber.value)
}

watch(
  () => props.isVtuber,
  (newVal) => {
    localVtuber.value = newVal
  }
)

onMounted(async () => {
  if (!categoryStore.data) {
    categoryStore.fetchAll({ order: { createdAt: 'asc' } })
  }
})
</script>

<template>
  <div class="xl:hidden">
    <!-- menu bar -->
    <div
      class="mx-auto flex max-w-md cursor-pointer justify-center rounded bg-[#E6D7C5] p-2 dark:bg-gray-800"
      @click="isOpen = !isOpen"
    >
      <div class="text-content dark:text-content-dark flex items-center gap-x-4">
        <MenuIcon v-model="isOpen" />
        <span class="font-notosans text-lg">Menu</span>
        <MenuIcon v-model="isOpen" />
      </div>
    </div>

    <!-- 展開區塊 -->
    <transition name="slide-fade">
      <div
        v-show="isOpen"
        class="mx-auto mt-2 w-full max-w-lg overflow-y-auto rounded border shadow-md transition-all duration-300"
      >
        <!-- 搜尋列 -->
        <div class="p mr-4 flex items-center justify-end gap-x-8 border-b">
          <button
            type="button"
            :class="
              localVtuber
                ? 'scale-95 bg-blue-400 shadow-[inset_4px_4px_8px_#00000066]'
                : 'bg-red-300 shadow-lg'
            "
            class="cursor-pointer rounded px-4 py-2 text-white transition-all duration-150 active:scale-95"
            @click="onToggleVtuberMode"
          >
            Vtuber
          </button>
          <div class="cursor-pointer rounded-full bg-[#E6D7C5] dark:bg-gray-800">
            <SearchDialog :thumbnail-categories="categoryStore.data" />
          </div>
        </div>

        <div class="divide-y">
          <RouterLink
            v-for="cat in categoryStore.data"
            :to="{
              name: 'ThumbnailList',
              query: {
                [cat.slug]: cat.tags?.map((t) => t.slug)
              }
            }"
            class="block p-3"
          >
            <div class="flex justify-between">
              <span class="font-notosans">{{ cat.name }}</span>
              <span>
                <Icon icon="material-symbols:double-arrow-rounded" class="size-6" />
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
