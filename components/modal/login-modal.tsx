"use client";

import { useState } from "react";
import { useGoogleLogin, useLogin } from "@/hooks/login/use-auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "@/oauth-login/GoogleSignInButton";
import NaverSignInButton from "@/oauth-login/NaverSignInButton";
import { useAuthStore } from "@/store/store";
import { LoadingSpinner } from "../ui/LoadingSpinner";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onSignUpClick,
}: LoginModalProps) {
  const [form, setForm] = useState({
    eml_adr: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: login, isPending: isLoginPending } = useLogin(
    () => {
      onClose();
    },
    () => {
      toast.error("로그인 실패: 이메일 또는 비밀번호를 확인해주세요");
    },
  );

  const { mutate: loginWithGoogle, isPending: isGoogleLoginPending } =
    useGoogleLogin(
      (data) => {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        useAuthStore.getState().setAuth({
          accessToken: data.access,
          email: data.user.eml_adr,
          nm: data.user.nm,
          phoneNumber: data.user.mbr_no,
        });

        onClose();
      },
      (err) => {
        toast.error(err.message || "구글 로그인에 실패했습니다.");
      },
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email: form.eml_adr, password: form.password });
  };

  const handleGoogleSuccess = (response: { credential?: string }) => {
    if (response.credential) {
      loginWithGoogle(response.credential);
    } else {
      toast.error("Google ID 토큰을 가져오지 못했습니다.");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google 로그인 중 오류가 발생했습니다.");
  };

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("Google Client ID가 설정되지 않았습니다.");

    return null;
  }

  const isPending = isLoginPending || isGoogleLoginPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {isPending && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <LoadingSpinner />
          </div>
        )}
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>
            로그인하여 모든 기능을 이용해보세요.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              아이디
            </Label>
            <Input
              id="id"
              name="eml_adr"
              value={form.eml_adr}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              className="col-span-3"
              disabled={isPending}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              비밀번호
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              className="col-span-3"
              disabled={isPending}
            />
          </div>

          <DialogFooter className="flex flex-col gap-2 pt-4">
            <div className="flex flex-col gap-2 w-full">
              <div
                className={isPending ? "pointer-events-none opacity-50" : ""}
              >
                <GoogleSignInButton
                  clientId={clientId}
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  buttonText="Google 로그인"
                  theme="outline"
                  size="large"
                  type="standard"
                  shape="rectangular"
                  width="100%"
                />
              </div>
              <div
                className={isPending ? "pointer-events-none opacity-50" : ""}
              >
                <NaverSignInButton type="button" />
              </div>

              <div className="flex flex-row">
                <Button type="submit" className="w-1/2" disabled={isPending}>
                  로그인
                </Button>
                <Button
                  type="button"
                  className="w-1/2"
                  variant="secondary"
                  onClick={onSignUpClick}
                  disabled={isPending}
                >
                  회원가입
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
