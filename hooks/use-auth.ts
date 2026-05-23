"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  authService,
  extractTokens,
  type LoginRequest,
  type SignupRequest,
} from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import { getOrCreateDeviceId } from "@/lib/auth/storage";
import { ApiError } from "@/lib/api-client";

const handleAuthSuccess = (
  res: Awaited<ReturnType<typeof authService.login>>,
  fallbackEmail?: string,
): boolean => {
  const { access, refresh } = extractTokens(res);
  if (!access) {
    toast.error("로그인 응답이 올바르지 않습니다. 관리자에게 문의해주세요.");
    return false;
  }
  useAuthStore.getState().setSession({
    user: res.user ?? (fallbackEmail ? { eml_adr: fallbackEmail } : null),
    accessToken: access,
    refreshToken: refresh ?? undefined,
  });
  return true;
};

const toastError = (err: unknown, fallback: string): void => {
  const message = err instanceof ApiError ? err.message : fallback;
  toast.error(message);
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (body: LoginRequest) => authService.login(body),
    onSuccess: (res, variables) => {
      if (handleAuthSuccess(res, variables.eml_adr)) {
        toast.success("로그인되었습니다.");
      }
    },
    onError: (err) => toastError(err, "로그인에 실패했습니다."),
  });

export const useSendCodeMutation = () =>
  useMutation({
    mutationFn: (eml_adr: string) => authService.sendCode(eml_adr),
    onSuccess: () => toast.success("인증 코드를 이메일로 보냈습니다."),
    onError: (err) => toastError(err, "코드 발송에 실패했습니다."),
  });

export const useVerifyCodeMutation = () =>
  useMutation({
    mutationFn: (params: { eml_adr: string; code: string }) =>
      authService.verifyCode(params.eml_adr, params.code),
    onError: (err) => toastError(err, "인증 코드가 올바르지 않습니다."),
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: (body: SignupRequest) => authService.signup(body),
    onSuccess: (res, variables) => {
      if (handleAuthSuccess(res, variables.eml_adr)) {
        toast.success("회원가입이 완료되었습니다.");
      }
    },
    onError: (err) => toastError(err, "회원가입에 실패했습니다."),
  });

export const useGoogleLoginMutation = () =>
  useMutation({
    mutationFn: (id_token: string) => authService.googleVerify(id_token),
    onSuccess: (res) => {
      if (handleAuthSuccess(res)) {
        toast.success("Google 계정으로 로그인되었습니다.");
      }
    },
    onError: (err) => toastError(err, "Google 로그인에 실패했습니다."),
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: () => authService.logout(getOrCreateDeviceId()),
    onSettled: () => {
      useAuthStore.getState().clearSession();
    },
    onSuccess: () => toast.success("로그아웃되었습니다."),
    onError: (err) => {
      const message =
        err instanceof ApiError ? err.message : "로그아웃 처리 중 문제가 발생했습니다.";
      toast.error(message);
    },
  });
