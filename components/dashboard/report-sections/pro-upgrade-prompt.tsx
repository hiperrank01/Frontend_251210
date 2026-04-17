"use client";

import { Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ProUpgradePrompt() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20 dark:border-primary/30 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-3">
            <Crown className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">
          구독이 필요한 기능입니다
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          PRO 멤버십으로 업그레이드하고
          <br />
          월간 보고서와 고급 분석 기능을 이용해 보세요.
        </p>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
          onClick={() => router.push("/pro-upgrade")}
        >
          PRO로 업그레이드
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export function isSubscriptionError(error: Error | null): boolean {
  if (!error) return false;
  return "status" in error && (error as { status: number }).status === 403;
}
