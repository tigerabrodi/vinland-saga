import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  Timestamp,
  getFirestore,
  writeBatch,
  DocumentReference,
  DocumentData,
  increment,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

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

export const addRecipeClap = async (
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

export const removeRecipeClap = async (
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
