import type { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Play } from "lucide-react";
import type { InquiryFormValues } from "@/schemas/inquiry-schema";

type InquirySectionProps = {
  form: UseFormReturn<InquiryFormValues>;
  onSubmit: (values: InquiryFormValues) => void;
};

type FieldName = keyof InquiryFormValues;

type FieldConfig = {
  name: FieldName;
  id: string;
  label: string;
  placeholder: string;
  type?: string;
};

const TEXT_FIELDS: ReadonlyArray<readonly FieldConfig[]> = [
  [
    { name: "company", id: "inquiry-company", label: "업체명", placeholder: "업체명을 입력하세요" },
    { name: "name", id: "inquiry-name", label: "담당자명", placeholder: "담당자명을 입력하세요" },
  ],
  [
    { name: "phone", id: "inquiry-phone", label: "전화번호", placeholder: "010-0000-0000" },
    { name: "email", id: "inquiry-email", label: "이메일", placeholder: "example@email.com", type: "email" },
  ],
];

export const InquirySection = ({ form, onSubmit }: InquirySectionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <TabsContent value="inquiry">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-6 h-6" />
            <span>광고 문의하기</span>
          </CardTitle>
          <CardDescription>
            전문가와 상담하고 맞춤형 솔루션을 받아보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {TEXT_FIELDS.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {row.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium mb-2"
                    >
                      {field.label}
                    </label>
                    <Input
                      id={field.id}
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      aria-invalid={Boolean(errors[field.name])}
                      {...register(field.name)}
                    />
                    {errors[field.name] && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
            <div>
              <label
                htmlFor="inquiry-content"
                className="block text-sm font-medium mb-2"
              >
                문의내용
              </label>
              <Textarea
                id="inquiry-content"
                placeholder="문의하실 내용을 자세히 입력해주세요"
                rows={5}
                aria-invalid={Boolean(errors.inquiry)}
                {...register("inquiry")}
              />
              {errors.inquiry && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.inquiry.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <Play className="w-4 h-4 mr-2" />
              {isSubmitting ? "전송 중..." : "문의하기"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
