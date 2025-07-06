import { type FirestoreDataConverter } from 'firebase/firestore'
import { ThumbnailCategory } from '../types'

// firestore 轉換器
export const thumbnailConverter: FirestoreDataConverter<ThumbnailCategory> = {
  toFirestore(thumbnailCategory: ThumbnailCategory) {
    return thumbnailCategory
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return { ...data, id: snapshot.id } as ThumbnailCategory
  }
}
