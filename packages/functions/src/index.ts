/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { initializeApp } from 'firebase-admin/app'

initializeApp()

export { onThumbnailDelete } from './firestore/thumbnail/onThumbnailDelete'
export { incrementThumbnailClick } from './https/incrementThumbnailClick'
export { onThumbnailCategoryDelete } from './firestore/thumbnailCategory/onThumbnailCategoryDelete'
export { onThumbnailUpdate } from './firestore/thumbnail/onThumbnailUpdate'
export { onThumbnailCreate } from './firestore/thumbnail/onThumbnailCreate'

// export { onThumbnailCategoryUpdate } from './firestore/thumbnailCategory/onThumbnailCategoryUpdate'
