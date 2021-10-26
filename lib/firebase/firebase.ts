import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { Timestamp, getFirestore } from 'firebase/firestore'
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
