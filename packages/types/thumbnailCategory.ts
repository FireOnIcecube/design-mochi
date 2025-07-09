import type { WithId, WithTimestamps } from './common'
import type { ThumbnailTag } from './thumbnailTag'

export interface ThumbnailCategoryBase {
  name: string
  slug: string
  tags?: ThumbnailTag[]
}

// firebase store 中的 ThumbnailCategorys
export type ThumbnailCategory = WithId<WithTimestamps<ThumbnailCategoryBase>>

// 創建用表單
export type ThumbnailCategoryCreateForm = Pick<ThumbnailCategoryBase, 'name' | 'slug'>

// 編輯用表單
export type ThumbnailCategoryEditForm = Pick<ThumbnailCategoryBase, 'name' | 'tags'>
