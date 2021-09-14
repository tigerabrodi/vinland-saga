import { createContext } from "react";
import { UserData } from "./types";

export const UserContext = createContext({
  user: null,
  username: null,
} as UserData);
