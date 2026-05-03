import { useQuery } from "@tanstack/react-query";

import { fetchDashboard } from "@/fetch/trends/dashboard-api";
import type { DashboardData } from "@/types/api";

export const useDashboard = (date: string) => {
  return useQuery<DashboardData, Error>({
    queryKey: ["marketing-trend-dashboard", date],
    queryFn: () => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken") || ""
          : "";
      return fetchDashboard(date, accessToken);
    },
  });
};
