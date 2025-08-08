import { getFirestore } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'

export const onThumbnailCreate = onDocumentCreated(
  {
    document: 'thumbnails/{id}',
    region: 'asia-east1'
  },
  async (event) => {
    const db = getFirestore()
    const createdDocPath = event.document

    const categoriesData = event.data?.data().categories as {
      category: string
      tags: string[]
    }[]

    const categorySlugs = categoriesData.map((cat) => cat.category)

    try {
      await db.doc(createdDocPath).update({
        usedCategories: categorySlugs
      })

      logger.info(
        `[onThumbnailCreate]: ${createdDocPath} 創建完成，使用 Category: ${JSON.stringify(categorySlugs)}`
      )
    } catch (err) {
      logger.error(`[onThumbnailCreate]:  ${createdDocPath} 創建失敗:`, err)
    }
  }
)
