import { getFirestore } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions'
import { onDocumentDeleted } from 'firebase-functions/firestore'

export const onThumbnailCategoryDelete = onDocumentDeleted(
  {
    document: 'thumbnail_categories/{id}',
    region: 'asia-east1'
  },
  async (event) => {
    const db = getFirestore()
    const snapshot = event.data
    const slug = snapshot?.data()?.slug as string | undefined
    const deletedDocPath = event.document

    if (!slug || !deletedDocPath) {
      logger.warn('[onThumbnailCategoryDelete]: Missing slug or document path in deleted category.')
      return
    }

    try {
      logger.info(`🗑️[onThumbnailCategoryDelete]: Category "${slug}" was deleted.`)

      const affected = await removeCategoryFromThumbnails(slug)
      logger.info(`✅ Removed category "${slug}" from ${affected} thumbnails.`)

      await db.recursiveDelete(db.doc(deletedDocPath))
      logger.info(`🧹[onThumbnailCategoryDelete]: Subcollections under ${deletedDocPath} deleted.`)
    } catch (error: any) {
      logger.error(
        '[onThumbnailCategoryDelete]: Error while cleaning up after category deletion:',
        {
          error: error.message || error,
          slug,
          deletedDocPath
        }
      )
    }
  }
)

async function removeCategoryFromThumbnails(slug: string) {
  const db = getFirestore()

  try {
    const thumbnailsSnapshot = await db.collection('thumbnails').get()
    const batch = db.batch()
    let affected = 0

    for (const doc of thumbnailsSnapshot.docs) {
      const data = doc.data()
      const originalCategories = data.categories || []

      const filtered = originalCategories.filter((item: any) => item.category !== slug)

      if (filtered.length !== originalCategories.length) {
        batch.update(doc.ref, { categories: filtered })
        affected++
      }
    }

    await batch.commit()
    return affected
  } catch (error: any) {
    throw new Error(
      `[onThumbnailCategoryDelete]: removeCategoryFromThumbnails() failed for slug "${slug}": ${error.message || error}`
    )
  }
}
