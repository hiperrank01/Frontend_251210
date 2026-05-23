"use client";

import { ProModal } from "@/components/modal/pro-modal";
import { AuthModal } from "@/components/modal/auth-modal";
import { useRouter, useSearchParams } from "next/navigation";
import mainLogo from "@/public/Logo_Main.png";
import { useAuthStore } from "@/stores/auth-store";
import { useLogoutMutation } from "@/hooks/use-auth";
import { useUIStore } from "@/stores/ui-store";
import { COMPANY_INFO } from "@/config/company";

export const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((state) => Boolean(state.accessToken));
  const logout = useLogoutMutation();
  const openMembership = useUIStore((state) => state.openMembership);
  const openAuth = useUIStore((state) => state.openAuth);

  const handleInquiryTab = () => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", "inquiry");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleLogout = () =>
    logout.mutate(undefined, {
      onSettled: () => router.replace("/"),
    });

  return (
    <header className="sticky top-0 z-50 bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            aria-label="홈으로 이동"
            onClick={() => router.push("/")}
          >
            <img src={mainLogo.src} alt={`${COMPANY_INFO.name} 로고`} />
          </button>
        </div>
        <nav className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 items-center">
          <button
            className="hover:text-gray-300 transition-colors"
            onClick={() => router.push("/intro")}
          >
            서비스 소개
          </button>
          <button
            onClick={openMembership}
            className="hover:text-gray-300 transition-colors"
          >
            PRO가입
          </button>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="hover:text-gray-300 transition-colors"
              disabled={logout.isPending}
            >
              {logout.isPending ? "로그아웃 중..." : "로그아웃"}
            </button>
          ) : (
            <button
              onClick={openAuth}
              className="hover:text-gray-300 transition-colors"
            >
              로그인
            </button>
          )}
          <button
            onClick={() => router.push("/mypage", { scroll: false })}
            className="hover:text-gray-300 transition-colors"
          >
            마이페이지
          </button>
          <button
            onClick={handleInquiryTab}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            무료 대행 신청하기
          </button>
        </nav>
      </div>
      <ProModal />
      <AuthModal />
    </header>
  );
};
