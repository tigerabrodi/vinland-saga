import { FieldValue } from "@firebase/firestore";
import { User } from "firebase/auth";

export type UserData = {
  user: User | null | undefined;
  username: string | null;
};

export type UserProfile = {
  username: string;
  email: string;
  fullname: string;
  age: string;
  work: string;
  location: string;
  bio: string;
  avatarUrl: string;
  clapCount: number;
  recipeCount: number;
  joined: FieldValue;
};
