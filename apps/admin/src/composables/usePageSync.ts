import { ComputedRef, Ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function usePageSync(currentPage: Ref<number>, totalPages: ComputedRef<number>) {
  const route = useRoute()
  const router = useRouter()

  // 監聽 目前頁數， 變更 url
  watch(currentPage, (newPage) => {
    router.push({
      query: {
        ...route.query,
        page: newPage.toString(),
      },
    })
  })

  // 監聽 url ， 變更 目前頁數，對 總頁數 進行防呆處理
  watch(
    () => route.query.page,
    (newPage) => {
      const page = Number(newPage)

      if (!totalPages.value) return

      if (!Number.isInteger(page) || page < 1 || page > totalPages.value) {
        currentPage.value = 1
      } else {
        currentPage.value = page
      }
    },
    { immediate: true },
  )

  // 監聽 總頁數 ，變更 目前頁數
  watch(totalPages, (newTotal) => {
    const page = Number(currentPage.value)

    if (!Number.isInteger(page) || page < 1 || page > newTotal) {
      currentPage.value = 1
    }
  })
}
