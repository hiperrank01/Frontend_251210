import UserProfile from "@/components/mypage/user-profile";
import MypageMenu from "@/components/mypage/mypage-menu";
import SubscriptionInfo from "@/components/mypage/subscription-info";

export default function Mypage() {
  return (
    <>
      <div className="container mx-auto py-8 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <MypageMenu />
          </div>
          <div className="md:col-span-3 space-y-6">
            <UserProfile />
            <SubscriptionInfo />
          </div>
        </div>
      </div>
    </>
  );
}
