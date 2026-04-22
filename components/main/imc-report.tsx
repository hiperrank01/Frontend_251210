"use client";

import React from "react";

export const IMCReport = () => {
  return (
    <div className="w-full mt-8 space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg px-6 py-4 text-white">
        <h3 className="text-xl font-bold mb-2">IMC 통합 마케팅 제안서</h3>
        <p className="text-white/90 mb-4">
          웹사이트 URL 입력시 페이지 분석을 통한 IMC 통합 마케팅 제안서 작성
        </p>
      </div>

      {/* 블로그 자동화 iframe */}
      <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src="http://49.50.134.252:4000/"
          className="w-full border-0"
          style={{ height: "800px" }}
          title="Naver Blog Automation"
          allow="accelerometer; clipboard-write; encrypted-media"
        />
      </div>
    </div>
  );
};
