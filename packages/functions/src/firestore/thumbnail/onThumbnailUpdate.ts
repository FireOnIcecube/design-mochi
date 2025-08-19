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

    try {
      await db.runTransaction(async (tx) => {
        const docRef = db.doc(updatedDocPath)
        const snapshot = await tx.get(docRef)
        if (!snapshot.exists) return

        const categoriesData =
          (snapshot.data()?.categories as {
            category: string
            tags: string[]
          }[]) || []

        const nonEmptyCategories = categoriesData.filter((cat) => cat.tags?.length)
        const categorySlugs = nonEmptyCategories.map((cat) => cat.category)

        // 產生 usedTags（categorySlug -> tags[]）
        const usedTags = nonEmptyCategories.flatMap((cat) =>
          (cat.tags || []).map((tag) => `${cat.category}/${tag}`)
        )

        logger.info(
          `[onThumbnailUpdate]: 正在移除 ${updatedDocPath} 的空白 categories 並建立 usedCategories 索引`
        )

        tx.update(docRef, {
          categories: nonEmptyCategories,
          usedCategories: categorySlugs,
          usedTags: usedTags
        })
      })

      logger.info(`[onThumbnailUpdate]: ${updatedDocPath} 更新完成`)
    } catch (err) {
      logger.error(`[onThumbnailUpdate]: ${updatedDocPath} 更新失敗: `, err)
    }
  }
)
