import { getFirestore } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions'
import { onDocumentUpdated } from 'firebase-functions/v2/firestore'

export const onThumbnailUpdate = onDocumentUpdated(
  {
    document: 'thumbnails/{id}',
    region: 'asia-east1'
  },
  async (event) => {
    const db = getFirestore()
    const updatedDocPath = event.document

    const categoriesData = event.data?.after.data().categories as {
      category: string
      tags: string[]
    }[]

    const categorySlugs = categoriesData.map((cat) => cat.category)

    try {
      await db.doc(updatedDocPath).update({
        usedCategories: categorySlugs
      })

      logger.info(
        `[onThumbnailUpdate]: ${updatedDocPath} 更新完成，使用 Category: ${JSON.stringify(categorySlugs)}`
      )
    } catch (err) {
      logger.info(`[onThumbnailUpdate]: ${updatedDocPath} 更新失敗: `, err)
    }
  }
)
