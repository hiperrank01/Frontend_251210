import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState } from "@/types/zustand";

const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: "",
      email: "",
      nm: "",
      phoneNumber: "",
      isHydrated: false,
      setAuth: (authData) =>
        set({
          accessToken: authData.accessToken,
          email: authData.email,
          nm: authData.nm,
          phoneNumber: authData.phoneNumber,
        }),
      clearAuth: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({ accessToken: "", email: "", nm: "", phoneNumber: "" });
      },
      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),
    }),
    {
      name: "userInfoStorage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : dummyStorage,
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
