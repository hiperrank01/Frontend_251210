"use client";

import { useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  CreditCard,
  Shield,
  Star,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "@/store/store";

interface Plan {
  id: string;
  duration: string;
  cycle: string;
  basePrice: number;
  vat: number;
  totalPrice: number;
  displayPrice: string;
  displayTotal: string;
  popular: boolean;
}

const plans: Plan[] = [
  {
    id: "1month",
    duration: "1개월",
    cycle: "매월",
    basePrice: 7900,
    vat: 790,
    totalPrice: 8690,
    displayPrice: "₩7,900",
    displayTotal: "₩8,690",
    popular: false,
  },
  {
    id: "3month",
    duration: "3개월",
    cycle: "3개월마다",
    basePrice: 19800,
    vat: 1980,
    totalPrice: 21780,
    displayPrice: "₩19,800",
    displayTotal: "₩21,780",
    popular: true,
  },
  {
    id: "1year",
    duration: "1년",
    cycle: "매년",
    basePrice: 80000,
    vat: 8000,
    totalPrice: 88000,
    displayPrice: "₩80,000",
    displayTotal: "₩88,000",
    popular: false,
  },
];

const features = [
  "고급 분석 도구 이용",
  "무제한 프로젝트 생성",
  "우선 고객 지원",
  "고급 템플릿 액세스",
  "팀 협업 기능",
  "데이터 내보내기",
];

export default function ProSignupPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { email, nm, phoneNumber } = useAuthStore();

  const currentPlan = plans.find((p) => p.id === selectedPlan);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setStep(2);
    setResult(null);
  };

  const handleRegisterBillingKey = async () => {
    if (!currentPlan) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await PortOne.requestIssueBillingKey({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        billingKeyMethod: "CARD",
        issueId: `iss${crypto.randomUUID().replace(/-/g, "").slice(0, 36)}`,
        issueName: `PRO 멤버십 ${currentPlan.duration} 정기결제 등록`,
        customer: {
          customerId: `customer-${Date.now()}`,
          email: email || undefined,
          phoneNumber: phoneNumber || undefined,
          fullName: nm || undefined,
        },
      });

      if (response?.code != null) {
        setResult({
          type: "error",
          message: response.message || "빌링키 발급에 실패했습니다.",
        });
      } else if (response?.billingKey) {
        // 빌링키 발급 성공 → 첫 결제 실행
        const payRes = await fetch("/api/pay-with-billing-key", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            billingKey: response.billingKey,
            orderName: `PRO 멤버십 ${currentPlan.duration} 정기결제`,
            amount: currentPlan.totalPrice,
            currency: "KRW",
            customer: {
              customerId: `customer-${Date.now()}`,
              email: email || undefined,
              phoneNumber: phoneNumber || undefined,
              fullName: nm || undefined,
            },
          }),
        });

        const payData = await payRes.json();

        if (!payRes.ok) {
          setResult({
            type: "error",
            message: payData.error || "결제에 실패했습니다.",
          });
          return;
        }

        setResult({
          type: "success",
          message: `결제가 완료되었습니다. ${currentPlan.cycle} ${currentPlan.displayTotal}이 자동 결제됩니다.`,
        });
        setStep(3);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "알 수 없는 오류";
      setResult({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  // Step 1: 플랜 선택
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PRO 멤버십 가입
            </h1>
            <p className="text-xl text-gray-600">
              전문 기능을 이용하고 더 정확한 분석을 받아보세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative cursor-pointer transition-all hover:shadow-lg ${
                  plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    인기
                  </Badge>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold">
                    {plan.duration}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{plan.cycle} 자동결제</p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-gray-900">
                    {plan.displayPrice}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    + VAT 10% = {plan.displayTotal}
                  </p>
                  <Button
                    className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white"
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    선택하기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                PRO 멤버십 혜택
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 2: 결제 확인 & 빌링키 등록
  if (step === 2 && currentPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => {
              setStep(1);
              setResult(null);
            }}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            플랜 다시 선택
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              정기결제 등록
            </h1>
            <p className="text-gray-600">
              결제 카드를 등록하면 자동으로 정기결제가 시작됩니다
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                주문 요약
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">플랜</span>
                <span className="font-semibold">
                  PRO 멤버십 ({currentPlan.duration})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">결제 주기</span>
                <span className="font-semibold">{currentPlan.cycle}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-gray-600">이용료</span>
                <span>{currentPlan.displayPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">부가세 (10%)</span>
                <span>₩{currentPlan.vat.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>결제 금액</span>
                <span className="text-blue-600">
                  {currentPlan.displayTotal}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                결제 수단 등록
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <Shield className="h-4 w-4" />
                  <span className="font-semibold">안전한 결제</span>
                </div>
                <p className="text-sm text-blue-600">
                  카드 정보는 KG이니시스를 통해 안전하게 처리되며, 당사 서버에는
                  저장되지 않습니다.
                </p>
              </div>

              <ul className="text-sm text-gray-500 space-y-1">
                <li>
                  • {currentPlan.cycle} {currentPlan.displayTotal}이 자동
                  결제됩니다
                </li>
                <li>• 언제든 마이페이지에서 구독을 해지할 수 있습니다</li>
                <li>• 다음 결제일 전 이메일로 알림을 드립니다</li>
              </ul>

              {result?.type === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-700">{result.message}</p>
                </div>
              )}

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base"
                onClick={handleRegisterBillingKey}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    처리 중...
                  </>
                ) : (
                  `${currentPlan.displayTotal} 정기결제 등록하기`
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 3: 등록 완료
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            정기결제 등록 완료!
          </h1>
          <p className="text-gray-600 mb-2">
            PRO 멤버십 ({currentPlan?.duration})이 활성화되었습니다.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            {currentPlan?.cycle} {currentPlan?.displayTotal}이 자동 결제됩니다.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">
              이용 가능한 PRO 기능
            </h3>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => (window.location.href = "/dashboard")}
          >
            대시보드로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}
