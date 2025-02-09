import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/frontend/HomePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
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
  routes
})

export default router
