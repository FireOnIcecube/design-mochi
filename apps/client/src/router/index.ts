import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@client/views/HomePage.vue'
import ThumbnailDetail from '@client/views/ThumbnailDetail.vue'
import DefaultLayout from '@client/layouts/DefaultLayout.vue'
import SearchPage from '@/apps/client/src/views/SearchPage.vue'
import TestPage from '@/apps/client/src/views/TestPage.vue'

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
  },
  {
    path: '/search',
    name: 'SearchResult',
    component: SearchPage,
    meta: { layout: DefaultLayout }
  },
  {
    path: '/test',
    name: 'TestPage',
    component: TestPage,
    meta: { layout: DefaultLayout }
  }

  // admin
  // {
  //   path: '/admin',
  //   name: 'AdminHome',
  //   component: () => import('@client/views/admin/AdminHome.vue'),
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
