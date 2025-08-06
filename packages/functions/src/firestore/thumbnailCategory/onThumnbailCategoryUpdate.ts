import { get } from 'axios'
import { getFirestore } from 'firebase-admin/firestore'
import { onDocumentDeleted, onDocumentUpdated } from 'firebase-functions/firestore'
import type { ThumbnailTag } from '@pkg/types'

export const onThumbnailUpdate = onDocumentUpdated(
  {
    document: 'thumbnail_categories/{id}',
    region: 'asia-east1'
  },
  async (event) => {
    const db = getFirestore()
    const newValue = event.data?.after.data()

    const newTags = newValue?.tags as ThumbnailTag | undefined
  }
)

// async function replaceTagsFromThumbnail(slug)
