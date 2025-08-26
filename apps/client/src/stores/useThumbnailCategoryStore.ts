import {
  buildCategoryQuery,
  fetchThumbnailCategories
} from '@/packages/firebase/db/entities/thumbnailCategory'
import { ThumbnailCategory, ThumbnailCategoryQueryOptions } from '@/packages/types'
import { defineStore } from 'pinia'

export const useThumbnailCategoryStore = defineStore('thumbnailCategory', {
  state: () => ({
    data: [] as ThumbnailCategory[],
    loading: false,
    error: null as Error | null
  }),
  getters: {
    getById: (state) => (id: string) => state.data.find((cat) => cat.id === id)
  },
  actions: {
    async fetchAll(queryOptions: ThumbnailCategoryQueryOptions = {}) {
      this.loading = true
      this.error = null

      const q = buildCategoryQuery(queryOptions)
      try {
        this.data = await fetchThumbnailCategories(q)
      } catch (e) {
        if (e instanceof Error) {
          this.error = e
        } else {
          this.error = new Error(String(e))
        }
      } finally {
        this.loading = false
      }
    }
  }
})
