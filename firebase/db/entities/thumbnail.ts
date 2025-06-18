import { type FirestoreDataConverter } from 'firebase/firestore'
import { Thumbnail } from '../types'

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
