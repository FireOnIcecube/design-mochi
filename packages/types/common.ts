import type { Timestamp } from 'firebase/firestore'

export type WithId<T> = T & { id: string }

export type WithTimestamps<T> = T & { createdAt: Timestamp; updatedAt: Timestamp }
