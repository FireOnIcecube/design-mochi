// src/whitelist.ts
import { db } from '@pkg/firebase'
import { doc, getDoc } from 'firebase/firestore'

export async function checkWhitelist(email: string): Promise<boolean> {
  const docRef = doc(db, 'admins', email.toLowerCase())
  const docSnap = await getDoc(docRef)
  return docSnap.exists()
}
