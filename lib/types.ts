import { FieldValue } from "@firebase/firestore";
import { User } from "firebase/auth";

export type UserData = {
  user: User | null | undefined;
  username: string | null;
};

export type UserProfile = {
  username: string;
  email: string;
  password: string;
  fullname: string;
  age: number;
  work: string;
  location: string;
  biography: string;
  avatarUrl: string;
  clapCount: number;
  recipeCount: number;
  joined: FieldValue;
};
