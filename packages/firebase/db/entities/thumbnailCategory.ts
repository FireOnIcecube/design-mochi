import { type FirestoreDataConverter } from 'firebase/firestore'
import { ThumbnailCategory } from '@pkg/types'

// firestore 轉換器
export const thumbnailConverter: FirestoreDataConverter<ThumbnailCategory> = {
  toFirestore(thumbnailCategory: ThumbnailCategory) {
    const { id, ...data } = thumbnailCategory
    return data
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return { ...data, id: snapshot.id } as ThumbnailCategory
  }
}
