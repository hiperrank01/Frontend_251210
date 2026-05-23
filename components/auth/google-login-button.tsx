"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { useGoogleLoginMutation } from "@/hooks/use-auth";
import { toast } from "sonner";

type GoogleLoginButtonProps = {
  label?: string;
  onSuccess?: () => void;
};

export function GoogleLoginButton({
  label = "Google 로그인",
  onSuccess,
}: GoogleLoginButtonProps) {
  const googleMutation = useGoogleLoginMutation();

  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      const idToken =
        (tokenResponse as unknown as { id_token?: string }).id_token ??
        tokenResponse.access_token;
      if (!idToken) {
        toast.error("Google 토큰을 가져오지 못했습니다.");
        return;
      }
      googleMutation.mutate(idToken, {
        onSuccess: () => onSuccess?.(),
      });
    },
    onError: () => toast.error("Google 인증이 취소되었습니다."),
  });

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const disabled = !clientId || googleMutation.isPending;

  return (
    <Button
      variant="outline"
      className="w-full"
      type="button"
      disabled={disabled}
      onClick={() => login()}
      title={!clientId ? "NEXT_PUBLIC_GOOGLE_CLIENT_ID 미설정" : undefined}
    >
      {googleMutation.isPending ? "처리 중..." : label}
    </Button>
  );
}
