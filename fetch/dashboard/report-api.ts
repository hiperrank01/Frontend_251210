export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function throwIfNotOk(res: Response, fallbackMessage: string) {
  if (!res.ok) throw new ApiError(fallbackMessage, res.status);
}

// 차트 데이터 조회
export const fetchChartData = async (
  data: { customer_id: string; year: string; month: string },
  accessToken: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/combination-chart/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  throwIfNotOk(res, "차트 데이터 조회 실패");
  return res.json();
};

// 고객 정보 조회
export const CustomerInfo = async (accessToken: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/user-customers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!res.ok) throw new ApiError("고객 정보 조회 실패", res.status);
  return res.json();
};

// 비교 그리드 데이터 조회
export const fetchComparisonGridData = async (
  data: { customer_id: string; year: string; month: string },
  accessToken: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/comparison-grid/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  throwIfNotOk(res, "비교 그리드 데이터 조회 실패");
  return res.json();
};

// 히스토리 그리드 데이터 조회
export const fetchHistoryGridData = async (
  data: { customer_id: string; year: string; month: string }, // Added customer_id
  accessToken: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/history-grid/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  throwIfNotOk(res, "히스토리 그리드 데이터 조회 실패");
  return res.json();
};

// 월간 리포트 요약 데이터 조회
export const fetchMonthlyReportSummaryData = async (
  data: { customer_id: string; year: string; month: string },
  accessToken: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/monthly-report-summary/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  throwIfNotOk(res, "월간 리포트 요약 데이터 조회 실패");
  return res.text();
};

// 요약 그리드 데이터 조회
export const fetchSummaryGridData = async (
  data: { customer_id: string; year: string; month: string },
  accessToken: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/summary-grid/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  throwIfNotOk(res, "요약 그리드 데이터 조회 실패");
  return res.json();
};

// 써머리 비교 대이터 조회
export const fetchSummeryComparisonData = async (
  data: { customer_id: string; year: string; month: string },
  accessToken: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ncc/monthly_report/monthly-campaign-report-summary/?customer_id=${data.customer_id}&year=${data.year}&month=${data.month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  throwIfNotOk(res, "써머리 비교 대이터 조회 실패");
  return res.json();
};
// 가능한 연도 조회
export const fetchAvailableYears = async (accessToken: string) => {
  console.log("Fetching available years with token:", accessToken);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return ["2025"];
};
