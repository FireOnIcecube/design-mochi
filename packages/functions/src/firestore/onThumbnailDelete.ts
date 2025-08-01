import { logger } from 'firebase-functions'
import { onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { getFirestore } from 'firebase-admin/firestore'

export const onThumbnailDelete = onDocumentDeleted(
  {
    document: 'thumbnails/{id}',
    region: 'asia-east1'
  },
  async (event) => {
    const deletedDocPath = event.document // e.g., "thumbnails/abc123"

    logger.info(`🔥 Deleting subcollections under ${deletedDocPath}`)

    try {
      const firestore = getFirestore()
      await firestore.recursiveDelete(firestore.doc(deletedDocPath))
      logger.info(`✅ Recursive delete complete for ${deletedDocPath}`)
    } catch (err) {
      logger.error(`❌ Delete failed for ${deletedDocPath}:`, err)
    }
  }
)
