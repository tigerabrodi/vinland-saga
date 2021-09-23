import { doc, onSnapshot } from "firebase/firestore";
import { auth, firebaseDb } from "@lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "@hooks/useAuthState";
import { UserData } from "@lib/types";

type User = {
  username: string;
};

export function useUserData(): UserData {
  const { user } = useAuthState(auth);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = onSnapshot(doc(firebaseDb, "users", user.uid), (doc) => {
        setUsername((doc.data() as User).username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { username };
}
