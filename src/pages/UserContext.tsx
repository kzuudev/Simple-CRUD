import { createContext } from "react";
import type { User } from "@/types";

type UserContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  getUsers: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);
