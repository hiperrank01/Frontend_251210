"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-2xl font-bold">문제가 발생했습니다</h2>
      <p className="text-sm text-muted-foreground">
        잠시 후 다시 시도하거나, 문제가 계속되면 관리자에게 문의해주세요.
      </p>
      {process.env.NODE_ENV !== "production" && (
        <pre className="max-w-2xl overflow-x-auto rounded bg-gray-100 p-3 text-left text-xs">
          {error.message}
          {error.digest ? `\n\ndigest: ${error.digest}` : ""}
        </pre>
      )}
      <div className="flex gap-2">
        <Button onClick={() => reset()}>다시 시도</Button>
        <Button variant="outline" asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  );
}
