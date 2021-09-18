import * as React from "react";
import { useLoadingStore } from "@lib/store";
import { doc, serverTimestamp, writeBatch } from "@firebase/firestore";
import { createUserWithEmailAndPassword as createUserWithEmailAndPasswordAuth } from "@firebase/auth";
import { auth, firebaseDb } from "@lib/firebase";
import { FirebaseError } from "@firebase/util";
import toast from "react-hot-toast";

export const useCreateUserWithEmailAndPassword = () => {
  const [signUpError, setSignUpError] = React.useState<FirebaseError>();
  const { setStatus } = useLoadingStore();

  const batch = writeBatch(firebaseDb);

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string,
    username: string
  ) => {
    setStatus("loading");
    try {
      const user = await createUserWithEmailAndPasswordAuth(
        auth,
        email,
        password
      );

      const userRef = doc(firebaseDb, "users", user.user?.uid);
      batch.set(userRef, {
        username,
        email,
        fullname: "",
        age: "",
        bio: "",
        work: "",
        location: "",
        avatar: "",
        clapCount: 0,
        recipeCount: 0,
        joined: serverTimestamp(),
      });

      const usernameRef = doc(firebaseDb, "usernames", username);
      batch.set(usernameRef, {
        uid: user.user?.uid,
      });

      await batch.commit();

      toast.success("You successfully created your account.");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setSignUpError(error as FirebaseError);
      setTimeout(() => {
        setSignUpError(undefined);
      }, 3000);
    }
  };

  return {
    createUserWithEmailAndPassword,
    signUpError,
  };
};