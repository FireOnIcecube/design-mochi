import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomePage from '@/views/frontend/HomePage.vue'
import ThumbnailDetail from '@/views/frontend/ThumbnailDetail.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { layout: DefaultLayout }
  },
  {
    path: '/thumbnail/:id',
    name: 'ThumbnailDetail',
    component: ThumbnailDetail,
    meta: { layout: DefaultLayout }
  }

  // admin
  // {
  //   path: '/admin',
  //   name: 'AdminHome',
  //   component: () => import('@/views/admin/AdminHome.vue'),
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果是返回操作，例如使用瀏覽器返回鍵，會使用先前儲存的位置
    if (savedPosition) {
      return savedPosition
    } else {
      // 否則滾動到頂部
      return { top: 0 }
    }
  }
})

export default router
