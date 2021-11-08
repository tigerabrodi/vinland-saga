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
  DocumentReference,
} from 'firebase/firestore'
import { User } from 'firebase/auth'
import { Recipe, UserProfile } from '../types'
import { dataToJSON } from './format-utils'
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
    collection(firebaseDb, 'chefs'),
    where('username', '==', username),
    limit(1)
  )

  const user = (await getDocs(userQuery)).docs[0].data() as UserProfile

  if (user && user.createdAt) {
    return {
      ...user,
      createdAt: getTimestampInMillis(user.createdAt),
    }
  }
}

export const getRecipeWithSlug = async (
  slug: string,
  options?: { userToGetRecipeFrom: User | null | undefined }
) => {
  if (!slug) return

  const queryPath = options?.userToGetRecipeFrom
    ? `chefs/${options.userToGetRecipeFrom.uid}/recipes/${slug}`
    : `recipes/${slug}`

  const recipeRef = doc(firebaseDb, queryPath) as DocumentReference<Recipe>
  const recipeSnap = await getDoc<Recipe>(recipeRef)

  if (recipeSnap.exists()) {
    return dataToJSON(recipeSnap)
  }
}
