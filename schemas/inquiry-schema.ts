import { z } from "zod";

export const inquirySchema = z.object({
  company: z.string().min(1, "업체명을 입력해주세요.").max(100),
  name: z.string().min(1, "담당자명을 입력해주세요.").max(50),
  phone: z
    .string()
    .min(1, "전화번호를 입력해주세요.")
    .regex(/^[0-9-+\s]+$/, "올바른 전화번호 형식이 아닙니다.")
    .max(20),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
  inquiry: z
    .string()
    .min(1, "문의 내용을 입력해주세요.")
    .max(2000, "문의 내용이 너무 깁니다."),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
