import { Timestamp } from 'firebase/firestore'

export interface ThumbnailTag {
  id: string
  slug: string
  name: string
  createdAt: Timestamp
}
