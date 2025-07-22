import type { Timestamp } from 'firebase/firestore'

// 通用 Firestore 查詢條件型別
export type FirestoreQueryOptions<TFieldNames extends string = string> = {
  createdAfter?: Timestamp
  createdBefore?: Timestamp
  limit?: number
  order?: { [K in TFieldNames]: Record<K, 'asc' | 'desc'> }[TFieldNames]
  whereEquals?: Partial<Record<TFieldNames, unknown>>
  whereIn?: Partial<Record<TFieldNames, unknown[]>>
  whereArrayContains?: Partial<Record<TFieldNames, unknown[]>>
}
