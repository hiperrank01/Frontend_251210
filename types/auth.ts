export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    user_id: number;
    eml_adr: string;
    nm: string;
    mbr_no: string;
    is_pro: boolean;
    pro_expires_at: string | null;
  };
}

export interface SignupParams {
  eml_adr: string; // 이메일
  password: string; // 비밀번호
  nm: string; // 이름
  phn_no: string; // 전화번호
  rcm_eml: string; // 추천인 이메일
  prv_agr_yn: string; // 개인정보 동의 여부 ('s' = 동의)
  tos_agr_yn: string; // 이용약관 동의 여부
  adv_rcv_yn: string; // 광고 수신 동의 여부
}
export interface VerifyCodeParams {
  eml_adr: string;
  code: string;
}

export interface SendVerify {
  eml_adr: string;
}
export interface VerifyRequest {
  eml_adr: string;
  code: string;
}

export interface GoogleSignInButtonProps {
  clientId: string;
  onSuccess: (response: { credential?: string }) => void;
  onError?: (error: any) => void;
  buttonText?: string;
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "large" | "medium" | "small";
  type?: "standard" | "icon";
  shape?: "rectangular" | "pill" | "circle" | "square";
  width?: string;
}
