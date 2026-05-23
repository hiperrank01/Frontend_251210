import UserProfile from "@/components/mypage/user-profile";
import MypageMenu from "@/components/mypage/mypage-menu";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RouteGuard } from "@/components/auth/route-guard";

export default function Mypage() {
  return (
    <RouteGuard>
      <Header />
      <div className="container mx-auto py-8 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <MypageMenu />
          </div>
          <div className="md:col-span-3">
            <UserProfile />
          </div>
        </div>
      </div>
      <Footer />
    </RouteGuard>
  );
}
