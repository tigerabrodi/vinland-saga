import { initializeApp } from 'firebase/app'
import { getAuth, User } from 'firebase/auth'
import {
  Timestamp,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  limit,
  doc,
  getDoc,
  FieldValue,
  writeBatch,
  DocumentReference,
  DocumentData,
  increment,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { UserProfile } from '../types'
import { recipeToJSON } from './format-utils'

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

  if (user && user.joined) {
    return {
      ...user,
      joined: getTimestampInMillis(user.joined),
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

export const addClap = async (
  userRef: DocumentReference<DocumentData>,
  postRef: DocumentReference<DocumentData>,
  clapRef: DocumentReference<DocumentData>
) => {
  const uid = auth.currentUser?.uid
  const batch = writeBatch(firebaseDb)

  batch.update(userRef, { clapCount: increment(1) })
  batch.update(postRef, { clapCount: increment(1) })
  batch.set(clapRef, { uid })

  await batch.commit()
}

export const removeClap = async (
  userRef: DocumentReference<DocumentData>,
  postRef: DocumentReference<DocumentData>,
  clapRef: DocumentReference<DocumentData>
) => {
  const batch = writeBatch(firebaseDb)

  batch.update(userRef, { clapCount: increment(-1) })
  batch.update(postRef, { clapCount: increment(-1) })
  batch.delete(clapRef)

  await batch.commit()
}
