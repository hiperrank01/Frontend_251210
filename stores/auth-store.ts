import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUser } from "@/services/auth-service";
import { tokenStorage } from "@/lib/auth/storage";

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  setSession: (params: {
    user: AuthUser | null;
    accessToken: string;
    refreshToken?: string;
  }) => void;
  setUser: (user: AuthUser | null) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setSession: ({ user, accessToken, refreshToken }) => {
        tokenStorage.setTokens(accessToken, refreshToken);
        set({ user, accessToken });
      },
      setUser: (user) => set({ user }),
      clearSession: () => {
        tokenStorage.clear();
        set({ user: null, accessToken: null });
      },
    }),
    {
      name: "nw_auth_store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    },
  ),
);

export const useIsAuthenticated = (): boolean =>
  useAuthStore((state) => Boolean(state.accessToken));
