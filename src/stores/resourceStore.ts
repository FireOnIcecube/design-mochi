import { reactive } from 'vue'
import { db } from '@/firebase'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'

interface Resource {
  id: string
  name: string
  type: string
  tags: string[]
  cover_url: string
}

interface Font extends Resource {}

export type CollectionName = 'fonts'

export interface CollectionType {
  fonts: Font
}

export const resourceData = reactive({
  fonts: [] as Font[],

  async getResource<K extends CollectionName>(
    collection: K,
    id: string
  ): Promise<CollectionType[K] | null> {
    if (!(collection in this)) {
      throw new Error(`查無此類型資料: "${collection}"`)
    }

    const collectionArray = this[collection] as CollectionType[K][]

    const existing = collectionArray.find((item) => item.id === id)
    if (existing) {
      return existing
    } else {
      try {
        const docRef = doc(db, collection, id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = { ...docSnap.data(), id: docSnap.id } as CollectionType[K]
          collectionArray.push(data)
          return data
        } else {
          console.error(`查無資料 ${collection}!`)
          return null
        }
      } catch (error) {
        console.error(`資料讀取錯誤 ${collection}:`, error)
        return null
      }
    }
  },

  async getAllResources<K extends CollectionName>(collectionName: K): Promise<void> {
    try {
      const collectionRef = collection(db, collectionName)
      const collectionSnapshot = await getDocs(collectionRef)
      const collectionArray = this[collectionName] as Array<CollectionType[K]>
      collectionSnapshot.docs.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id } as CollectionType[K]
        collectionArray.push(data)
      })
    } catch (error) {
      console.error(`資料讀取錯誤 ${collectionName}:`, error)
    }
  }
})
