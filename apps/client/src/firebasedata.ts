import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  getDoc,
  doc,
  where
} from 'firebase/firestore'
import { db, storage } from '../../../firebase'
import { ref, uploadBytes, getStorage } from 'firebase/storage'

// try {
//   const docRef = await addDoc(collection(db, 'users'), {
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
