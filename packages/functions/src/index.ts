/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { logger } from 'firebase-functions'
// import { onRequest } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', { structuredData: true })
//   response.send('Hello from Firebase!')
// })
initializeApp()

export { onThumbnailDelete } from './firestore/onThumbnailDelete'

// export const helloWorld = onRequest({ region: 'asia-east1' }, (request, response) => {
//   logger.error('hi fireonicecube!', { structuredData: true })
//   response.send('hi from fireonicecube')
// })
