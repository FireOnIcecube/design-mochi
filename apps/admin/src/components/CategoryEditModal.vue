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

import type { ThumbnailCategory, ThumbnailTag } from '@pkg/firebase/db/types'
import { onMounted, reactive, ref } from 'vue'
import { ThumbnailCategoryBase } from '@/packages/types'

const props = defineProps<{
  id: string
}>()

const emit = defineEmits<{
  (e: 'refetch'): void
  (e: 'submit'): void
}>()

const isOpen = ref(false)
const form = reactive<ThumbnailCategoryBase>({
  name: '',
  slug: '',
  tags: [],
})

const errors = reactive({
  name: '',
  slug: '',
})

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
  isOpen.value = true
  await getEditedDoc(props.id)
  await getEditedTags(props.id)
}

async function handleSubmit() {}
function handleClear() {}
</script>
<template>
  <button type="button" @click="openModal" class="cursor-pointer text-blue-600 hover:underline">
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
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

                  <div class="mt-4 flex justify-end gap-4">
                    <button
                      type="reset"
                      class="text-md font-notosans inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-white shadow-md hover:bg-gray-500 hover:shadow-inner"
                      @click="handleClear"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      class="text-md font-notosans inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-white shadow-md hover:bg-blue-500 hover:shadow-inner"
                    >
                      完成
                    </button>
                  </div>

                  <table
                    v-if="form.tags && form.tags.length > 0"
                    class="min-w-full rounded border bg-white shadow-sm"
                  >
                    <thead>
                      <tr>
                        <th class="border-b px-4 py-2">名稱</th>
                        <th class="border-b px-4 py-2">識別名</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(tag, index) in form.tags" :key="index">
                        <td class="border-b px-4 py-2">{{ tag.name }}</td>
                        <td class="border-b px-4 py-2">{{ tag.slug }}</td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
