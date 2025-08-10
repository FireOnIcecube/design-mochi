import { getFirestore } from 'firebase-admin/firestore'
import { onDocumentUpdated } from 'firebase-functions/firestore'
import { logger } from 'firebase-functions'

export const onThumbnailCategoryUpdate = onDocumentUpdated(
  {
    document: 'thumbnail_categories/{id}',
    region: 'asia-east1'
  },
  async (event) => {
    const updatedDocPath = event.document

    const afterData = event.data?.after.data()

    const categorySlug = event.data?.after.data().slug as string
    const newTagSlugs = afterData?.tags.map((t: any) => t.slug) as string[]

    if (!categorySlug || !updatedDocPath) {
      logger.warn('[onThumbnailCategoryUpdate]: 缺少變更的 categorySlug')
      return
    }

    try {
      logger.info(`[onThumbnailCategoryUpdate]: Category "${categorySlug} 已經修改"`)

      const affected = await replaceTagsFromThumbnail(categorySlug, newTagSlugs)

      logger.info(`[replaceTagsFromThumbnail]: 替換 tag 完成，共影響 ${affected} 個封面`)
    } catch (e) {
      logger.error(`[onThumbnailCategoryUpdate]: 更新封面使用 Tag 時失敗: `, e)
    }
  }
)

async function replaceTagsFromThumbnail(categorySlug: string, newTagSlugs: string[]) {
  const db = getFirestore()

  try {
    // 找出有使用更改 category 的 thumbnail
    const thumbnailsSnapshot = await db
      .collection('thumbnails')
      .where('usedCategories', 'array-contains', categorySlug)
      .get()

    const batch = db.batch()
    let affected = 0

    for (const doc of thumbnailsSnapshot.docs) {
      const data = doc.data()
      const originalCategories = data.categories || []

      const udpatedCatIndex = originalCategories.findIndex(
        (item: { category: string; tags: string[] }) => item.category === categorySlug
      )

      if (udpatedCatIndex === -1) {
        logger.warn(
          `[replaceTagsFromThumbnail]: 封面: ${data.name} ，中並沒有 ${categorySlug} 這個category`
        )
        continue
      }

      // 將 新Category 中不存在的 tag 從Thumbnail 中移除
      const newCategories = originalCategories.map(
        (item: { category: string; tags: string[] }, index: number) => {
          if (index !== udpatedCatIndex) return { ...item, tags: [...item.tags] }

          // 過濾出新陣列中有的 tags
          const filteredTags = item.tags.filter((tag) => newTagSlugs.includes(tag))

          return {
            category: categorySlug,
            tags: [...filteredTags]
          }
        }
      )

      batch.update(doc.ref, { categories: newCategories })
      affected++
    }

    await batch.commit()

    return affected
  } catch (err) {
    throw err
  }
}
