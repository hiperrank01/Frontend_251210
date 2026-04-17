"use client";

import { useMutation } from "@tanstack/react-query";
import { login, googleLogin } from "@/fetch/auth-api";
import type { LoginParams } from "@/types/auth";
import type { AuthResponse } from "@/types/auth";
import { useAuthStore } from "@/store/store";
import { toast } from "sonner";
export function useLogin(onSuccess?: () => void, onError?: (err: any) => void) {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation<AuthResponse, Error, LoginParams>({
    mutationFn: (data: LoginParams) => login(data),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      setAuth({
        accessToken: data.access,
        email: data.user.eml_adr,
        nm: data.user.nm,
        phoneNumber: data.user.mbr_no,
        userId: data.user.user_id,
        isPro: data.user.is_pro,
        proExpiresAt: data.user.pro_expires_at,
      });

      toast.success("로그인 성공! 환영합니다");

      if (onSuccess) onSuccess();
    },
    onError: (err: any) => {
      if (onError) {
        onError(err);
      } else {
        toast.error(err.message || "로그인 실패: 아이디 또는 비밀번호 확인");
      }
    },
  });
}
export function useLogout() {
  const resetAuth = useAuthStore((state) => state.clearAuth);

  return () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    resetAuth();
    toast.success("로그아웃 되었습니다");
  };
}
export function useGoogleLogin(
  onSuccessCallback?: (data: AuthResponse) => void,
  onErrorCallback?: (error: any) => void,
) {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (idToken: string) => googleLogin(idToken),
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      setAuth({
        accessToken: data.access,
        email: data.user.eml_adr,
        nm: data.user.nm,
        phoneNumber: data.user.mbr_no,
        userId: data.user.user_id,
        isPro: data.user.is_pro,
        proExpiresAt: data.user.pro_expires_at,
      });
      toast.success("Google 계정으로 로그인되었습니다!");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (err: any) => {
      if (onErrorCallback) {
        onErrorCallback(err);
      } else {
        toast.error(err.message || "구글 로그인에 실패했습니다.");
      }
    },
  });
}
