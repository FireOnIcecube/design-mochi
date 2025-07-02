<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { signOut, getAuth } from 'firebase/auth'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()
const auth = getAuth()

const isOpen = ref(true)

function logout() {
  signOut(auth)
    .then(() => {
      router.go(0)
    })
    .catch((error) => {
      console.error('登出失敗:', error)
      alert('登出失敗，請稍後再試')
    })
}

// const links = [
//   { label: '管理封面', path: '/thumbnails' },
//   { label: '管理類別', path: '/categories' },
// ]

const menuItems = [
  {
    title: '管理封面',
    children: [
      { label: '封面列表', path: '/thumbnails' },
      { label: '增加封面', path: '/thumbnails/create' },
    ],
  },
  {
    title: '管理類別',
    children: [
      { label: '管理類別', path: '/categories' },
      { label: '增加類別', path: '/categories/create' },
    ],
  },
]
</script>

<template>
  <div
    v-show="isOpen"
    class="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
    @click="isOpen = false"
  ></div>
  <div class="relative z-50 flex h-full">
    <div
      class="absolute h-full overflow-hidden bg-gray-100 transition-all duration-300 ease-in-out md:static dark:bg-gray-800"
      :class="isOpen ? ['w-64', 'p-4'] : 'w-0'"
    >
      <div class="flex h-full w-full flex-col" :class="{ hidden: !isOpen }">
        <ul class="mt-10 flex-1 md:mt-0">
          <li v-for="(item, index) in menuItems" :key="index" class="mb-2">
            <Disclosure
              :key="item.children.some((child) => child.path === route.path) ? 'open' : 'closed'"
              :defaultOpen="item.children.some((child) => child.path === route.path)"
            >
              <template #default="{ open }">
                <!-- 主分類 -->
                <DisclosureButton
                  class="w-full px-4 py-2 font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
                  :class="{ 'bg-gray-200 dark:bg-gray-700': open }"
                >
                  <div
                    class="text-content dark:text-content-dark flex items-center justify-between text-lg font-black"
                  >
                    <span>{{ item.title }}</span>
                    <span>{{ open ? '−' : '+' }}</span>
                  </div>
                </DisclosureButton>

                <!-- 子分類 -->
                <DisclosurePanel class="space-y-2 pt-1 pl-4">
                  <router-link
                    v-for="link in item.children"
                    :key="link.path"
                    :to="link.path"
                    class="block rounded px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-700"
                    :class="{ 'bg-blue-500 text-white': route.path === link.path }"
                  >
                    <span class="text-content dark:text-content-dark text-md">{{
                      link.label
                    }}</span>
                  </router-link>
                </DisclosurePanel>
              </template>
            </Disclosure>
            <!-- <router-link
              :to="{ path: link.path }"
              class="block cursor-pointer rounded px-4 py-2 text-gray-700 transition-colors select-none hover:bg-gray-200 active:scale-95 dark:text-gray-300 dark:hover:bg-gray-700"
              :class="{ 'bg-gray-200 dark:bg-gray-700': isActive(link.path) }"
            >
              <span class="text-lg font-black"> {{ link.label }} </span>
            </router-link> -->
          </li>
        </ul>

        <button
          class="bg-surface-dark dark:bg-surface cursor-pointer rounded-lg py-2 shadow-md transition-colors hover:bg-gray-700 active:scale-95 active:shadow-inner dark:hover:bg-gray-200"
          @click="logout"
        >
          <span class="text-content-dark dark:text-content font-notosans text-lg">登出</span>
        </button>
      </div>

      <!-- <ul class="mt-10 flex-1 md:mt-0" :class="{ hidden: !isOpen }">
        <li v-for="link in links" :key="link.path" class="mb-2">
          <router-link
            :to="{ path: link.path }"
            class="block cursor-pointer rounded px-4 py-2 text-gray-700 transition-colors select-none hover:bg-gray-200 active:scale-95 dark:text-gray-300 dark:hover:bg-gray-700"
            :class="{ 'bg-gray-200 dark:bg-gray-700': isActive(link.path) }"
          >
            <span class="text-lg font-black"> {{ link.label }} </span>
          </router-link>
        </li>
      </ul>
      <button
        class="bg-surface-dark dark:bg-surface cursor-pointer rounded-lg py-2 shadow-md transition-colors hover:bg-gray-700 active:scale-95 active:shadow-inner dark:hover:bg-gray-200"
        :class="{ hidden: !isOpen }"
        @click="logout"
      >
        <span class="text-content-dark dark:text-content font-notosans text-lg">登出</span>
      </button> -->
    </div>

    <div
      class="absolute top-4 right-0 translate-x-full bg-gray-300 dark:bg-gray-700"
      @click="isOpen = !isOpen"
    >
      <Icon
        :icon="isOpen ? 'fe:arrow-left' : 'fe:arrow-right'"
        class="text-content dark:text-content-dark h-8 w-8 cursor-pointer transition-transform duration-300 lg:h-10 lg:w-10"
      />
    </div>
  </div>
</template>
