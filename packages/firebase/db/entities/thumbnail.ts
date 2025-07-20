import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  type FirestoreDataConverter
} from 'firebase/firestore'
import { db } from '@pkg/firebase'
import { Thumbnail, ThumbnailBase } from '@pkg/types'

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
