import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Blank from '@/views/Blank.vue'
import HomePage from '@/views/HomePage.vue'
import FontGallery from '@/views/FontGallery.vue'
import FontInfo from '@/views/FontInfo.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { layout: 'empty' }
  },

  {
    path: '/font-families',
    name: 'FontFamilies',
    component: FontGallery
  },
  {
    path: '/font-families/:id',
    name: 'FontInfo',
    component: FontInfo,
    props: true
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Blank
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
