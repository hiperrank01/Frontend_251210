"use client";

import React from "react";

export const IMCReport = () => {
  return (
    <div className="w-full mt-8 space-y-8">
      {/* IMC 통합 마케팅 제안서 iframe */}
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
