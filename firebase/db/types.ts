import { Timestamp } from 'firebase/firestore'

export interface Font {
  id: string
  name: string
  coverUrl: string
  type: string
  createdAt: Timestamp
}

export interface Thumbnail {
  id: string // e.g. "STYLE"
  label: string // 中文名稱，如 "風格"
  imageUrl: string
  options: [
    {
      id: number // 選項編號，排序用
      label: string // 顯示名稱
      value: string // 儲存用值
    }
  ]
  createdAt: Timestamp
  updatedAt: Timestamp
}
