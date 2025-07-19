import {
  collection,
  doc,
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
