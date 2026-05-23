import Logo from "@/public/Logo_Main.png";
import { COMPANY_INFO } from "@/config/company";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={Logo.src} alt={`${COMPANY_INFO.name} 로고`} />
            </div>
            <p className="text-gray-400">{COMPANY_INFO.tagline}</p>
            <p>{COMPANY_INFO.subTagline}</p>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>주소: {COMPANY_INFO.address}</p>
            <p>전화: {COMPANY_INFO.phone}</p>
            <p>이메일: {COMPANY_INFO.email}</p>
            <p>사업자번호: {COMPANY_INFO.businessNumber}</p>
            <p>대표: {COMPANY_INFO.ceo}</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {COMPANY_INFO.copyrightYear} {COMPANY_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
