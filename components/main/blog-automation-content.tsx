"use client";

import React from "react";

export const BlogAutomation = () => {
    return (
        <div className="w-full mt-8 space-y-8">
            {/* 블로그 자동화 설명 */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg px-6 py-4 text-white">
                <h3 className="text-xl font-bold mb-2">📝 AI 네이버 블로그 자동화</h3>
                <p className="text-white/90">
                    네이버 계정 정보와 키워드를 입력하면 AI가 자동으로 블로그 글을 작성하고 발행합니다.
                </p>
                <ul className="mt-3 text-sm text-white/80 space-y-1">
                    <li>✓ AI 기반 콘텐츠 자동 생성</li>
                    <li>✓ DALL-E 기반 썸네일 이미지 자동 생성</li>
                    <li>✓ 목차, 소제목, 본문 자동 구성</li>
                    <li>✓ 네이버 블로그 자동 발행</li>
                </ul>
            </div>

            {/* 블로그 자동화 iframe */}
            <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <iframe
                    src="https://blog-automation.ninewinit.store/"
                    className="w-full border-0"
                    style={{ height: "800px" }}
                    title="Naver Blog Automation"
                    allow="accelerometer; clipboard-write; encrypted-media"
                />
            </div>

            {/* 주의사항 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ 주의사항</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 네이버 2단계 인증이 해제되어 있어야 합니다.</li>
                    <li>• 자동화 실행 중에는 브라우저가 열리며, 완료될 때까지 대기해주세요.</li>
                    <li>• 하루 발행 횟수에 제한이 있을 수 있습니다.</li>
                </ul>
            </div>
        </div>
    );
};
