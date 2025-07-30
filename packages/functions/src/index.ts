/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/https'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', { structuredData: true })
//   response.send('Hello from Firebase!')
// })

export { onThumbnailDelete } from './firestore/onThumbnailDelete'

export const helloWorld = onRequest((request, response) => {
  logger.error('Hello logs!', { structuredData: true })
  response.send('test from fireonicecube')
})
