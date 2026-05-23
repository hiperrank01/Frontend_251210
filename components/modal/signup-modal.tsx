"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
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
import {
  signupEmailSchema,
  type SignupEmailValues,
  verifyCodeSchema,
  type VerifyCodeValues,
  signupDetailsSchema,
  type SignupDetailsValues,
} from "@/schemas/auth-schemas";
import {
  useSendCodeMutation,
  useVerifyCodeMutation,
  useSignupMutation,
} from "@/hooks/use-auth";
import { GoogleLoginButton } from "@/components/auth/google-login-button";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

type Step = "email" | "code" | "details";

export function SignUpModal({
  isOpen,
  onClose,
  onLoginClick,
}: SignUpModalProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  const sendCode = useSendCodeMutation();
  const verifyCode = useVerifyCodeMutation();
  const signup = useSignupMutation();

  const emailForm = useForm<SignupEmailValues>({
    resolver: zodResolver(signupEmailSchema),
    defaultValues: { eml_adr: "" },
  });

  const codeForm = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });

  const detailsForm = useForm<SignupDetailsValues>({
    resolver: zodResolver(signupDetailsSchema),
    defaultValues: { nm: "", phn_no: "", password: "", confirmPassword: "" },
  });

  const resetAll = () => {
    setStep("email");
    setEmail("");
    emailForm.reset();
    codeForm.reset();
    detailsForm.reset();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetAll();
      onClose();
    }
  };

  const onEmailSubmit = ({ eml_adr }: SignupEmailValues) => {
    sendCode.mutate(eml_adr, {
      onSuccess: () => {
        setEmail(eml_adr);
        setStep("code");
      },
    });
  };

  const onCodeSubmit = ({ code }: VerifyCodeValues) => {
    verifyCode.mutate(
      { eml_adr: email, code },
      {
        onSuccess: () => setStep("details"),
      },
    );
  };

  const onDetailsSubmit = (values: SignupDetailsValues) => {
    signup.mutate(
      {
        eml_adr: email,
        password: values.password,
        nm: values.nm,
        phn_no: values.phn_no || undefined,
      },
      {
        onSuccess: () => {
          resetAll();
          onClose();
        },
      },
    );
  };

  const goBack = () => {
    if (step === "details") setStep("code");
    else if (step === "code") setStep("email");
    else onLoginClick();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            aria-label="이전 단계로"
            className="bg-gray-400 hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </Button>
        </div>
        <DialogHeader className="pt-10">
          <DialogTitle className="text-center">회원가입</DialogTitle>
          <DialogDescription className="text-center">
            {step === "email" && "가입할 이메일을 입력하세요."}
            {step === "code" && `${email}로 보낸 인증 코드를 입력하세요.`}
            {step === "details" && "추가 정보를 입력하면 가입이 완료됩니다."}
          </DialogDescription>
        </DialogHeader>

        {step === "email" && (
          <form
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="signup-email">이메일</Label>
              <Input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="이메일을 입력하세요"
                {...emailForm.register("eml_adr")}
              />
              {emailForm.formState.errors.eml_adr && (
                <p className="text-sm text-red-500">
                  {emailForm.formState.errors.eml_adr.message}
                </p>
              )}
            </div>
            <div className="mt-2">
              <GoogleLoginButton
                label="Google로 시작하기"
                onSuccess={() => {
                  resetAll();
                  onClose();
                }}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={sendCode.isPending}
              >
                {sendCode.isPending ? "코드 발송 중..." : "인증 코드 받기"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === "code" && (
          <form
            onSubmit={codeForm.handleSubmit(onCodeSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="verify-code">인증 코드</Label>
              <Input
                id="verify-code"
                inputMode="numeric"
                placeholder="이메일로 받은 코드를 입력하세요"
                {...codeForm.register("code")}
              />
              {codeForm.formState.errors.code && (
                <p className="text-sm text-red-500">
                  {codeForm.formState.errors.code.message}
                </p>
              )}
            </div>
            <div>
              <Button
                type="button"
                variant="link"
                className="px-0 text-xs"
                onClick={() => sendCode.mutate(email)}
                disabled={sendCode.isPending}
              >
                코드 재발송
              </Button>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={verifyCode.isPending}
              >
                {verifyCode.isPending ? "확인 중..." : "다음"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === "details" && (
          <form
            onSubmit={detailsForm.handleSubmit(onDetailsSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="signup-name">이름</Label>
              <Input
                id="signup-name"
                placeholder="이름을 입력하세요"
                {...detailsForm.register("nm")}
              />
              {detailsForm.formState.errors.nm && (
                <p className="text-sm text-red-500">
                  {detailsForm.formState.errors.nm.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-phone">전화번호 (선택)</Label>
              <Input
                id="signup-phone"
                inputMode="tel"
                placeholder="010-1234-5678"
                {...detailsForm.register("phn_no")}
              />
              {detailsForm.formState.errors.phn_no && (
                <p className="text-sm text-red-500">
                  {detailsForm.formState.errors.phn_no.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-password">비밀번호</Label>
              <Input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                placeholder="8자 이상"
                {...detailsForm.register("password")}
              />
              {detailsForm.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {detailsForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-confirm">비밀번호 확인</Label>
              <Input
                id="signup-confirm"
                type="password"
                autoComplete="new-password"
                placeholder="비밀번호를 다시 입력하세요"
                {...detailsForm.register("confirmPassword")}
              />
              {detailsForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {detailsForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={signup.isPending}
              >
                {signup.isPending ? "가입 중..." : "회원가입 완료"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
