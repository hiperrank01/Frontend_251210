import { Search, TrendingUp, BarChart3, Users, ImageIcon } from "lucide-react";
import { SERVICE_TYPE } from "@/types/service-data";

export const services: SERVICE_TYPE = [
  {
    id: "media-report",
    title: "자동화 보고서",
    icon: <BarChart3 className="w-6 h-6" />,
    description2: `나인위닛 자동화 보고서를 사용해야 하는 이유

1)캠페인/그룹/소재별 누수 조기 발견
-광고 순위가 내려가게 되면 판매량이 떨어지게 되고 품질지수가 떨어져 나중에는 막대한 광고비로 순위를 올려야 합니다.
-악순환이 되지 않게 조기에 잡아드립니다.

2)황금키워드 관리
-어떤 키워드가 매출이 증가되었는지 디테일하게 잡아드립니다.
-누수가 되는 키워드는 조기에 차단을 해야합니다. 키워드 관리가 시작입니다.
`,
    text: [{ content: <img src="/report/report_00.png" /> }],
  },
  {
    id: "ga-analysis",
    title: "GA 활용 고객 행동 분석",
    icon: <Users className="w-6 h-6" />,
    description: "루커스튜디오 연동 CRM, 코호트, AARRR 퍼널 분석 ",
    description2:
      "GA 연동시 전담 개발자가 필요하여 구글태그매니저 설치 등 구독이 필요합니다. \n 자사몰 매체별 유입 현황 트래킹리타게팅 광고 운영매체별 A,B 테스트 자동 보고서 제공",
    description3: `GA4 사용해야 하는 이유
1)자사몰 상세페이지에 대한 
2)광고 유입 채널 분석
3)페이지별 체류 시간
4)광고 소재에 따른 AB테스트
5)보고서 제공
6)유지 보수 비용`,
    text: [
      { content: <img src="/ga/AB_TEST_REPORT.png" /> },
      { content: <img src="/ga/ga활용1.png" /> },
      { content: <img src="/ga/ga활용2.png" /> },
      { content: <img src="/ga/ga활용3.png" /> },
      { content: <img src="/ga/ga활용4.png" /> },

      {
        content: "1. 구글애즈 ➡️  리마케팅 | 구글 태그매니저 | 검색어 리포트",
      },
      { content: "2. GA4 세팅 및 전환분석-전환 추적-utm 설치-태그 어시스턴트" },
      {
        content:
          "3.CRM 마케팅 ➡️ 내부데이터 활용한 코호트, RFM, AARRR 퍼널 분석",
      },
    ],
  },
  {
    id: "seo-analysis",
    title: "쇼핑검색 상품/키워드 분석",
    icon: <Search className="w-6 h-6" />,
    description:
      "스마트스토어 URL 분석으로 상품명, 순위, 판매가, 리뷰, 평점 등 종합 SEO 정보 제공",
    text: [
      {
        content:
          "품질지수의 중요함 아시나요?\n\n품질지수가 떨어지는 이유\n1)판매량 2)광고 경쟁순위 3)경쟁사 4)전환율 등등\n\n이게 왜 떨어지는지 판매자도 마케터도 대부분 모릅니다.\n광고 순위에 대한 디테일한 관리가 안되기 때문입니다.\n\n어떤 캠페인의 소재가 경쟁사로 인해 순위가 떨어진걸 알지 모릅니다.\n순위가 떨어지면 판매량이 떨어지고 품질지수가 떨어지고 일반영역 랭킹에도 영향이 갑니다.\n\n이는 무조건 자동화가 필요합니다. 나인위닛은 이를 해결하였습니다.",
      },
    ],
  },
  {
    id: "competitor",
    title: "자사 경쟁사 분석",
    icon: <TrendingUp className="w-6 h-6" />,
    description: "경쟁사 대비 우위 요소 분석 및 상품 개선 방안 도출",
    text: [
      {
        content:
          "➡️-자사 경쟁사 프로그램 활용한 키워드별 판매량 높은 상품 추적",
      },
      { content: "➡️브랜드 스토리, 철학, 인지도, 마케팅 차별화 포인트" },

      { content: <img src="/competitor_01.png" /> },
      { content: <img src="/competitor_02.png" /> },
      { content: <img src="/competitor_03.png" /> },
    ],
  },
  // {
  //   id: "report-auto",
  //   title: "보고서 자동화",
  //   icon: <FileText className="w-6 h-6" />,
  //   description: "캠페인별 노출수, 클릭수, 광고비, 매출액, ROAS 자동 리포팅",
  // },

  // {
  //   id: "auto-bid",
  //   title: "자동입찰",
  //   icon: <Target className="w-6 h-6" />,
  //   description: "목표 순위 기반 키워드 자동입찰 시스템",
  // },

  {
    id: "creative",
    title: "이미지/영상 제작",
    icon: <ImageIcon className="w-6 h-6" />,
    description: "10년 이상 경력 전문가의 디자인 기획 제작 서비스",
    text: [],
  },
];
