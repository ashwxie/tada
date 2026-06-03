import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/features/auth/types/auth.types";
import { logout as clearAuthCookie } from "@/features/auth/services/auth.service";

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => {
        clearAuthCookie(); // Clear the cookie
        set({ token: null, user: null }); // Clear the store
      },
    }),
    { name: "auth-storage" },
  ),
);
