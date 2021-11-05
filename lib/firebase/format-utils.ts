import {
  Timestamp,
  DocumentSnapshot,
  FieldValue,
  QuerySnapshot,
} from 'firebase/firestore'
import { Comment, CreatedAt } from '@lib/types'
import { getTimestampInMillis } from './get-utils'

export const dataToJSON = <Data extends CreatedAt>(
  snapshot: DocumentSnapshot<Data>
): Data => {
  const data = snapshot.data() as Data

  return {
    ...data,
    createdAt: getTimestampInMillis(data.createdAt),
  }
}

export const commentsToJSON = (
  commentsSnapshot: QuerySnapshot<Comment>
): Comment[] =>
  commentsSnapshot.docs.map((commentDoc) => dataToJSON(commentDoc))

export const formatDate = (createdAt: number | Timestamp | FieldValue = 0) =>
  (typeof createdAt === 'number'
    ? new Date(createdAt)
    : (createdAt as Timestamp).toDate()
  )
    .toISOString()
    .split('T')[0]
