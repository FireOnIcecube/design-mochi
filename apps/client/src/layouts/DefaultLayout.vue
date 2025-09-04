<script setup lang="ts">
import NavHeader from '@client/components/NavHeader.vue'
import CategoryMenuBar from '@client/components/layout/categoryMenuBar/CategoryMenuBar.vue'
import { useThumbnailCategoryStore } from '@client/stores/useThumbnailCategoryStore'
import { computed, onMounted, ref } from 'vue'
import { useThumbnailStore } from '@client/stores/useThumbnailStore'
import { useRoute, useRouter } from 'vue-router'
import { MobileMenuBar } from '@client/components/layout/mobileMenuBar'
import { SearchDialog } from '@client/components/common/SearchDialog'

const route = useRoute()
const router = useRouter()

const thumbnailStore = useThumbnailStore()
const categoryStore = useThumbnailCategoryStore()

const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const isVtuber = computed(() => {
  const val = route.query.isVtuber
  if (val === 'true') return true
  if (val === 'false') return false
  return false // 預設值
})

function handleToggleVtuberMode(isVtuberMode: boolean) {
  router.replace({
    path: route.path,
    query: { ...route.query, isVtuber: String(isVtuberMode) }
  })
}

onMounted(async () => {
  thumbnailStore.fetchAll({ order: { createdAt: 'desc' } })
  categoryStore.fetchAll({ order: { createdAt: 'asc' } })
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div
      class="bg-primary transition-theme dark:bg-surface-dark border-b px-4 lg:p-4 dark:border-gray-700"
    >
      <NavHeader />
    </div>

    <div class="bg-primary transition-theme dark:bg-surface-dark border-b dark:border-gray-700">
      <div class="hidden items-center justify-center xl:flex">
        <CategoryMenuBar
          :thumbnail-categories="categoryStore.data"
          :is-vtuber="isVtuber"
          @toggle-vtuber-mode="handleToggleVtuberMode"
        />
      </div>

      <!-- mobile menu bar -->
      <div class="mx-auto max-w-md xl:hidden" @click="toggleMobileMenu">
        <MobileMenuBar />
      </div>
    </div>

    <!-- mobile 展開區塊 -->
    <!-- <div
      class="mx-auto w-full max-w-lg overflow-y-auto rounded bg-red-300 transition-all duration-300 xl:hidden"
      :class="isMobileMenuOpen ? 'h-48' : 'h-0'"
    >
      <div class="cursor-pointer bg-[#E6D7C5] dark:bg-gray-800">
        <SearchDialog :thumbnailCategories="categoryStore.data" />
      </div>

      <div class="bg-blue-300">123</div>
      <div class="bg-green-300">123</div>
      <div class="bg-blue-300">123</div>
      <div class="bg-green-300">123</div>
      <div class="bg-blue-300">123</div>
      <div class="bg-green-300">123</div>
      <div class="bg-blue-300">123</div>
      <div class="bg-green-300">123</div>
      <div class="bg-blue-300">123</div>
      <div class="bg-green-300">123</div>
    </div> -->

    <main class="dark:bg-surface-dark bg-surface transition-theme container mx-auto grow p-4">
      <router-view />
    </main>

    <div
      class="bg-primary border-outline dark:bg-surface-dark transition-theme border-t p-4 text-center dark:border-gray-700"
    >
      <small class="font-notosans"> 所有封面與影片素材版權均屬原創作者所有。 </small>
      <!-- <p>© 2025 <strong>DesignMochi</strong> 🍡 | Crafted with ❤️ for creators</p> -->
    </div>
  </div>
</template>
