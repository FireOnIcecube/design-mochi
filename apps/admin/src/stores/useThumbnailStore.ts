import { defineStore } from 'pinia'
import { buildThumbnailQuery, fetchThumbnails } from '@pkg/firebase/db/entities/thumbnail'
import type { Thumbnail, ThumbnailQueryOptions } from '@pkg/types'

export const useThumbnailStore = defineStore('thumbnail', {
  state: () => ({
    data: [] as Thumbnail[],
    loading: false,
    error: null as Error | null,
  }),
  getters: {
    getById: (state) => (id: string) => state.data.find((t) => t.id === id),
  },
  actions: {
    async fetchAll(queryOptions: ThumbnailQueryOptions = {}) {
      this.loading = true
      this.error = null

      const q = buildThumbnailQuery(queryOptions)
      try {
        this.data = await fetchThumbnails(q)
      } catch (e) {
        if (e instanceof Error) {
          this.error = e
        } else {
          this.error = new Error(String(e))
        }
      } finally {
        this.loading = false
      }
    },
  },
})
