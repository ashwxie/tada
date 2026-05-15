import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/features/auth/types/auth.types';

const isDev = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
(set) => ({
      // 2. 如果是开发环境，直接给 Mock 数据；否则为 null
      token: isDev ? "dev-bypass-token" : null,
      user: isDev ? { id: 1, name: "Ash", email: "ash@operator.os" } : null,
      
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
);