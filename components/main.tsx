import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Tabs } from "@/components/ui/tabs";
import { ProModal } from "@/components/modal/pro-modal";
import { TabNav } from "@/components/tab/tab-nav";
import HeroSection from "./main/hero-section";
import { ServiceSection } from "./main/service-section";
import { InquirySection } from "./main/inquiry-section";

export const Main = () => {
  const [showMembership, setShowMembership] = useState(false);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "seo-analysis";
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    phone: "",
    email: "",
    inquiry: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
    setFormData({ company: "", name: "", phone: "", email: "", inquiry: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-0">
      <Tabs value={activeTab} className="w-full">
        <HeroSection />
        <TabNav />
        <ServiceSection setShowMembership={setShowMembership} />
        <InquirySection
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </Tabs>
      <ProModal
        showMembership={showMembership}
        setShowMembership={setShowMembership}
      />
    </main>
  );
};
