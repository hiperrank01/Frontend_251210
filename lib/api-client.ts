import { tokenStorage } from "@/lib/auth/storage";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.ninewinit.store";

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

let inFlightRefresh: Promise<string | null> | null = null;
let onUnauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (fn: () => void): void => {
  onUnauthorizedHandler = fn;
};

const refreshAccessToken = async (): Promise<string | null> => {
  if (inFlightRefresh) return inFlightRefresh;
  const refresh = tokenStorage.getRefreshToken();
  if (!refresh) return null;

  inFlightRefresh = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/login/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      if (!res.ok) return null;
      const data = (await res.json()) as { access_token?: string; access?: string };
      const newAccess = data.access_token ?? data.access ?? null;
      if (newAccess) tokenStorage.setTokens(newAccess, refresh);
      return newAccess;
    } catch {
      return null;
    } finally {
      inFlightRefresh = null;
    }
  })();

  return inFlightRefresh;
};

const buildHeaders = (
  options: RequestOptions,
  accessToken: string | null,
): HeadersInit => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };
  if (options.auth && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
};

const parseResponse = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  if (!text) return undefined as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
};

export const apiFetch = async <T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { method = "GET", body, auth = false, signal } = options;
  const url = `${API_BASE_URL}${path}`;

  const send = async (token: string | null): Promise<Response> =>
    fetch(url, {
      method,
      headers: buildHeaders(options, token),
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });

  let token = auth ? tokenStorage.getAccessToken() : null;
  let res = await send(token);

  if (res.status === 401 && auth) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      token = refreshed;
      res = await send(token);
    }
    if (res.status === 401) {
      tokenStorage.clear();
      onUnauthorizedHandler?.();
      const data = await parseResponse<unknown>(res);
      throw new ApiError("Unauthorized", 401, data);
    }
  }

  const data = await parseResponse<T>(res);

  if (!res.ok) {
    const message =
      (typeof data === "object" && data !== null && "detail" in data
        ? String((data as { detail: unknown }).detail)
        : `Request failed (${res.status})`) || `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  return data;
};
