import type { NonEmptyArray, WithId, WithTimestamps } from './common'

export interface ThumbnailBase {
  name: string
  imageUrl: string
  categories: NonEmptyArray<{ category: string; tags: NonEmptyArray<string> }>
}

export type Thumbnail = WithId<WithTimestamps<ThumbnailBase>>
