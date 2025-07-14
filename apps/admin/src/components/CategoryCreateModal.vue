<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { db } from '@pkg/firebase/index'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { thumbnailConverter } from '@/packages/firebase/db/entities/thumbnailCategory'

const categoriesCollectionRef = collection(db, 'thumbnail_categories').withConverter(
  thumbnailConverter,
)

const isOpen = ref(false)
const form = reactive({
  name: '',
  slug: '',
})

const errors = reactive({
  name: '',
  slug: '',
})

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
  handleClear()
}

const emit = defineEmits<{
  (e: 'submit', formData: { name: string; slug: string }): void
}>()

async function handleSubmit() {
  if (await validate()) {
    emit('submit', { ...form })
    closeModal()
  }
}

async function validate() {
  errors.name = ''
  errors.slug = ''

  if (!form.name.trim()) errors.name = '名稱是必填的'
  if (!form.slug.trim()) {
    errors.slug = '識別名是必填的'
  }
  // 正則表達式， 處理 query 的非法字元
  else if (!/^(?:[a-z0-9\-._~]|%[0-9a-f]{2})+$/.test(form.slug)) {
    errors.slug = '僅允許小寫字母、數字與 -._~'
  }

  // 驗證識別名是否已存在
  const q = query(categoriesCollectionRef, where('slug', '==', form.slug.trim()))
  const isExist = await getDocs(q).then((docs) => !docs.empty)
  if (isExist) errors.slug = '該識別名已存在'

  return !errors.name && !errors.slug
}

function handleClear() {
  form.name = ''
  form.slug = ''
  errors.name = ''
  errors.slug = ''
}

function handleCancel() {
  handleClear()
  isOpen.value = false
}
</script>

<template>
  <button
    type="button"
    @click="openModal"
    class="font-notosans cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
  >
    新增分類
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
                  新增分類
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
                      @click="handleCancel"
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
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
