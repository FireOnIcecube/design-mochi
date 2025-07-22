import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  where,
  type FirestoreDataConverter
} from 'firebase/firestore'
import { db } from '@pkg/firebase'
import type { Thumbnail, ThumbnailBase, ThumbnailQueryOptions } from '@pkg/types'

// firestore 轉換器
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

export async function fetchThumbnails(...constraints: QueryConstraint[]) {
  const q =
    constraints.length > 0
      ? query(collectionRef, ...constraints)
      : query(collectionRef, orderBy('createdAt', 'asc'))

  try {
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Thumbnail[]
  } catch (e) {
    throw e
  }
}

export async function createThumbnail(value: ThumbnailBase) {
  const docRef = doc(collectionRef, value.videoId)
  try {
    await setDoc(docRef, {
      ...value,
      videoId: value.videoId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    } as Thumbnail)
  } catch (e) {
    throw e
  }
}

export async function getThumbnail(id: string) {
  const docRef = doc(collectionRef, id)
  try {
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) throw new Error('Thumbnail not found')

    return { ...snapshot.data(), id: snapshot.id } as Thumbnail
  } catch (e) {
    throw e
  }
}

export async function queryThumbnail(options: ThumbnailQueryOptions) {
  let q = query(collectionRef)

  if (options.createdAfter) q = query(q, where('createdAt', '>', options.createdAfter))
  if (options.createdBefore) q = query(q, where('createdAt', '<', options.createdBefore))
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

  if (options.order) {
    const [[field, direction]] = Object.entries(options.order) as [string, 'asc' | 'desc'][]

    q = query(q, orderBy(field, direction))
  }

  if (options.limit) q = query(q, limit(options.limit))

  try {
    const snapshot = await getDocs(q)

    return snapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id
        }) as Thumbnail
    )
  } catch (e) {
    throw e
  }
}
