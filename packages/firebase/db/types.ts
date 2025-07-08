import { Timestamp } from 'firebase/firestore'

export interface Font {
  id: string
  name: string
  coverUrl: string
  type: string
  createdAt: Timestamp
}

export interface Thumbnail {
  id: string
  name: string
  imageUrl: string
  options: [
    {
      id: number // 選項編號，排序用
      name: string // 顯示名稱
      value: string // 儲存用值
    }
  ]
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface ThumbnailCategory {
  id?: string
  slug: string
  name: string
  createdAt: Timestamp
}

export interface ThumbnailTag {
  id: string
  slug: string
  name: string
  createdAt: Timestamp
}
