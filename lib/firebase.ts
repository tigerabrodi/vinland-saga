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
  DocumentSnapshot,
  FieldValue,
  writeBatch,
  DocumentReference,
  DocumentData,
  increment,
  QuerySnapshot,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { Comment, Recipe, UserProfile } from './types'

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
      joined: (user.joined as Timestamp).toMillis(),
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
    const recipe = recipeSnap.data() as Recipe

    return {
      ...recipe,
      createdAt: (recipe.createdAt as Timestamp).toMillis(),
    } as Recipe
  }
}

export const recipeToJSON = (recipeSnapshot: DocumentSnapshot): Recipe => {
  const recipe = recipeSnapshot.data() as Recipe
  return {
    ...recipe,
    createdAt: (recipe.createdAt as Timestamp).toMillis() || 0,
  }
}

export const commentsToJSON = (
  commentsSnapshot: QuerySnapshot<DocumentData>
): Comment[] =>
  commentsSnapshot.docs.map(
    (commentDoc) =>
      ({
        ...commentDoc.data(),
        createdAt:
          ((commentDoc.data() as Comment).createdAt as Timestamp).toMillis() ||
          0,
      } as Comment)
  )

export const formatDate = (createdAt: number | Timestamp | FieldValue) =>
  (typeof createdAt === 'number'
    ? new Date(createdAt)
    : (createdAt as Timestamp).toDate()
  )
    .toISOString()
    .split('T')[0]

export const addClap = async (
  postRef: DocumentReference<DocumentData>,
  clapRef: DocumentReference<DocumentData>
) => {
  const uid = auth.currentUser?.uid
  const batch = writeBatch(firebaseDb)

  batch.update(postRef, { clapCount: increment(1) })
  batch.set(clapRef, { uid })

  await batch.commit()
}

export const removeClap = async (
  postRef: DocumentReference<DocumentData>,
  clapRef: DocumentReference<DocumentData>
) => {
  const batch = writeBatch(firebaseDb)

  batch.update(postRef, { clapCount: increment(-1) })
  batch.delete(clapRef)

  await batch.commit()
}
