import type { WithId, WithTimestamps } from './common'

export interface ThumbnailTagBase {
  slug: string
  name: string
}

export type ThumbnailTag = WithId<ThumbnailTagBase>

export type ThumbnailTagCreateData = Pick<ThumbnailTagBase, 'name' | 'slug'>

export type ThumbnailTagEditData = Pick<ThumbnailTagBase, 'name' | 'slug'>
