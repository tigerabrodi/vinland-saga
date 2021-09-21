import { createContext, useContext } from "react";
import { UserData } from "./types";

export const UserContext = createContext({
  username: null,
} as UserData);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`No provider for UserContext given.`);
  }
  return context;
};
