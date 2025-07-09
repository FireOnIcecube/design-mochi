import type { WithId, WithTimestamps } from './common'

export interface ThumbnailBase {
  name: string
  imageUrl: string
}

export type Thumbnail = WithId<WithTimestamps<ThumbnailBase>>
