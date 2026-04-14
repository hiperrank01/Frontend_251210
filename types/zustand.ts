export interface AuthState {
  accessToken: string;
  email: string;
  nm: string;
  phoneNumber?: string;
  isHydrated: boolean;
  setAuth: (authData: {
    accessToken: string;
    email: string;
    nm: string;
    phoneNumber?: string;
  }) => void;
  clearAuth: () => void;
  setHydrated: (hydrated: boolean) => void;
}
