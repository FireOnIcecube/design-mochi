import { Timestamp } from 'firebase/firestore'
import type { FirestoreQueryOptions } from './firestoreQuery'
import type { NonEmptyArray, WithId, WithTimestamps, WithArchived } from './common'

export interface ThumbnailBase {
  name: string
  imageUrl: string
  videoId: string
  isVtuber: boolean
  clickCount: number
  categories: NonEmptyArray<{ category: string; tags: NonEmptyArray<string> }>
}

export type Thumbnail = WithId<WithTimestamps<WithArchived<ThumbnailBase>>>

export type ThumbnailQueryOptions = FirestoreQueryOptions<keyof Thumbnail>
