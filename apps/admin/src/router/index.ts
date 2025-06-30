import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { auth } from '@pkg/firebase/index'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AboutView from '../views/AboutView.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import CategoryPage from '../views/CategoryPage.vue'
import ThumbnailPage from '../views/ThumbnailPage.vue'
import BlankLayout from '../layouts/BlankLayout.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue'),
//     },
//   ],
// })

const routes = [
  { path: '/', component: HomeView, meta: { requiresAuth: true, layout: DefaultLayout } },
  { path: '/about', component: AboutView, meta: { requiresAuth: true } },
  { path: '/thumbnails', component: ThumbnailPage, meta: { requiresAuth: true } },
  { path: '/categories', component: CategoryPage, meta: { requiresAuth: true } },
  { path: '/login', component: LoginView, meta: { layout: BlankLayout } },
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
