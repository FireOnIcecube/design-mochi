import { Timestamp } from 'firebase/firestore'

export interface Font {
  id: string
  name: string
  coverUrl: string
  type: string
  createdAt: Timestamp
}
