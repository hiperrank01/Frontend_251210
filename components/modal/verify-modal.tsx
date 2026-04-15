"use client";

import { useState } from "react";
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
import { ArrowLeft } from "lucide-react";
import { useRequestCode, useVerifyCode } from "@/hooks/sign-up/use-verify";
import { SignUpProps } from "@/types/sign-up";
import { GoogleSignInButton } from "@/oauth-login/GoogleSignInButton";
import NaverSignInButton from "@/oauth-login/NaverSignInButton";
import { toast } from "sonner";
import { useGoogleLogin } from "@/hooks/login/use-auth"; // Added
import { useAuthStore } from "@/store/store"; // Added
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function EmailVerifyModal({
  isOpen,
  onClose,
  onLoginClick,
  onSignUpClick,
}: SignUpProps) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"input" | "verify">("input");

  const { mutate: requestCode, isPending: isRequestingCode } = useRequestCode({
    onSuccess: () => {
      alert("이메일로 인증코드를 전송했습니다.");
      setStep("verify");
    },
    onError: (err: Error) => {
      alert(err.message);
    },
  });

  const { mutate: verifyCode, isPending: isVerifyingCode } = useVerifyCode({
    onSuccess: () => {
      alert("이메일 인증 성공!");
      onSignUpClick(email);
    },
    onError: (err: Error) => {
      alert(err.message || "인증 실패");
    },
  });

  const { mutate: loginWithGoogle, isPending: isGoogleLoginPending } =
    useGoogleLogin(
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
        toast.success("Google 계정으로 로그인되었습니다!");
        onClose();
      },
      (err) => {
        toast.error(err.message || "구글 로그인에 실패했습니다.");
      },
    );

  const handleGoogleSuccess = (response: { credential?: string }) => {
    if (response.credential) {
      loginWithGoogle(response.credential);
    } else {
      toast.error("Google ID 토큰을 가져오지 못했습니다.");
    }
  };
  interface GoogleErrorType {
    message: string;
  }
  const handleGoogleError = (error: GoogleErrorType) => {
    console.error("Google Sign-In Error:", error);
    toast.error(error?.message || "Google 로그인 중 오류가 발생했습니다.");
  };

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("Google Client ID가 설정되지 않았습니다.");
    return null;
  }

  const isPending = isRequestingCode || isVerifyingCode || isGoogleLoginPending; // Updated

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {isPending && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}
      <DialogContent>
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onLoginClick}
            className="bg-gray-400 hover:bg-[#333]"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </Button>
        </div>
        <DialogHeader className="mt-20">
          <DialogTitle>이메일 인증</DialogTitle>
          <DialogDescription>
            인증을 위해 이메일을 입력하고 인증코드를 확인하세요.
          </DialogDescription>
        </DialogHeader>

        {step === "input" ? (
          <div className="grid gap-4 py-4">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              disabled={isPending} // Added disabled
            />
            <Button
              onClick={() => requestCode(email)}
              disabled={!email || isRequestingCode || isPending} // Updated disabled
            >
              인증코드 요청
            </Button>
            <GoogleSignInButton
              clientId={clientId} // Updated
              onSuccess={(res) => {
                handleGoogleSuccess(res);
              }}
              onError={handleGoogleError}
              buttonText="Google 로그인"
              theme="outline"
              size="large"
              type="standard"
              shape="rectangular"
              width="100%"
            />
            <NaverSignInButton type="button" />
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <Label>인증코드</Label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="이메일로 받은 코드를 입력하세요"
              disabled={isPending} // Added disabled
            />
            <Button
              onClick={() => verifyCode({ eml_adr: email, code })}
              disabled={!code || isVerifyingCode || isPending} // Updated disabled
            >
              코드 확인
            </Button>
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
