"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className=" bg-white flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-2xl md:text-2xl font-bold text-black mb-2 leading-tight">
            매출 성장 최적화
            <br />
            <span className=" text-black px-4 py-0 inline-block">
              광고 성과 자동화 대시보드 전문
            </span>
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* <p className="text-xl md:text-xl text-gray-600 mb-2 font-light">
            &quot;네이버/구글/메타 등 매체별 놓치고 있는 키워드는 없나?&quot;
          </p> */}
        </div>

        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-3 mb-10">
            <div className="group">
              <blockquote className=" hover:-rotate-1 transition-transform duration-300 text-base md:text-base text-black font-medium bg-gray-50 px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 italic">
                &quot;광고 매출/효율 Maximum으로 올리는 방법은?&quot;
              </blockquote>
            </div>

            <div className="group">
              <blockquote className=" hover:-rotate-1 transition-transform duration-300 text-base md:text-base text-black font-medium bg-gray-50 px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 italic">
                &quot;초기 스타트업 마케팅 어떻게 해야 할지 모를 때&quot;
              </blockquote>
            </div>
            <div className="group">
              <blockquote className="hover:-rotate-1 transition-transform duration-300 text-base md:text-base text-black font-medium bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 italic">
                &quot;상품 5개만 넘어가도 무엇을 어떻게 집중해야할지 모르는
                대행사들, 어떻게 관리해야할까?&quot;
              </blockquote>
            </div>
            <div className="group">
              <blockquote className="hover:-rotate-1 transition-transform duration-300 text-base md:text-base text-black font-medium bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 italic">
                &quot;API만 연결하면 CTR, 전환율, ROAS등의 데이터 지표를
                자동으로&quot;
              </blockquote>
            </div>
            <div className="group">
              <blockquote className="hover:-rotate-1 transition-transform duration-300 text-base md:text-base text-black font-medium bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 italic">
                &quot;일반 마케터, 일반 개발자는 절대 구현 못합니다.&quot;
              </blockquote>
            </div>
            <div className="group">
              <blockquote className="hover:-rotate-1 transition-transform duration-300 text-base md:text-base text-black font-medium bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 italic">
                &quot;전문가가 필요한 이유: 데이터 분석, 온라인 마케팅,
                소프트웨어 개발, 전략 수립, 효과적인 협업&quot;
              </blockquote>
            </div>
            <div className="group">
              <blockquote className="hover:-rotate-1 transition-transform duration-300 text-base md:text-base text-black font-medium bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 italic">
                &quot;네이버/구글/메타 등 매체별 놓치고 있는 키워드는 없나?&quot;
              </blockquote>
            </div>
          </div>
        </div>
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="py-0 rounded-xl">
            <p className="text-lg md:text-lg mb-0 text-black">
              데이터분석 & 온라인마케팅
            </p>

            <p className="text-lg md:text-xl text-black mb-2">
              매체/캠페인/소재/키워드별 매출 극대화
            </p>
            <Image
              className="text-center block mx-auto"
              src="/Logo_Main.png"
              width={200}
              height={60}
              alt="나인위닛 로고"
            />
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mt-3"></div>
        </div>
      </div>
    </div>
  );
}
