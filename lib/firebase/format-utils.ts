import {
  Timestamp,
  DocumentSnapshot,
  FieldValue,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore'
import { Comment } from '@lib/types'
import { getTimestampInMillis } from './get-utils'

export const dataToJSON = <
  Data extends { createdAt: FieldValue | Timestamp | number }
>(
  snapshot: DocumentSnapshot
): Data => {
  const data = snapshot.data() as Data

  return {
    ...data,
    createdAt: getTimestampInMillis(data.createdAt),
  }
}

export const commentsToJSON = (
  commentsSnapshot: QuerySnapshot<DocumentData>
): Comment[] =>
  commentsSnapshot.docs.map((commentDoc) => {
    const comment = commentDoc.data() as Comment
    return {
      ...comment,
      createdAt: getTimestampInMillis(comment.createdAt),
    } as Comment
  })

export const formatDate = (createdAt: number | Timestamp | FieldValue = 0) =>
  (typeof createdAt === 'number'
    ? new Date(createdAt)
    : (createdAt as Timestamp).toDate()
  )
    .toISOString()
    .split('T')[0]
