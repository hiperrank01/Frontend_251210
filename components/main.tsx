import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Tabs } from "@/components/ui/tabs";
import { ProModal } from "@/components/modal/pro-modal";
import { TabNav } from "@/components/tab/tab-nav";
import HeroSection from "./main/hero-section";
import { ServiceSection } from "./main/service-section";
import { InquirySection } from "./main/inquiry-section";
import {
  inquirySchema,
  type InquiryFormValues,
} from "@/schemas/inquiry-schema";

const INQUIRY_DEFAULTS: InquiryFormValues = {
  company: "",
  name: "",
  phone: "",
  email: "",
  inquiry: "",
};

export const Main = () => {
  const [showMembership, setShowMembership] = useState(false);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "seo-analysis";

  const inquiryForm = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: INQUIRY_DEFAULTS,
  });

  const onInquirySubmit = () => {
    // TODO(#9): 백엔드 문의 접수 엔드포인트 확정 후 실제 호출 연결
    toast.success("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
    inquiryForm.reset(INQUIRY_DEFAULTS);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-0">
      <Tabs value={activeTab} className="w-full">
        <HeroSection />
        <TabNav />
        <ServiceSection setShowMembership={setShowMembership} />
        <InquirySection form={inquiryForm} onSubmit={onInquirySubmit} />
      </Tabs>
      <ProModal
        showMembership={showMembership}
        setShowMembership={setShowMembership}
      />
    </main>
  );
};
