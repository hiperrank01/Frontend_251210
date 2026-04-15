"use client";

import { useEffect, useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Calendar,
  AlertCircle,
  Crown,
  Loader2,
  Receipt,
  RotateCcw,
} from "lucide-react";
import { useAuthStore } from "@/store/store";
import {
  getSubscriptionStatus,
  getPaymentHistory,
  cancelSubscription,
  resubscribe,
  type SubscriptionStatus,
  type PaymentRecord,
} from "@/fetch/subscription-api";
import { toast } from "sonner";

export default function SubscriptionInfo() {
  const { isPro, accessToken, email, nm, phoneNumber, userId } = useAuthStore();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(
    null,
  );
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [resubscribing, setResubscribing] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const subData = await getSubscriptionStatus();
        setSubscription(subData);
      } catch {
        // 구독 없음
        setSubscription(null);
      }
      try {
        const payData = await getPaymentHistory();
        setPayments(payData.results || []);
      } catch {
        setPayments([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [accessToken]);

  const handleCancel = async () => {
    if (
      !confirm(
        "정말 구독을 해지하시겠습니까?\n현재 결제 주기 종료 후 해지됩니다.",
      )
    )
      return;

    setCancelling(true);
    try {
      await cancelSubscription();
      // 상태 갱신
      const subData = await getSubscriptionStatus();
      setSubscription(subData);
    } catch (err: unknown) {
      alert(
        err instanceof Error
          ? err.message
          : "해지 처리 중 오류가 발생했습니다.",
      );
    } finally {
      setCancelling(false);
    }
  };

  const handleResubscribe = async () => {
    if (!subscription) return;

    setResubscribing(true);
    try {
      const issueId = `iss${crypto.randomUUID().replace(/-/g, "").slice(0, 36)}`;

      const response = await PortOne.requestIssueBillingKey({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        billingKeyMethod: "CARD",
        issueId,
        issueName: `PRO 멤버십 재구독 결제 등록`,
        customer: {
          customerId: userId ? String(userId) : `customer-${Date.now()}`,
          email: email || undefined,
          phoneNumber: phoneNumber || undefined,
          fullName: nm || undefined,
        },
      });

      if (response?.code != null) {
        toast.error(response.message || "빌링키 발급에 실패했습니다.");
        return;
      }

      if (response?.billingKey) {
        const result = await resubscribe({
          billingKey: response.billingKey,
          issueId,
        });

        // 구독 상태 갱신
        const subData = await getSubscriptionStatus();
        setSubscription(subData);
        toast.success(result.detail);
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "재구독 처리 중 오류가 발생했습니다.",
      );
    } finally {
      setResubscribing(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return `₩${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      active: { label: "활성", className: "bg-green-100 text-green-700" },
      paused: { label: "일시정지", className: "bg-yellow-100 text-yellow-700" },
      cancelled: { label: "해지", className: "bg-gray-100 text-gray-700" },
      expired: { label: "만료", className: "bg-gray-100 text-gray-700" },
      payment_failed: {
        label: "결제실패",
        className: "bg-red-100 text-red-700",
      },
    };
    const v = variants[status] || {
      label: status,
      className: "bg-gray-100 text-gray-700",
    };
    return <Badge className={v.className}>{v.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      paid: { label: "결제완료", className: "bg-green-100 text-green-700" },
      failed: { label: "실패", className: "bg-red-100 text-red-700" },
      cancelled: { label: "취소", className: "bg-gray-100 text-gray-700" },
      refunded: { label: "환불", className: "bg-blue-100 text-blue-700" },
    };
    const v = variants[status] || {
      label: status,
      className: "bg-gray-100 text-gray-700",
    };
    return <Badge className={v.className}>{v.label}</Badge>;
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  // 구독 없음 → PRO 가입 유도
  if (!subscription) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            구독 관리
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-gray-500 mb-4">현재 활성된 구독이 없습니다.</p>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => (window.location.href = "/pro-upgrade")}
          >
            PRO 멤버십 가입하기
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 구독 현황 */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              구독 현황
            </CardTitle>
            {getStatusBadge(subscription.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">플랜</p>
              <p className="font-semibold">{subscription.plan.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">결제 금액</p>
              <p className="font-semibold">
                {formatAmount(subscription.plan.totalPrice)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                현재 주기
              </p>
              <p className="text-sm">
                {formatDate(subscription.currentPeriodStart)} ~{" "}
                {formatDate(subscription.currentPeriodEnd)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5" />
                다음 결제일
              </p>
              <p className="text-sm">
                {subscription.cancelAtPeriodEnd
                  ? "해지 예정"
                  : formatDate(subscription.nextPaymentDate)}
              </p>
            </div>
          </div>

          {/* 결제 카드 정보 */}
          {subscription.billingKeyInfo && (
            <>
              <Separator />
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">
                    {subscription.billingKeyInfo.cardName || "카드"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {subscription.billingKeyInfo.cardNumberMasked ||
                      "카드번호 정보 없음"}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* 해지 예정 안내 */}
          {subscription.cancelAtPeriodEnd && (
            <>
              <Separator />
              <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm text-yellow-700">
                  {formatDate(subscription.currentPeriodEnd)}에 구독이
                  해지됩니다. 그때까지 PRO 기능을 이용할 수 있습니다.
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleResubscribe}
                  disabled={resubscribing}
                >
                  {resubscribing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    <>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      재구독
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {/* 구독 해지 버튼 */}
          {subscription.status === "active" &&
            !subscription.cancelAtPeriodEnd && (
              <>
                <Separator />
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={handleCancel}
                    disabled={cancelling}
                  >
                    {cancelling ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        처리 중...
                      </>
                    ) : (
                      "구독 해지"
                    )}
                  </Button>
                </div>
              </>
            )}
        </CardContent>
      </Card>

      {/* 결제 내역 */}
      <Card className="w-full">
        <CardHeader>
          <button
            className="flex items-center justify-between w-full"
            onClick={() => setShowPayments(!showPayments)}
          >
            <CardTitle className="flex items-center gap-2 text-base">
              <Receipt className="h-5 w-5 text-gray-500" />
              결제 내역
            </CardTitle>
            <span className="text-sm text-gray-400">
              {showPayments ? "접기" : `${payments.length}건`}
            </span>
          </button>
        </CardHeader>
        {showPayments && (
          <CardContent>
            {payments.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                결제 내역이 없습니다.
              </p>
            ) : (
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {formatAmount(payment.amount)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(payment.paidAt || payment.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {payment.refundAmount && (
                        <span className="text-xs text-blue-600">
                          환불 {formatAmount(payment.refundAmount)}
                        </span>
                      )}
                      {getPaymentStatusBadge(payment.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
