"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/store";

export default function UserProfile() {
  const { email, nm, isPro } = useAuthStore();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>내 프로필</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
          <AvatarFallback>{nm ? nm[0] : "U"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">{nm}</p>
            {isPro && (
              <Badge className="bg-yellow-100 text-yellow-700">PRO</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <Button className="ml-auto">프로필 수정</Button>
      </CardContent>
    </Card>
  );
}
