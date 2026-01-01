"use client";

import { useState } from "react";
import { ProModal } from "@/components/modal/pro-modal";
import { AuthModal } from "@/components/modal/auth-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useLogout } from "@/hooks/login/use-auth";
import mainLogo from "@/public/Logo_Main.png";
import { useAuthStore } from "@/store/store";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMembership, setShowMembership] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const logout = useLogout();
  const { accessToken, isHydrated } = useAuthStore();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleDashboardClick = () => {
    if (accessToken) {
      router.push("/dashboard");
    } else {
      setShowAuth(true);
      toast({
        title: "로그인이 필요합니다.",
        description: "대시보드에 접근하려면 로그인하세요.",
      });
    }
  };

  if (!isHydrated) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const NavButtons = ({ isMobileView }: { isMobileView: boolean }) => (
    <>
      {isMobileView ? (
        <SheetClose asChild>
          <a
            href="/down/나인위닛_회사소개서_260101_2.pdf" // public/sample.pdf
            download
            className={`hover:text-gray-300 transition-colors ${
              isMobileView ? "block w-full text-left py-2" : ""
            }`}
          >
            회사 소개서
          </a>
        </SheetClose>
      ) : (
        <a
          href="/down/나인위닛_회사소개서_260101_2.pdf" // public/sample.pdf
          download
          className={`hover:text-gray-300 transition-colors ${
            isMobileView ? "block w-full text-left py-2" : ""
          }`}
        >
          회사 소개서
        </a>
      )}

      {isMobileView ? (
        <SheetClose asChild>
          <button
            onClick={() => setShowMembership(true)}
            className={`hover:text-gray-300 transition-colors ${
              isMobileView ? "block w-full text-left py-2" : ""
            }`}
          >
            PRO가입
          </button>
        </SheetClose>
      ) : (
        <button
          onClick={() => setShowMembership(true)}
          className={`hover:text-gray-300 transition-colors ${
            isMobileView ? "block w-full text-left py-2" : ""
          }`}
        >
          PRO가입
        </button>
      )}

      {accessToken ? (
        isMobileView ? (
          <SheetClose asChild>
            <button
              onClick={() => logout()}
              className={`hover:text-gray-300 transition-colors ${
                isMobileView ? "block w-full text-left py-2" : ""
              }`}
            >
              로그아웃
            </button>
          </SheetClose>
        ) : (
          <button
            onClick={() => logout()}
            className={`hover:text-gray-300 transition-colors ${
              isMobileView ? "block w-full text-left py-2" : ""
            }`}
          >
            로그아웃
          </button>
        )
      ) : isMobileView ? (
        <SheetClose asChild>
          <button
            onClick={() => setShowAuth(true)}
            className={`hover:text-gray-300 transition-colors ${
              isMobileView ? "block w-full text-left py-2" : ""
            }`}
          >
            로그인
          </button>
        </SheetClose>
      ) : (
        <button
          onClick={() => setShowAuth(true)}
          className={`hover:text-gray-300 transition-colors ${
            isMobileView ? "block w-full text-left py-2" : ""
          }`}
        >
          로그인
        </button>
      )}

      {accessToken !== "" ? (
        isMobileView ? (
          <SheetClose asChild>
            <button
              onClick={() => {
                router.push("mypage", { scroll: false });
              }}
              className={`${isMobileView ? "block w-full text-left py-2" : ""}`}
            >
              마이페이지
            </button>
          </SheetClose>
        ) : (
          <button
            onClick={() => {
              router.push("mypage", { scroll: false });
            }}
            className={`${isMobileView ? "block w-full text-left py-2" : ""}`}
          >
            마이페이지
          </button>
        )
      ) : (
        ""
      )}

      <button
        onClick={handleDashboardClick}
        className={`hover:text-gray-300 transition-colors ${
          isMobileView ? "block w-full text-left py-2" : ""
        }`}
      >
        대시보드
      </button>
      {isMobileView ? (
        <SheetClose asChild>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("tab", "inquiry");
              router.push(`?${params.toString()}`, { scroll: false });
            }}
            className={`bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition-colors ${
              isMobileView ? "block w-full text-left mt-4" : ""
            }`}
          >
            무료 대행 신청하기
          </button>
        </SheetClose>
      ) : (
        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set("tab", "inquiry");
            router.push(`?${params.toString()}`, { scroll: false });
          }}
          className={`bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition-colors ${
            isMobileView ? "block w-full text-left mt-4" : ""
          }`}
        >
          무료 대행 신청하기
        </button>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              width={40}
              height={40}
              className="w-40"
              src={mainLogo.src}
              alt="나인위닛 로고"
            />
          </button>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-white">
                <MenuIcon className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[250px] sm:w-[300px] bg-black text-white"
            >
              <div className="flex flex-col items-start space-y-4 pt-8">
                <NavButtons isMobileView={true} />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex space-x-6 items-center">
            <NavButtons isMobileView={false} />
          </nav>
        )}
      </div>
      <ProModal
        showMembership={showMembership}
        setShowMembership={setShowMembership}
      />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <Toaster />
    </header>
  );
};
