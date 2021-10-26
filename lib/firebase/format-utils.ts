import {
  Timestamp,
  DocumentSnapshot,
  FieldValue,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore'
import { Comment, Recipe } from '../types'
import { getTimestampInMillis } from './firebase'

export const recipeToJSON = (recipeSnapshot: DocumentSnapshot): Recipe => {
  const recipe = recipeSnapshot.data() as Recipe
  return {
    ...recipe,
    createdAt: getTimestampInMillis(recipe.createdAt),
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
