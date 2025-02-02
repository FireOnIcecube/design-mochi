import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Blank from '@/views/Blank.vue'
import HomePage from '@/views/frontend/HomePage.vue'
import FontGallery from '@/views/frontend/font/FontGallery.vue'
import defaultLayout from '@/layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
  // frontend
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },

  {
    path: '/fonts',
    name: 'fonts',
    component: defaultLayout,
    children: [
      {
        path: '',
        name: 'FontGallery',
        component: FontGallery
      },
      {
        path: ':id',
        name: 'FontInfo',
        component: () => import('@/views/frontend/font/FontInfo.vue'),
        props: true
      }
    ]
  },

  {
    path: '/blank',
    name: 'Blank',
    component: Blank
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
