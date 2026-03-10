import Logo from "@/public/Logo_Main.png";
import Image from "next/image";
import Link from "next/link";
export const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                className="w-40"
                width={60}
                height={60}
                src={Logo.src}
                alt="나인위닛 로고"
              />
            </div>

            <p>마케팅이 필요한 모든 비즈니스를 위한 서비스</p>
            <p>네이버 광고 대행 무료</p>

          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>주소: 서울특별시 강서구 등촌동 648-5 아임2030 201호</p>
            <p>전화: 010-4590-4917</p>
            <p>이메일:9winit01@gmail.com</p>
            <p>사업자번호: 246-17-02470</p>
            <p>대표: 배대근</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col items-center text-gray-400">
          <div className="flex space-x-6 mb-4 text-xs">
            <Link href="/legal/terms-of-service" className="hover:text-white transition-colors">이용약관</Link>
            <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">개인정보 처리방침</Link>
          </div>
          <p className="text-sm">&copy; 2025 나인위닛. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
