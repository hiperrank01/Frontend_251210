import Logo from "@/public/Logo_Main.png";
import Image from "next/image";
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

            <p>데이터 분석 기반 매출 최적화</p>
            {/* <p>대표가 웹사이트를 만들 줄 압니다</p> */}
            
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>주소:서울 강서구 공항대로61길 29 글로벌마케팅센터 a동 201호</p>
            <p>전화: 010-4590-4917</p>
            <p>이메일:9winit01@gmail.com</p>
            <p>사업자번호: 246-17-02470</p>
            <p>대표: 배대근</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 나인위닛. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
