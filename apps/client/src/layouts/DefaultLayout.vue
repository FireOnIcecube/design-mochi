<script setup lang="ts">
import NavHeader from '@client/components/NavHeader.vue'
import CategoryMenuBar from '@client/components/layout/categoryMenuBar/CategoryMenuBar.vue'
import { useThumbnailCategoryStore } from '@client/stores/useThumbnailCategoryStore'
import { computed, onMounted, ref } from 'vue'
import { useThumbnailStore } from '@client/stores/useThumbnailStore'
import { useRoute, useRouter } from 'vue-router'
import MobileMenuBar from '@client/components/layout/mobileMenuBar/MobileMenuBar.vue'

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
  <div class="flex h-screen flex-col">
    <div
      class="bg-primary transition-theme dark:bg-surface-dark border-b px-4 lg:p-4 dark:border-gray-700"
    >
      <NavHeader />
    </div>

    <div class="flex flex-1">
      <div class="flex flex-1 flex-col overflow-auto">
        <div
          class="bg-primary transition-theme dark:bg-surface-dark h-16 border-b dark:border-gray-700"
        >
          <div class="hidden items-center justify-center xl:flex">
            <CategoryMenuBar
              :thumbnail-categories="categoryStore.data"
              :is-vtuber="isVtuber"
              @toggle-vtuber-mode="handleToggleVtuberMode"
            />
          </div>

          <!-- mobile menu bar -->
          <div class="mx-auto max-w-md xl:hidden">
            <MobileMenuBar @click="toggleMobileMenu" />
          </div>
        </div>

        <!-- mobile 展開區塊 -->
        <div
          class="overflow-hidden bg-red-300 transition-all duration-300 xl:hidden"
          :class="isMobileMenuOpen ? 'h-36' : 'h-0'"
        >
          這裡放展開的內容
        </div>

        <main class="dark:bg-surface-dark bg-surface container mx-auto flex-1 p-4">
          <router-view />
        </main>

        <div
          class="bg-primary border-outline dark:bg-surface-dark transition-theme border-t p-4 text-center dark:border-gray-700"
        >
          <small class="font-notosans"> 所有封面與影片素材版權均屬原創作者所有。 </small>
          <!-- <p>© 2025 <strong>DesignMochi</strong> 🍡 | Crafted with ❤️ for creators</p> -->
        </div>
      </div>
    </div>
  </div>
</template>
