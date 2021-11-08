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
import { Recipe, ChefProfile } from '../types'
import { dataToJSON } from './format-utils'
import { firebaseDb } from './firebase'

export const getTimestampInMillis = (date: number | FieldValue | Timestamp) =>
  typeof date === 'number'
    ? date
    : typeof date === 'object' && date !== null
    ? (date as Timestamp).toMillis()
    : 0

export const getChefWithUsername = async (username: string) => {
  if (!username) return

  const chefsQuery = query(
    collection(firebaseDb, 'chefs'),
    where('username', '==', username),
    limit(1)
  )

  const chef = (await getDocs(chefsQuery)).docs[0].data() as ChefProfile

  if (chef && chef.createdAt) {
    return {
      ...chef,
      createdAt: getTimestampInMillis(chef.createdAt),
    }
  }
}

export const getRecipeWithSlug = async (
  slug: string,
  options?: { chefToGetRecipeFrom: User | null | undefined }
) => {
  if (!slug) return

  const queryPath = options?.chefToGetRecipeFrom
    ? `chefs/${options.chefToGetRecipeFrom.uid}/recipes/${slug}`
    : `recipes/${slug}`

  const recipeRef = doc(firebaseDb, queryPath) as DocumentReference<Recipe>
  const recipeSnap = await getDoc<Recipe>(recipeRef)

  if (recipeSnap.exists()) {
    return dataToJSON(recipeSnap)
  }
}
