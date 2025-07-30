import { logger } from 'firebase-functions'
import { onDocumentDeleted } from 'firebase-functions/firestore'

export const onThumbnailDelete = onDocumentDeleted(
  { document: 'thumbnails/{id}', region: 'asia-east1' },
  async (event) => {
    const id = event.params.id
    logger.error(`[onThumbnailDelete] triggered for thumbnail id: ${id}`)
  }
)
