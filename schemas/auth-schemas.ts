import { z } from "zod";

export const loginSchema = z.object({
  eml_adr: z
    .string({ required_error: "이메일을 입력해주세요." })
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string({ required_error: "비밀번호를 입력해주세요." })
    .min(1, "비밀번호를 입력해주세요."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupEmailSchema = z.object({
  eml_adr: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
});

export type SignupEmailValues = z.infer<typeof signupEmailSchema>;

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(1, "인증코드를 입력해주세요.")
    .max(10, "인증코드가 너무 깁니다."),
});

export type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;

export const signupDetailsSchema = z
  .object({
    nm: z.string().min(1, "이름을 입력해주세요.").max(150),
    phn_no: z
      .string()
      .regex(/^[0-9-]*$/, "숫자와 하이픈만 입력 가능합니다.")
      .max(20)
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(128, "비밀번호가 너무 깁니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignupDetailsValues = z.infer<typeof signupDetailsSchema>;
