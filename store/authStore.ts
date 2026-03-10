import { UserType } from "@/types/user.type";
import { create } from "zustand";

interface AuthStore {
  user: UserType | null;
  setUser: (user: UserType) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null })
}));
