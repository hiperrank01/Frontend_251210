export interface AuthState {
  accessToken: string;
  email: string;
  nm: string;
  phoneNumber?: string;
  userId: number | null;
  isPro: boolean;
  proExpiresAt: string | null;
  isHydrated: boolean;
  setAuth: (authData: {
    accessToken: string;
    email: string;
    nm: string;
    phoneNumber?: string;
    userId?: number;
    isPro?: boolean;
    proExpiresAt?: string | null;
  }) => void;
  clearAuth: () => void;
  setHydrated: (hydrated: boolean) => void;
}
