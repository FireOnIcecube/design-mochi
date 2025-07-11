<script lang="ts" setup>
import { db } from '@/packages/firebase'
import { Icon } from '@iconify/vue'
import {
  fetchCategoryTags,
  getThumbnailCategory,
  thumbnailConverter,
} from '@/packages/firebase/db/entities/thumbnailCategory'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

import type { ThumbnailCategory, ThumbnailTag } from '@pkg/types/index'
import { onMounted, reactive, ref } from 'vue'
import { ThumbnailCategoryBase } from '@/packages/types'
import LoadingSpinner from './LoadingSpinner.vue'

const props = defineProps<{
  id: string
}>()

const emit = defineEmits<{
  (e: 'refetch'): void
  (e: 'submit', formData: ThumbnailCategoryBase): void
}>()

const isOpen = ref(false)
const loading = ref(false)

const form = reactive<ThumbnailCategoryBase>({
  name: '',
  slug: '',
  tags: [],
})

const errors = reactive({
  name: '',
  slug: '',
  tag: '',
})

const collectionRef = collection(db, 'thumbnail_categories').withConverter(thumbnailConverter)
const docRef = doc(db, 'thumbnail_categories', props.id).withConverter(thumbnailConverter)
const categories = ref<ThumbnailCategory>()
const tags = ref<ThumbnailTag[]>([])

async function getEditedDoc(catId: string) {
  try {
    const editedDoc = await getDoc(docRef)

    if (!editedDoc.exists()) {
      alert('欲編輯目標不存在')
      closeModal()
      emit('refetch')
      return
    }
    categories.value = await getThumbnailCategory(catId)

    Object.assign(form, {
      name: categories.value.name,
      slug: categories.value.slug,
    })
  } catch (e) {
    throw e
  }
}

async function getEditedTags(catId: string) {
  try {
    const editedDoc = await getDoc(docRef)

    if (!editedDoc.exists()) {
      alert('欲編輯目標不存在')
      closeModal()
      emit('refetch')
      return
    }
    tags.value = await fetchCategoryTags(catId)

    Object.assign(form, {
      tags: tags.value,
    })
  } catch (e) {
    throw e
  }
}

function closeModal() {
  isOpen.value = false
}
async function openModal() {
  loading.value = true

  await getEditedDoc(props.id)
  await getEditedTags(props.id)
  loading.value = false

  isOpen.value = true
}

async function validate() {
  errors.name = ''
  errors.slug = ''
  errors.tag = ''

  //  正則表達式， 處理 query 的非法字元
  const slugRegex = /^(?:[a-z0-9\-._~]|%[0-9a-f]{2})+$/

  // Set ，用於檢測重複的 slug
  const slugSet = new Set<string>(form.tags?.map((t) => t.slug))

  if (!form.name.trim()) errors.name = '名稱是必填的'
  if (!form.slug.trim()) {
    errors.slug = '識別名是必填的'
  } else if (!slugRegex.test(form.slug)) {
    errors.slug = '僅允許小寫字母、數字與 -._~'
  }
  // 驗證 tags 中的 slug 是否出現 空白、不合法、重複
  if (!form.tags?.every((t) => t.slug.trim())) {
    errors.tag = '標籤識別名不可空白'
  } else if (!form.tags?.every((t) => !slugRegex.test(t.slug))) {
    errors.slug = '標籤識別名僅允許小寫字母、數字與 -._~'
  } else if (!form.tags.some((t) => slugSet.has(t.slug))) {
    errors.slug = '標籤識別名不可重複'
  }

  // 驗證識別名是否已存在
  const q = query(collectionRef, where('slug', '==', form.slug.trim()))
  const isExist = await getDocs(q).then((docs) => !docs.empty)
  if (isExist) errors.slug = '該識別名已存在'

  return !errors.name && !errors.slug && !errors.tag
}

async function handleSubmit() {
  if (await validate()) {
    emit('submit', { ...form })
    closeModal()
  }
}
function handleCancel() {
  isOpen.value = false
}

function addTag() {
  form.tags?.push({ name: '', slug: '' })
}
</script>
<template>
  <LoadingSpinner v-if="loading" />
  <button
    v-else
    type="button"
    @click="openModal"
    class="cursor-pointer text-blue-600 hover:underline"
  >
    編輯
  </button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex justify-between">
                <DialogTitle as="h3" class="font-notosans text-content text-lg leading-6">
                  編輯 {{ categories?.name }}
                </DialogTitle>

                <Icon
                  icon="material-symbols:close-rounded"
                  class="h-6 w-6 cursor-pointer"
                  @click="closeModal"
                />
              </div>

              <div class="mt-8">
                <form @submit.prevent="handleSubmit" class="space-y-4">
                  <div class="text-content flex flex-col">
                    <label>名稱</label> <input v-model="form.name" />
                    <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                  </div>
                  <div class="text-content flex flex-col">
                    <label>識別名</label> <input v-model="form.slug" />
                    <p v-if="errors.slug" class="mt-1 text-sm text-red-600">{{ errors.slug }}</p>
                  </div>

                  <button
                    class="font-notosans font-notosans text-md cursor-pointe mt-8 cursor-pointer rounded border border-transparent bg-blue-400 px-4 py-2 text-white shadow hover:bg-blue-500 hover:shadow-inner active:scale-95"
                    @click="addTag"
                  >
                    新增標籤
                  </button>

                  <table
                    v-if="form.tags && form.tags.length > 0"
                    class="min-w-full rounded border bg-white shadow-sm"
                  >
                    <thead>
                      <tr>
                        <th class="border-b px-4 py-2">名稱</th>
                        <th class="border-b px-4 py-2">識別名</th>
                        <th class="border-b px-4 py-2">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(tag, index) in form.tags" :key="index">
                        <td class="border-b px-4 py-2">
                          <input
                            v-model="tag.name"
                            class="w-full rounded border px-2 py-1"
                            placeholder="輸入標籤名稱"
                          />
                        </td>
                        <td class="border-b px-4 py-2">
                          <input
                            v-model="tag.slug"
                            class="w-full rounded border px-2 py-1"
                            placeholder="輸入識別名"
                          />
                        </td>
                        <td class="items-center border-b px-4 py-2">
                          <button @click="form.tags.splice(index, 1)">
                            <Icon icon="material-symbols:delete" class="h-6 w-6 text-red-500" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="mt-8 flex justify-end gap-4">
                    <button
                      class="text-md font-notosans inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-white shadow-md hover:bg-gray-500 hover:shadow-inner active:scale-95"
                      @click="handleCancel"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      class="text-md font-notosans inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-white shadow-md hover:bg-blue-500 hover:shadow-inner active:scale-95"
                    >
                      完成
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
