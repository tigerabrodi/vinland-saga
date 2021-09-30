import { initializeApp } from 'firebase/app'
import { getAuth, User } from 'firebase/auth'
import {
  Timestamp,
  collection,
  getFirestore,
  DocumentSnapshot,
  query,
  where,
  getDocs,
  limit,
  doc,
  getDoc,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { Recipe, UserProfile } from './types'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_APP_API_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_APP_API_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_APP_API_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_APP_API_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_API_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export const firebaseDb = getFirestore(firebaseApp)

// Auth export
export const auth = getAuth(firebaseApp)

// Firestore Utils
export const fromMillis = Timestamp.fromMillis

// Storage export
export const storage = getStorage(firebaseApp)

export const getUserWithUsername = async (username: string) => {
  if (!username) {
    return
  }

  const userQuery = query(
    collection(firebaseDb, 'users'),
    where('username', '==', username),
    limit(1)
  )

  const user = (await getDocs(userQuery)).docs[0].data() as UserProfile

  if (user && user.joined) {
    return {
      ...user,
      joined: (user.joined as Timestamp).toMillis(),
    }
  }
}

export const getRecipeWithSlug = async (
  slug: string,
  options?: { userToGetRecipeFrom: User | null | undefined }
) => {
  if (!slug) {
    return
  }

  const queryPath = options?.userToGetRecipeFrom
    ? `users/${options.userToGetRecipeFrom.uid}/recipes/${slug}`
    : `recipes/${slug}`

  const docRef = doc(firebaseDb, queryPath)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const recipe = docSnap.data() as Recipe

    return {
      ...recipe,
      createdAt: (recipe.createdAt as Timestamp).toMillis(),
    } as Recipe
  }
}

export const recipeToJSON = (
  recipeDocument: DocumentSnapshot<{
    createdAt: Timestamp
    updatedAt: Timestamp
  }>
) => {
  const data = recipeDocument.data()
  return {
    ...data,
    // Firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
  }
}
