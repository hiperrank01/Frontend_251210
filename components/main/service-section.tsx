import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Download } from "lucide-react";
import { services } from "@/data/service-data";

interface ServiceSectionProps {
  setShowMembership: (show: boolean) => void;
}

export const ServiceSection = ({ setShowMembership }: ServiceSectionProps) => {
  return (
    <>
      {services.map((service) => (
        <TabsContent key={service.id} value={service.id}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {service.icon}
                <span>{service.title}</span>
              </CardTitle>

              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {service.id === "seo-analysis" && (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="스마트스토어 URL을 입력하세요"
                      className="flex-1"
                    />
                    <Input placeholder="키워드 입력" className="w-48" />
                    <Button>
                      <Search className="w-4 h-4 mr-2" />
                      분석 시작
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            현재 순위
                          </span>
                          <Badge variant="secondary">3위</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            예상 매출
                          </span>
                          <span className="font-bold">₩2,450,000</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            SEO 점수
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="font-bold">8.5/10</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    상세 분석 보고서 다운로드
                  </Button>
                </div>
              )}
              {service.id !== "seo-analysis" && (
                <div className="text-center py-12">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 ">{service.description}</p>
                  <p className="text-base font-medium text-gray-600 ">
                    {service.text?.[0]?.content}
                  </p>

                  <p className="text-base font-medium text-gray-600 ">
                    {service.text?.[1]?.content}
                  </p>

                  <p className="text-base font-medium text-gray-600 ">
                    {service.text?.[2]?.content}
                  </p>
                  <br />

                  <Button onClick={() => setShowMembership(true)}>
                    PRO 기능 이용하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </>
  );
};
