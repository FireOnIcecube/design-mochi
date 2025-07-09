import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  getDoc,
  doc,
  where,
  setDoc,
  Timestamp
} from 'firebase/firestore'

import { db, storage } from './index'
import { ref, uploadBytes, getStorage } from 'firebase/storage'

console.log(Timestamp.now())
console.log(Timestamp.fromDate(new Date()))

// try {
//   for (let i = 1; i <= 8; i++) {
//     const docRef = await addDoc(collection(db, 'thumbnail_categories'), {
//       name: `测试分类-${i}`,
//       slug: `test-category-${i}`,
//       createdAt: serverTimestamp()
//     })
//     console.log('已寫入資料，ID: ', docRef.id)
//   }
// } catch (e) {
//   console.error('添加文檔時出錯: ', e)
// }

// const customIds = ['z03888648@gmail.com', 'kgoe8869@gmail.com']

// try {
//   customIds.forEach(async (adminId) => {
//     const docRef = doc(db, 'admins', adminId)
//     await setDoc(docRef, {})
//     console.log('Document written with ID: ', docRef.id)
//   })
// } catch (e) {
//   console.log('Error adding document: ', e)
// }

// try {
//   const docRef = await addDoc(collection(db, 'thumbnail_categories'), {
//     first: 'Fire2',
//     last: 'onIcecube2',
//     born: 1945,
//     createdAt: serverTimestamp()
//   })
//   console.log('Document written with ID: ', docRef.id)
// } catch (e) {
//   console.error('Error adding document: ', e)
// }

// const querySnapshot = await getDocs(collection(db, 'users'))
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
// })

// const docSnap = await getDoc(doc(db, 'users', 'VbavPmKc0kXrZmtRnVyE'))

// if (docSnap.exists()) {
//   console.log(`${docSnap.id} => ${JSON.stringify(docSnap.data())}`)
// } else {
//   console.log('document is not exist')
// }
