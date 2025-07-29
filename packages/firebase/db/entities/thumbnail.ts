import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  Query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  where,
  getCountFromServer,
  type FirestoreDataConverter,
  updateDoc
} from 'firebase/firestore'
import { db } from '@pkg/firebase'
import type { Thumbnail, ThumbnailBase, ThumbnailQueryOptions } from '@pkg/types'
import { WithHidden } from '@/packages/types/common'

export const thumbnailConverter: FirestoreDataConverter<Thumbnail> = {
  toFirestore(thumbnail: Thumbnail) {
    return thumbnail
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return { ...data } as Thumbnail
  }
}

const collectionRef = collection(db, 'thumbnails').withConverter(thumbnailConverter)

/**
 * 建立 Query，若 options 沒帶 order，會使用預設 orderBy('createdAt', 'asc')
 */
export function buildThumbnailQuery(options: ThumbnailQueryOptions = {}): Query<Thumbnail> {
  let q: Query<Thumbnail> = collectionRef

  if (options.createdAfter) q = query(q, where('createdAt', '>', options.createdAfter))
  if (options.createdBefore) q = query(q, where('createdAt', '<', options.createdBefore))
  if (options.isHidden !== undefined) q = query(q, where('isHidden', '==', options.isHidden))

  if (options.whereEquals) {
    for (const [key, value] of Object.entries(options.whereEquals)) {
      if (value !== undefined) q = query(q, where(key, '==', value))
    }
  }

  if (options.whereIn) {
    for (const [key, value] of Object.entries(options.whereIn)) {
      if (value !== undefined && value.length > 0) q = query(q, where(key, 'in', value))
    }
  }

  if (options.whereArrayContains) {
    for (const [key, value] of Object.entries(options.whereArrayContains)) {
      if (value !== undefined && value.length > 0) q = query(q, where(key, 'array-contains', value))
    }
  }

  // 如果沒有 order，預設按 createdAt 降冪排序
  if (options.order) {
    const [[field, direction]] = Object.entries(options.order) as [string, 'asc' | 'desc'][]
    q = query(q, orderBy(field, direction))
  } else {
    q = query(q, orderBy('createdAt', 'desc'))
  }

  if (options.limit) q = query(q, limit(options.limit))

  return q
}

/**
 * 用 Query 查詢並回傳縮圖陣列
 */
export async function fetchThumbnails(q: Query<Thumbnail>): Promise<Thumbnail[]> {
  try {
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  } catch (e) {
    throw e
  }
}

/**
 * 用 Query 查詢符合條件的文件數量
 */
export async function countThumbnailsByQuery(q: Omit<Query<Thumbnail>, 'limit'>): Promise<number> {
  try {
    const snapshot = await getCountFromServer(q)
    return snapshot.data().count
  } catch (e) {
    throw e
  }
}

/**
 * 單筆取得，直接用 docRef，因為不需要 Query
 */
export async function getThumbnail(id: string): Promise<Thumbnail> {
  const docRef = doc(collectionRef, id)
  try {
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) throw new Error('Thumbnail not found')
    return { ...snapshot.data(), id: snapshot.id } as Thumbnail
  } catch (e) {
    throw e
  }
}

/**
 * 修改指定縮圖欄位，並更新 updatedAt。
 */
export async function editThumbnail(
  id: string,
  data: Partial<WithHidden<ThumbnailBase>>
): Promise<Thumbnail> {
  const docRef = doc(collectionRef, id)

  try {
    // 更新指定欄位 + updatedAt
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    })

    // 重新取得最新資料
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) throw new Error('Thumbnail not found')

    return { ...snapshot.data(), id: snapshot.id } as Thumbnail
  } catch (error) {
    throw error
  }
}

/**
 * 新增縮圖
 */
export async function createThumbnail(data: ThumbnailBase) {
  const docRef = doc(collectionRef, data.videoId)
  try {
    await setDoc(docRef, {
      ...data,
      videoId: data.videoId,
      isHidden: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    } as Thumbnail)
  } catch (e) {
    throw e
  }
}
