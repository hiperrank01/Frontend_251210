"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useNaverLogin } from "@/oauth-login/useNaverAuth";
import { useAuthStore } from "@/store/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NaverCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const { mutate: loginWithNaver } = useNaverLogin(
    (data) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      useAuthStore.getState().setAuth({
        accessToken: data.access,
        email: data.user.eml_adr,
        nm: data.user.nm,
        userId: data.user.user_id,
        isPro: data.user.is_pro,
        proExpiresAt: data.user.pro_expires_at,
      });
      toast.success("네이버 계정으로 로그인되었습니다!");
      router.push("/"); // 로그인 성공 후 메인 페이지로 이동
    },
    (err) => {
      toast.error(err.message || "네이버 로그인에 실패했습니다.");
      router.push("/"); // 실패 시 로그인 페이지로 이동
    },
  );

  useEffect(() => {
    if (code && state) {
      loginWithNaver({ code, state });
    }
  }, [code, state, loginWithNaver]);

  return <div>네이버 로그인 처리 중...</div>;
};

export default NaverCallback;
