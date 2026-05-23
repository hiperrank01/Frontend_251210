"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/hooks/use-auth";

export default function MypageMenu() {
  const router = useRouter();
  const logout = useLogoutMutation();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => router.replace("/"),
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-2 p-4">
        <Button variant="ghost" className="justify-start">Account Settings</Button>
        <Button variant="ghost" className="justify-start">Order History</Button>
        <Button variant="ghost" className="justify-start">Shipping Addresses</Button>
        <Button variant="ghost" className="justify-start">Payment Methods</Button>
        <Button
          variant="ghost"
          className="justify-start text-red-500"
          onClick={handleLogout}
          disabled={logout.isPending}
        >
          {logout.isPending ? "로그아웃 중..." : "Logout"}
        </Button>
      </CardContent>
    </Card>
  );
}
