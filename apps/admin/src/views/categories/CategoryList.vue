<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menus = [
  {
    title: '主分類 A',
    children: [
      { label: '子頁面 A1', path: '/a/a1' },
      { label: '子頁面 A2', path: '/a/a2' },
    ],
  },
  {
    title: '主分類 B',
    children: [
      { label: '子頁面 B1', path: '/b/b1' },
      { label: '子頁面 B2', path: '/b/b2' },
    ],
  },
]
</script>

<template>
  <aside class="w-64 space-y-2 bg-gray-100 p-4 dark:bg-gray-800">
    <ul>
      <li v-for="menu in menus" :key="menu.title">
        <Disclosure :defaultOpen="menu.children.some((child) => child.path === route.path)">
          <template #default="{ open }">
            <!-- 主分類 -->
            <DisclosureButton
              class="w-full px-2 py-1 text-left font-bold hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <div class="flex items-center justify-between">
                <span>{{ menu.title }}</span>
                <span>{{ open ? '−' : '+' }}</span>
              </div>
            </DisclosureButton>

            <!-- 子分類 -->
            <DisclosurePanel class="space-y-1 pt-1 pl-4">
              <router-link
                v-for="item in menu.children"
                :key="item.path"
                :to="item.path"
                class="block rounded px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-700"
                :class="{ 'bg-blue-500 text-white': route.path === item.path }"
              >
                {{ item.label }}
              </router-link>
            </DisclosurePanel>
          </template>
        </Disclosure>
      </li>
    </ul>
  </aside>
</template>
