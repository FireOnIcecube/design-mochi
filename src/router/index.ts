import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import Forms from '@/views/Forms.vue'
import Tables from '@/views/Tables.vue'
import UIElements from '@/views/UIElements.vue'
import Login from '@/views/Login.vue'
import Modal from '@/views/Modal.vue'
import Card from '@/views/Card.vue'
import Blank from '@/views/Blank.vue'
import HomePage from '@/views/HomePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { layout: 'empty' }
  },

  {
    path: '/fonts',
    name: 'Fonts',
    component: Dashboard
  },
  {
    path: '/text-templates',
    name: 'TextTemplates',
    component: Dashboard
  },

  {
    path: '/thumbnails',
    name: 'Thumbnails',
    component: Dashboard
  },

  {
    path: '/forms',
    name: 'Forms',
    component: Forms
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal
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
