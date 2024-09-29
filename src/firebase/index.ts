// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'

import process from 'process'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB3LW9HF9nmXKj0pxtOcXTk1nMpdJrxzks',
  authDomain: 'design-mochi.firebaseapp.com',
  projectId: 'design-mochi',
  storageBucket: 'design-mochi.appspot.com',
  messagingSenderId: '251093326008',
  appId: '1:251093326008:web:ecff57bcd5de677dc1fc4d',
  measurementId: 'G-9M90SRNF58'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)

// const analytics = getAnalytics(app);
