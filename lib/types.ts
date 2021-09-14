import { User } from "firebase/auth";

export type UserData = {
  user: User | null | undefined;
  username: string | null;
};
