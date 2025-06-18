import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  type FirestoreDataConverter
} from 'firebase/firestore'
import type { Font } from '../types'

// API
export function fetchFontCollection(db: Firestore) {
  return collection(db, 'fonts').withConverter(fontConverter)
}

export function fetchFontDoc(db: Firestore, id: string) {
  return doc(fetchFontCollection(db), id)
}

export async function fetchFont(db: Firestore, id: string) {
  const docRef = fetchFontDoc(db, id)
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}

export async function fetchFontList(db: Firestore): Promise<Font[]> {
  const querySnapshot = await getDocs(fetchFontCollection(db))

  return querySnapshot.docs.map((doc) => doc.data())
}

export async function addFont(db: Firestore, data: Font) {
  await setDoc(fetchFontDoc(db, data.id), data)
}

export async function updateFont(db: Firestore, id: string, data: Partial<Font>) {
  await updateDoc(fetchFontDoc(db, id), data)
}

// firestore 轉換器
export const fontConverter: FirestoreDataConverter<Font> = {
  toFirestore(font: Font) {
    return font
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return { ...data, id: snapshot.id, coverUrl: data.cover_url } as Font
  }
}
