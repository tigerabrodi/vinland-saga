import {
  Timestamp,
  DocumentSnapshot,
  FieldValue,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore'
import { Comment, Recipe, UserProfile } from '@lib/types'
import { getTimestampInMillis } from './get-utils'

export const recipeToJSON = (recipeSnapshot: DocumentSnapshot): Recipe => {
  const recipe = recipeSnapshot.data() as Recipe
  return {
    ...recipe,
    createdAt: getTimestampInMillis(recipe.createdAt),
  }
}

export const userToJSON = (userSnapshot: DocumentSnapshot): UserProfile => {
  const user = userSnapshot.data() as UserProfile
  return {
    ...user,
    joined: getTimestampInMillis(user.joined),
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
