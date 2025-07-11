import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  writeBatch,
  type FirestoreDataConverter
} from 'firebase/firestore'
import {
  ThumbnailCategory,
  ThumbnailCategoryBase,
  ThumbnailCategoryCreateData,
  ThumbnailCategoryEditData
} from '@pkg/types'
import { db } from '@pkg/firebase/index'
import { ThumbnailTag, ThumbnailTagEditData } from '@/packages/types/thumbnailTag'

// firestore 轉換器
export const thumbnailConverter: FirestoreDataConverter<ThumbnailCategory> = {
  toFirestore(thumbnailCategory) {
    const { id, ...data } = thumbnailCategory
    return data
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return { ...data, id: snapshot.id } as ThumbnailCategory
  }
}

const collectionRef = collection(db, 'thumbnail_categories').withConverter(thumbnailConverter)

export async function fetchThumbnailCategory(...constraints: QueryConstraint[]) {
  const q = constraints.length > 0 ? query(collectionRef, ...constraints) : query(collectionRef)

  try {
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as ThumbnailCategory[]
  } catch (e) {
    throw e
  }
}

export async function getThumbnailCategory(id: string) {
  if (!id) throw new Error('無法找到封面類別，請稍後再試。')
  const docRef = doc(collectionRef, id)

  try {
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) throw new Error('搜尋封面類別不存在')
    return {
      ...docSnap.data(),
      id: docSnap.id
    } as ThumbnailCategory
  } catch (e) {
    throw e
  }
}

export async function fetchCategoryTags(catId: string, ...constraints: QueryConstraint[]) {
  if (!catId) throw new Error('無法找到封面類別，請稍後再試。')
  const subCollectionRef = collection(collectionRef, catId, 'tags')

  const q =
    constraints.length > 0 ? query(subCollectionRef, ...constraints) : query(subCollectionRef)

  try {
    const snapshot = await getDocs(q)
    return snapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id
        }) as ThumbnailTag
    )
  } catch (e) {
    throw e
  }
}

export async function createThumbnailCategory(value: ThumbnailCategoryCreateData) {
  try {
    await addDoc(collectionRef, {
      ...value,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    } as ThumbnailCategory)
  } catch (e) {
    throw e
  }
}

export async function editThumbnailCategory(id: string, value: ThumbnailCategoryEditData) {
  if (!id) throw new Error('無法編輯封面類別，請稍後再試。')

  const editedDocRef = doc(collectionRef, id)
  try {
    const editedDoc = await getDoc(editedDocRef)
    if (!editedDoc.exists()) throw new Error('編輯封面類別不存在')

    await setDoc(editedDocRef, {
      ...value,
      updatedAt: serverTimestamp()
    } as ThumbnailCategory)
  } catch (e) {
    throw e
  }
}

export async function replaceCategoryTags(id: string, values: ThumbnailTagEditData[]) {
  if (!id) throw new Error('無法編輯封面類別，請稍後再試。')

  const editedDocRef = doc(collectionRef, id)
  const tagsRef = collection(editedDocRef, 'tags')
  try {
    const snapshot = await getDocs(tagsRef)
    const batch = writeBatch(db)
    snapshot.forEach((doc) => batch.delete(doc.ref))

    values.forEach((tag) => batch.set(doc(tagsRef), tag))

    await batch.commit()
  } catch (e) {
    throw e
  }
}

export async function deleteCategory(id: string) {
  if (!id) throw new Error('無法刪除封面類別，請稍後再試。')

  const deletedDocRef = doc(collectionRef, id)

  if (confirm('確定要刪除這個分類嗎？')) {
    try {
      const deletedDoc = await getDoc(deletedDocRef)
      if (!deletedDoc.exists()) throw new Error('刪除封面類別不存在')

      await deleteDoc(deletedDocRef)
      console.log(`刪除成功，文件: ${id}`)
    } catch (e) {
      throw e
    }
  }
}
