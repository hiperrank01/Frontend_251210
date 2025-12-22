"use client";

import { useEffect, useState } from "react";
import { Search, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProductInfo } from "@/fetch/analysis/analysis-api";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface ProductInfo {
  rank: number;
  price: number;
  name: string;
  image_url: string;
  product_name: string;
}

interface ServiceTextItem {
  content: string | React.ReactNode;
}

interface Service {
  text?: ServiceTextItem[];
}

// interface Slot {
//   id: number | string;
//   platform: {
//     name: string;
//   };
//   keyword: string;
//   rank: number;
// }

export const SeoAnalysis = ({ service }: { service: Service }) => {
  // const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  // const [mySlots, setMySlots] = useState<Slot[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [keyword, setKeyword] = useState("");
  const [url, setUrl] = useState("");

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    setAccessToken(token);
  }, []);

  const mutation = useMutation({
    mutationFn: (data: { keyword: string; url: string }) =>
      fetchProductInfo(data, accessToken),
    onSuccess: (data) => {
      setProductInfo(data);
      setError(null);
    },
    onError: (error) => {
      setError("데이터를 불러오는 데 실패했습니다.");
      console.log(error);
    },
  });
  //슬롯 조회 기능 추가 미정
  // const fetchMySlots = useCallback(async () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) return;

  //   if (!baseUrl) {
  //     console.error("API URL이 설정되지 않았습니다.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${baseUrl}/api/slots/my_slots/`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (!response.ok) throw new Error("슬롯 목록 불러오기 실패");

  //     const data = await response.json();
  //     setMySlots(data);
  //   } catch (err) {
  //     console.error("❌ 슬롯 조회 오류:", err);
  //   }
  // }, [baseUrl]);

  // useEffect(() => {
  //   fetchMySlots();
  // }, [fetchMySlots]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-left justify-center gap-8 py-1">
        <p>
          {service.text
            ?.filter((item: ServiceTextItem) => !!item?.content)
            .map((item: ServiceTextItem, index: number) => (
              <p
                key={index}
                className="text-base font-medium text-gray-600 whitespace-pre-line [&_img]:w-3/4 [&_img]:h-auto [&_img]:object-contain [&_img]:mx-auto"
              >
                {item.content}
              </p>
            ))}
        </p>
      </div>
      <div className="flex space-x-2">
        <div className="w-full flex space-x-2">
          <Textarea
            placeholder="스마트스토어 URL을 입력하세요"
            className="w-full "
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Textarea
            placeholder="키워드 입력"
            className="w-38 "
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <Button
          onClick={() => {
            if (!keyword || !url) {
              alert("키워드와 URL을 모두 입력하세요.");
              return;
            }
            mutation.mutate({ keyword, url });
          }}
          disabled={mutation.status === "pending"}
        >
          <Search className="w-4 h-4 mr-2" />
          {mutation.status === "pending" ? "분석 중..." : "분석 시작"}
        </Button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {productInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <span className="text-sm text-gray-600 block mb-2">이미지</span>
              <div className="flex justify-center">
                <Image
                  className="rounded-lg shadow-lg mt-6 hover:scale-110 transition-transform duration-300"
                  style={{ boxShadow: "4px 8px 10px rgba(0,0,0,0.3)" }}
                  width={200}
                  height={200}
                  alt={productInfo.name || "상품 이미지"}
                  src={productInfo.image_url}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <span className="text-sm text-gray-600 block mb-2">상품명</span>
                <div className="mt-2 font-bold">{productInfo.product_name}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <span className="text-sm text-gray-600 block mb-2">
                  현재 순위
                </span>
                <Badge className="text-2xl" variant="secondary">
                  {productInfo.rank}위
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <span className="text-sm text-gray-600 block mb-2">
                  예상 매출
                </span>
                <span className="font-bold text-xl text-red-500">
                  ₩{productInfo.price?.toLocaleString()}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      {/* 슬롯 조회 기능 추가 미정 */}
      {/* {mySlots.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">📦 내 분석 슬롯</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mySlots.map((slot) => (
              <Card key={slot.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="text-sm text-gray-600">플랫폼</div>
                  <div className="font-bold">{slot.platform?.name}</div>
                  <div className="text-sm text-gray-600">키워드</div>
                  <div>{slot.keyword}</div>
                  <div className="text-sm text-gray-600">순위</div>
                  <Badge>{slot.rank}위</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )} */}

      <Button className="w-full mt-4">
        <Download className="w-4 h-4 mr-2" />
        상세 분석 보고서 다운로드
      </Button>
    </div>
  );
};
