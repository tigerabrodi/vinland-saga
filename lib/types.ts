import { FieldValue, Timestamp } from "@firebase/firestore";

export type UserData = {
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
  joined: FieldValue | Timestamp | number;
};
