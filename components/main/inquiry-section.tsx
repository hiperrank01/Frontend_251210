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

interface InquirySectionProps {
  formData: {
    company: string;
    name: string;
    phone: string;
    email: string;
    inquiry: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const InquirySection = ({
  formData,
  handleInputChange,
  handleSubmit,
}: InquirySectionProps) => {
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inquiry-company" className="block text-sm font-medium mb-2">
                  업체명
                </label>
                <Input
                  id="inquiry-company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="업체명을 입력하세요"
                  required
                />
              </div>
              <div>
                <label htmlFor="inquiry-name" className="block text-sm font-medium mb-2">
                  담당자명
                </label>
                <Input
                  id="inquiry-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="담당자명을 입력하세요"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inquiry-phone" className="block text-sm font-medium mb-2">
                  전화번호
                </label>
                <Input
                  id="inquiry-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  required
                />
              </div>
              <div>
                <label htmlFor="inquiry-email" className="block text-sm font-medium mb-2">
                  이메일
                </label>
                <Input
                  id="inquiry-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="inquiry-content" className="block text-sm font-medium mb-2">
                문의내용
              </label>
              <Textarea
                id="inquiry-content"
                name="inquiry"
                value={formData.inquiry}
                onChange={handleInputChange}
                placeholder="문의하실 내용을 자세히 입력해주세요"
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <Play className="w-4 h-4 mr-2" />
              문의하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
