import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MypageMenu() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-2 p-4">
        <Button variant="ghost" className="justify-start">
          계정 설정
        </Button>
        <Button variant="ghost" className="justify-start">
          구독 관리
        </Button>
        <Button variant="ghost" className="justify-start">
          결제 내역
        </Button>
        <Button variant="ghost" className="justify-start text-red-500">
          로그아웃
        </Button>
      </CardContent>
    </Card>
  );
}
