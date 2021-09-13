import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  Timestamp,
  collection,
  getFirestore,
  DocumentSnapshot,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_API_PROJECT_ID,
  storageBucket: process.env.REACT_APP_API_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseDb = getFirestore(firebaseApp);

// Auth export
export const auth = getAuth(firebaseApp);

// Firestore Utils
export const fromMillis = Timestamp.fromMillis;

// Storage export
export const storage = getStorage(firebaseApp);

export async function getUserWithUsername(username: string) {
  const userQuery = query(
    collection(firebaseDb, "users"),
    where("username", "==", username),
    limit(1)
  );

  const userDoc = (await getDocs(userQuery)).docs[0];

  return userDoc;
}

export function recipeToJSON(
  doc: DocumentSnapshot<{ createdAt: Timestamp; updatedAt: Timestamp }>
) {
  const data = doc.data();
  return {
    ...data,
    // Firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
