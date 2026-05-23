import { apiFetch } from "@/lib/api-client";

export type AuthUser = {
  eml_adr: string;
  nm?: string;
  phn_no?: string | null;
};

export type LoginResponse = {
  access_token?: string;
  refresh_token?: string;
  access?: string;
  refresh?: string;
  user?: AuthUser;
};

export type LoginRequest = {
  eml_adr: string;
  password: string;
};

export type SignupRequest = {
  eml_adr: string;
  password: string;
  nm: string;
  phn_no?: string;
};

export const authService = {
  login: (body: LoginRequest) =>
    apiFetch<LoginResponse>("/user/auth/login/", { method: "POST", body }),

  signup: (body: SignupRequest) =>
    apiFetch<LoginResponse>("/user/auth/signup/", { method: "POST", body }),

  sendCode: (eml_adr: string) =>
    apiFetch<unknown>("/user/auth/send-code/", {
      method: "POST",
      body: { eml_adr },
    }),

  verifyCode: (eml_adr: string, code: string) =>
    apiFetch<unknown>("/user/auth/verify-code/", {
      method: "POST",
      body: { eml_adr, code },
    }),

  googleVerify: (id_token: string) =>
    apiFetch<LoginResponse>("/user/auth/google/verify/", {
      method: "POST",
      body: { id_token },
    }),

  logout: (device_id: string) =>
    apiFetch<unknown>("/user/logout/", {
      method: "POST",
      body: { device_id },
      auth: true,
    }),
};

export const extractTokens = (
  res: LoginResponse,
): { access: string | null; refresh: string | null } => ({
  access: res.access_token ?? res.access ?? null,
  refresh: res.refresh_token ?? res.refresh ?? null,
});
