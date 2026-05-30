import type { DashboardData } from "@/types/api";
import { ApiError } from "@/fetch/dashboard/report-api";

export const fetchDashboard = async (
  date: string,
  accessToken: string,
): Promise<DashboardData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/trend/dashboard/?date=${encodeURIComponent(date)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    },
  );
  if (!res.ok) throw new ApiError("마케팅 트렌드 데이터 조회 실패", res.status);
  return res.json();
};
