export const STORAGE_KEYS = {
  accessToken: "nw_access_token",
  refreshToken: "nw_refresh_token",
  deviceId: "nw_device_id",
} as const;

const isBrowser = (): boolean => typeof window !== "undefined";

export const tokenStorage = {
  getAccessToken: (): string | null => {
    if (!isBrowser()) return null;
    return window.localStorage.getItem(STORAGE_KEYS.accessToken);
  },
  getRefreshToken: (): string | null => {
    if (!isBrowser()) return null;
    return window.localStorage.getItem(STORAGE_KEYS.refreshToken);
  },
  setTokens: (access: string, refresh?: string): void => {
    if (!isBrowser()) return;
    window.localStorage.setItem(STORAGE_KEYS.accessToken, access);
    if (refresh) {
      window.localStorage.setItem(STORAGE_KEYS.refreshToken, refresh);
    }
  },
  clear: (): void => {
    if (!isBrowser()) return;
    window.localStorage.removeItem(STORAGE_KEYS.accessToken);
    window.localStorage.removeItem(STORAGE_KEYS.refreshToken);
  },
};

export const getOrCreateDeviceId = (): string => {
  if (!isBrowser()) return "ssr-no-device";
  const existing = window.localStorage.getItem(STORAGE_KEYS.deviceId);
  if (existing) return existing;
  const fresh =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `web-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(STORAGE_KEYS.deviceId, fresh);
  return fresh;
};
