"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";

export default function UserProfile() {
  const user = useAuthStore((state) => state.user);

  const displayName = user?.nm?.trim() || user?.eml_adr || "사용자";
  const displayEmail = user?.eml_adr ?? "";
  const initial = (user?.nm?.[0] ?? user?.eml_adr?.[0] ?? "U").toUpperCase();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/placeholder-user.jpg" alt="사용자 프로필 사진" />
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{displayName}</p>
          {displayEmail && (
            <p className="text-sm text-muted-foreground">{displayEmail}</p>
          )}
        </div>
        <Button className="ml-auto">Edit Profile</Button>
      </CardContent>
    </Card>
  );
}
