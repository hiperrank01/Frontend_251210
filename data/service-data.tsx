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
    text: [
      { content: <img src="/report/report_00.png" /> },
      { content: "01.캠페인별 리포트" },
      { content: <img src="/report/naver_report_01.png" /> },
      { content: "02.그룹별 리포트" },
      { content: <img src="/report/naver_report_02.png" /> },
      { content: "03.상품(소재)별 리포트" },
      { content: <img src="/report/naver_report_03.png" /> },
      { content: "04.키워드별 리포트" },
      { content: <img src="/report/naver_report_04.png" /> }
    ],
  },                                                                                                                                                     
  {
    id: "ga-analysis",
    title: "GA 활용 고객 행동 분석",
    icon: <Users className="w-6 h-6" />,
    description: "루커스튜디오 연동 CRM, 코호트, AARRR 퍼널 분석 ",
    description2:
      "자사몰 매체별 유입 현황 트래킹 및 리타게팅 광고 운영매체별 A,B 테스트 자동 보고서 제공",
    // description3: `GA4 사용해야 하는 이유`,

    text: [
      { content: "GA4 사용해야 하는 이유 및 예시" },
      { content: "01.유입채널분석" },
      { content: <img src="/ga/ga활용1.png" /> },
      { content: "02.퍼널별 이탈/전환율 분석" },
      { content: <img src="/ga/ga활용2.png" /> },
      { content: "03.캠페인 목적별 유입 분석-인지도, 트래픽, 구독자 증가 등" },
      { content: <img src="/ga/ga활용3.png" /> },
      { content: "04.고객 행동 흐름 분석, 세그먼트 분석" },
      { content: <img src="/ga/ga활용4.png" /> },
      { content: "05.소재별 AB테스트 보고서 제공" },
      // { content: "06.페이지별 체류시간 제공" },
      { content: <img src="/ga/AB_TEST_REPORT.png" /> },
      { content: "CRM 마케팅 ➡️ 내부데이터 활용한 코호트, RFM, AARRR 퍼널 분석"},
      { content: "GA4 연동시 utm, gtm 설치 등 전담 개발자가 필요합니다. \n 별도 문의 주시기 바랍니다." },
    ],
  },
  {
    id: "seo-analysis",
    title: "랭킹/예상 매출 분석",
    icon: <Search className="w-6 h-6" />,
    description:
      "스마트스토어 URL 분석으로 자사/경쟁사 상품명, 순위, 예상매출 정보 제공",
    text: [
      {
        content:
          "품질지수의 중요함 아시나요?\n\n품질지수가 떨어지는 이유 \n1)판매량 2)랭킹 3)경쟁사 4)전환율 등등\n\n랭킹이 왜 떨어질까요? 판매자도 마케터도 대부분 모릅니다.\n\n어떤 이유로 순위가 떨어졌는지 모릅니다.\n광고 순위에 대한 디테일한 관리가 안되기 때문입니다.\n순위가 떨어지면 판매량이 떨어지고 품질지수가 떨어지고 일반영역 랭킹에도 영향이 갑니다.\n\n저희는 랭킹에 집중하였으며, 예상 판매량을 보고 빠르게 판단해야 합니다.",
        },
        { content: <img src="/report/ranking_01.png" /> },
    ],
  },
  {
    id: "competitor",
    title: "자사 경쟁사 분석",
    icon: <TrendingUp className="w-6 h-6" />,
    // description: "경쟁사 대비 우위 요소 분석 및 상품 개선 방안 도출",
    text: [
      { content:"자사 프로그램 활용한 키워드별 상품 정보 제공"},
      { content: "PRO 결제시 경쟁사 대비 우위 요소 분석 및 상품 개선 방안 제공" },
      { content: "➡️순위, 상품명, 판매가, 스토어명, 구매수, 리뷰평점 제공" },
      { content: <img src="/competitor_00.png" /> },
      { content: <img src="/competitor_03.png" /> },
    ],
  },
  // {
  //   id: "report-auto",
  //   title: "보고서 자동화",
  //   icon: <FileText className="w-6 h-6" />,
  //   description: "캠페인별 노출수, 클릭수, 광고비, 매출액, ROAS 자동 리포팅",
  // },import { Search, TrendingUp, BarChart3, Users, ImageIcon } from "lucide-react";
import { SERVICE_TYPE } from "@/types/service-data";

export const services: SERVICE_TYPE = [
  {
    id: "media-report",
    title: "자동화 보고서",
    icon: <BarChart3 className="w-6 h-6" />,
    description: "캠페인/그룹/소재별 성과 분석 및 키워드 관리",
    description2: `나인위닛 자동화 보고서를 사용해야 하는 이유

1) 캠페인/그룹/소재별 누수 조기 발견
- 광고 순위가 내려가게 되면 판매량이 떨어지게 되고 품질지수가 떨어져 나중에는 막대한 광고비로 순위를 올려야 합니다.
- 악순환이 되지 않게 조기에 잡아드립니다.

2) 황금키워드 관리
- 어떤 키워드가 매출이 증가되었는지 디테일하게 잡아드립니다.
- 누수가 되는 키워드는 조기에 차단을 해야합니다. 키워드 관리가 시작입니다.`,
    text: [
      { content: <img src="/report/report_00.png" /> },
      { content: "01. 캠페인별 리포트" },
      { content: <img src="/report/naver_report_01.png" /> },
      { content: "02. 그룹별 리포트" },
      { content: <img src="/report/naver_report_02.png" /> },
      { content: "03. 상품(소재)별 리포트" },
      { content: <img src="/report/naver_report_03.png" /> },
      { content: "04. 키워드별 리포트" },
      { content: <img src="/report/naver_report_04.png" /> }
    ],
  },
  {
    id: "ga-analysis",
    title: "GA 활용 고객 행동 분석",
    icon: <Users className="w-6 h-6" />,
    description: "루커스튜디오 연동 CRM, 코호트, AARRR 퍼널 분석",
    description2: "자사몰 매체별 유입 현황 트래킹 및 리타게팅 광고 운영, 매체별 A/B 테스트 자동 보고서 제공",
    text: [
      { content: "GA4 사용해야 하는 이유 및 예시" },
      { content: "01. 유입채널분석" },
      { content: <img src="/ga/ga활용1.png" /> },
      { content: "02. 퍼널별 이탈/전환율 분석" },
      { content: <img src="/ga/ga활용2.png" /> },
      { content: "03. 캠페인 목적별 유입 분석 - 인지도, 트래픽, 구독자 증가 등" },
      { content: <img src="/ga/ga활용3.png" /> },
      { content: "04. 고객 행동 흐름 분석, 세그먼트 분석" },
      { content: <img src="/ga/ga활용4.png" /> },
      { content: "05. 소재별 AB테스트 보고서 제공" },
      { content: <img src="/ga/AB_TEST_REPORT.png" /> },
      { content: "CRM 마케팅 ➡️ 내부데이터 활용한 코호트, RFM, AARRR 퍼널 분석" },
      { content: "GA4 연동시 utm, gtm 설치 등 전담 개발자가 필요합니다. 별도 문의 주시기 바랍니다." },
    ],
  },
  {
    id: "seo-analysis",
    title: "랭킹/예상 매출 분석",
    icon: <Search className="w-6 h-6" />,
    description: "스마트스토어 URL 분석으로 자사/경쟁사 상품명, 순위, 예상매출 정보 제공",
    text: [
      {
        content: `품질지수의 중요함 아시나요?

품질지수가 떨어지는 이유
1) 판매량 2) 랭킹 3) 경쟁사 4) 전환율 등등

랭킹이 왜 떨어질까요? 판매자도 마케터도 대부분 모릅니다.

어떤 이유로 순위가 떨어졌는지 모릅니다.
광고 순위에 대한 디테일한 관리가 안되기 때문입니다.
순위가 떨어지면 판매량이 떨어지고 품질지수가 떨어지고 일반영역 랭킹에도 영향이 갑니다.

저희는 랭킹에 집중하였으며, 예상 판매량을 보고 빠르게 판단해야 합니다.`,
      },
      { content: <img src="/report/ranking_01.png" /> },
    ],
  },
  {
    id: "competitor",
    title: "자사 경쟁사 분석",
    icon: <TrendingUp className="w-6 h-6" />,
    description: "경쟁사 대비 우위 요소 분석 및 상품 개선 방안 도출",
    text: [
      { content: "자사 프로그램 활용한 키워드별 상품 정보 제공" },
      { content: "PRO 결제시 경쟁사 대비 우위 요소 분석 및 상품 개선 방안 제공" },
      { content: "➡️ 순위, 상품명, 판매가, 스토어명, 구매수, 리뷰평점 제공" },
      { content: <img src="/competitor_00.png" /> },
      { content: <img src="/competitor_03.png" /> },
    ],
  },
  {
    id: "creative",
    title: "이미지/영상 제작",
    icon: <ImageIcon className="w-6 h-6" />,
    description: "10년 이상 경력 전문가의 디자인 기획 제작 서비스",
    text: [],
  },
];

  // {
  //   id: "auto-bid",
  //   title: "자동입찰",
  //   icon: <Target className="w-6 h-6" />,
  //   description: "목표 순위 기반 키워드 자동입찰 시스템",
  // },

  {
    id: "video-creative",
    title: "이미지/영상 제작",
    icon: <ImageIcon className="w-6 h-6" />,
    description: "10년 이상 경력 전문가의 디자인 기획 제작 서비스",
    text: [],
  },
];
