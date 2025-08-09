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

    const nonEmptyCategories = categoriesData.filter((cat) => cat.tags?.length)
    const categorySlugs = nonEmptyCategories.map((cat) => cat.category)

    try {
      logger.info(`[onThumbnailUpdate]: 正在移除 ${updatedDocPath} 的空白 categorys`)

      await db.doc(updatedDocPath).update({
        categories: nonEmptyCategories
      })
      logger.info(`[onThumbnailUpdate]: 已經移除 ${updatedDocPath} 的空白 categorys`)

      logger.info(`[onThumbnailUpdate]: 正在建立 ${updatedDocPath} usedCategories 索引`)
      await db.doc(updatedDocPath).update({
        usedCategories: categorySlugs
      })
      logger.info(`[onThumbnailUpdate]: 已經建立 ${updatedDocPath} usedCategories 索引`)

      logger.info(
        `[onThumbnailUpdate]: ${updatedDocPath} 更新完成，使用 Category: ${JSON.stringify(categorySlugs)}`
      )
    } catch (err) {
      logger.info(`[onThumbnailUpdate]: ${updatedDocPath} 更新失敗: `, err)
    }
  }
)
