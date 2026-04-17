import { naverLogin } from "@/fetch/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/store";
import { toast } from "sonner";
import { AuthResponse } from "@/types/auth";

export const useNaverLogin = (
  onSuccessCallback?: (data: AuthResponse) => void,
  onErrorCallback?: (error: any) => void,
) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: ({ code, state }: { code: string; state: string }) =>
      naverLogin(code, state),
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      setAuth({
        accessToken: data.access,
        email: data.user.eml_adr,
        nm: data.user.nm,
        userId: data.user.user_id,
        isPro: data.user.is_pro,
        proExpiresAt: data.user.pro_expires_at,
      });
      toast.success("네이버 계정으로 로그인되었습니다!");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (err: any) => {
      if (onErrorCallback) {
        onErrorCallback(err);
      } else {
        toast.error(err.message || "네이버 로그인에 실패했습니다.");
      }
    },
  });
};
