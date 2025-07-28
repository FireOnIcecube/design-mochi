import { Timestamp } from 'firebase/firestore'
import type { FirestoreQueryOptions } from './firestoreQuery'
import type { NonEmptyArray, WithId, WithTimestamps, WithHidden } from './common'

export interface ThumbnailBase {
  name: string
  imageUrl: string
  videoId: string
  categories: NonEmptyArray<{ category: string; tags: NonEmptyArray<string> }>
}

export type Thumbnail = WithId<WithTimestamps<WithHidden<ThumbnailBase>>>

export type ThumbnailQueryOptions = FirestoreQueryOptions<keyof Thumbnail>
