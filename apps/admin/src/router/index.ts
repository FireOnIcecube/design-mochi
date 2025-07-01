import { createRouter, createWebHistory } from 'vue-router'

import { auth } from '@pkg/firebase/index'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import HomeView from '@admin/views/HomeView.vue'
import LoginView from '@admin/views/LoginView.vue'
import AboutView from '@admin/views/AboutView.vue'

import DefaultLayout from '@admin/layouts/DefaultLayout.vue'
import BlankLayout from '@admin/layouts/BlankLayout.vue'
import NotFound from '@admin/views/NotFound.vue'

import ThumbnailList from '@admin/views/thumbnails/ThumbnailList.vue'
import ThumbnailCreate from '@admin/views/thumbnails/ThumbnailCreate.vue'
import ThumbnailEdit from '@admin/views/thumbnails/ThumbnailEdit.vue'
import ThumbnailDetail from '@admin/views/thumbnails/ThumbnailDetail.vue'

import CateogoryList from '@admin/views/categories/CategoryList.vue'
import CateogoryCreate from '@admin/views/categories/CategoryCreate.vue'
import CateogoryEdit from '@admin/views/categories/CategoryEdit.vue'
import CateogoryDetail from '@admin/views/categories/CategoryDetail.vue'

const routes = [
  { path: '/', component: HomeView, meta: { requiresAuth: true, layout: DefaultLayout } },
  { path: '/about', component: AboutView, meta: { requiresAuth: true } },
  { path: '/login', component: LoginView, meta: { layout: BlankLayout } },

  // Thumbnails
  { path: '/thumbnails', component: ThumbnailList, meta: { requiresAuth: true } },
  { path: '/thumbnails/create', component: ThumbnailCreate, meta: { requiresAuth: true } },
  {
    path: '/thumbnails/edit/:id',
    component: ThumbnailEdit,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/thumbnails/detail/:id',
    component: ThumbnailDetail,
    props: true,
    meta: { requiresAuth: true },
  },

  // Categories
  { path: '/categories', component: CateogoryList, meta: { requiresAuth: true } },
  { path: '/categories/create', component: CateogoryCreate, meta: { requiresAuth: true } },
  {
    path: '/categories/edit/:id',
    component: CateogoryEdit,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/categories/detail/:id',
    component: CateogoryDetail,
    props: true,
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { layout: BlankLayout } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

// 導航守衛
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.meta.requiresAuth
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//     if (requiresAuth && !user) {
//       next('/login')
//     } else {
//       next()
//     }
//     unsubscribe()
//   })
// })

let firebaseInit = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    resolve(user)
  })
})

router.beforeEach(async (to, from, next) => {
  const user = await firebaseInit
  if (to.meta.requiresAuth && !user) {
    next('/login')
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   const auth = getAuth()
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

//   if (requiresAuth && !auth.currentUser) {
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router
