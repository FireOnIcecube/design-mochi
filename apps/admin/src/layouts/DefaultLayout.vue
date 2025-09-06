<script setup lang="ts">
import NavHeader from '@admin/components/NavHeader.vue'
import Sidebar from '../components/Sidebar.vue'
import CategoryMenuBar from '../components/layout/categoryMenuBar/CategoryMenuBar.vue'
import { useThumbnailCategoryStore } from '../stores/useThumbnailCategoryStore'
import { computed, onMounted, ref } from 'vue'
import { useThumbnailStore } from '../stores/useThumbnailStore'
import { useRoute, useRouter } from 'vue-router'
import MobileMenuBar from '@admin/components/layout/mobileMenuBar/MobileMenuBar.vue'

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
    query: { ...route.query, isVtuber: String(isVtuberMode) },
  })
}

onMounted(async () => {
  thumbnailStore.fetchAll({ order: { createdAt: 'desc' } })
  categoryStore.fetchAll({ order: { createdAt: 'asc' } })
})
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <div class="bg-primary dark:bg-surface-dark border-b px-4 lg:p-4 dark:border-gray-700">
      <NavHeader />
    </div>

    <div class="flex flex-1 overflow-hidden">
      <aside class="border-r dark:border-gray-700">
        <Sidebar />
      </aside>

      <div class="flex flex-1 flex-col overflow-auto">
        <div class="bg-primary transition-theme dark:bg-surface-dark border-b dark:border-gray-700">
          <div class="hidden items-center justify-center xl:flex">
            <CategoryMenuBar :is-vtuber="isVtuber" @toggle-vtuber-mode="handleToggleVtuberMode" />
          </div>

          <!-- mobile menu bar -->
          <div class="mx-auto max-w-md xl:hidden" @click="toggleMobileMenu">
            <MobileMenuBar :is-vtuber="isVtuber" @toggle-vtuber-mode="handleToggleVtuberMode" />
          </div>
        </div>

        <main class="dark:bg-surface-dark bg-surface transition-theme container mx-auto grow p-4">
          <router-view />
        </main>

        <div
          class="bg-primary border-outline dark:bg-surface-dark transition-theme mt-12 border-t p-4 text-center dark:border-gray-700"
        >
          <small class="font-notosans"> 所有封面與影片素材版權均屬原創作者所有。 </small>
          <!-- <p>© 2025 <strong>DesignMochi</strong> 🍡 | Crafted with ❤️ for creators</p> -->
        </div>
      </div>
    </div>
  </div>
</template>
