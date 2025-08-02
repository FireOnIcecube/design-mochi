import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { logger } from 'firebase-functions'
import { onRequest } from 'firebase-functions/v2/https'

export const incrementThumbnailClick = onRequest(
  {
    region: 'asia-east1'
  },
  async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')

    // 👉 處理 CORS 預檢請求（browser preflight）
    if (req.method === 'OPTIONS') {
      res.status(204).send('')
      return
    }

    const { thumbnailId } = req.body

    if (!thumbnailId) {
      res.status(400).send('找不到封面 id')
      return
    }

    try {
      const firebase = getFirestore()
      const ref = firebase.collection('thumbnails').doc(thumbnailId)
      await ref.update({
        clickCount: FieldValue.increment(1)
      })

      const snapshot = await ref.get()
      const clickCount = snapshot.data()?.clickCount ?? 0

      logger.info(
        `[incrementThumbnailClick] 已經為 ${thumbnailId} 增加點擊次數，目前: ${clickCount}`
      )
      res.status(200).send('Click recorded')
    } catch (e) {
      logger.error(`[incrementThumbnailClick] Failed to increment clickCount`, e)
      res.status(500).send('伺服器錯誤')
    }
  }
)
