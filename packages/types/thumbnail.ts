import type { NonEmptyArray, WithId, WithTimestamps } from './common'

export interface ThumbnailBase {
  name: string
  imageUrl: string
  videoId: string
  categories: NonEmptyArray<{ category: string; tags: NonEmptyArray<string> }>
}

export type Thumbnail = WithId<WithTimestamps<ThumbnailBase>>
