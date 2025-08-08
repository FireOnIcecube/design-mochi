// import { getFirestore } from 'firebase-admin/firestore'
// import { , onDocumentUpdated } from 'firebase-functions/firestore'
// import type { ThumbnailTag } from '@pkg/types'
// import { logger } from 'firebase-functions'

// export const onThumbnailCategoryUpdate = onDocumentUpdated(
//   {
//     document: 'thumbnail_categories/{id}',
//     region: 'asia-east1'
//   },
//   async (event) => {
//     const db = getFirestore()
//     const updatedDocPath = event.document

//     const beforeData = event.data?.before.data()
//     const afterData = event.data?.after.data()

//     const categorySlug = event.data?.after.data().slug as string
//     const newTags = afterData?.tags as ThumbnailTag[] | undefined

//     if (!categorySlug || !updatedDocPath) {
//       logger.warn('[onThumbnailCategoryUpdate]: 缺少變更的 categorySlug')
//       return
//     }

//     try {
//       logger.info(`[onThumbnailCategoryUpdate]: Category "${categorySlug} 已經修改"`)

//       if (!newTags?.length) {
//         logger.info('[onThumbnailCategoryUpdate]: Category 底下並沒有任何 Tag')
//         return
//       }

//       //   const affected = await replaceTagsFromThumbnail(categorySlug, newTags)
//     } catch (e) {
//       throw e
//     }
//   }
// )

// async function replaceTagsFromThumbnail(categorySlug: string, newTags: ThumbnailTag[]) {
//   const db = getFirestore()

//   try {
//     const thumbnailsSnapshot = await db.collection('thumbnails').where('categories','array-contains',categorySlug).get()
//     const batch = db.batch()
//     let affected = 0

//     for( const doc of thumbnailsSnapshot.docs ) {
//       const data = doc.data()
//       const
//     }

//   }

// }
