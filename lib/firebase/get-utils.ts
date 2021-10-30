import {
  Timestamp,
  collection,
  query,
  where,
  getDocs,
  limit,
  doc,
  getDoc,
  FieldValue,
} from 'firebase/firestore'
import { User } from 'firebase/auth'
import { UserProfile } from '../types'
import { recipeToJSON } from './format-utils'
import { firebaseDb } from './firebase'

export const getTimestampInMillis = (date: number | FieldValue | Timestamp) =>
  typeof date === 'number'
    ? date
    : typeof date === 'object' && date !== null
    ? (date as Timestamp).toMillis()
    : 0

export const getUserWithUsername = async (username: string) => {
  if (!username) return

  const userQuery = query(
    collection(firebaseDb, 'users'),
    where('username', '==', username),
    limit(1)
  )

  const user = (await getDocs(userQuery)).docs[0].data() as UserProfile

  if (user && user.createdAt) {
    return {
      ...user,
      joined: getTimestampInMillis(user.createdAt),
    }
  }
}

export const getRecipeWithSlug = async (
  slug: string,
  options?: { userToGetRecipeFrom: User | null | undefined }
) => {
  if (!slug) return

  const queryPath = options?.userToGetRecipeFrom
    ? `users/${options.userToGetRecipeFrom.uid}/recipes/${slug}`
    : `recipes/${slug}`

  const recipeRef = doc(firebaseDb, queryPath)
  const recipeSnap = await getDoc(recipeRef)

  if (recipeSnap.exists()) {
    return recipeToJSON(recipeSnap)
  }
}
