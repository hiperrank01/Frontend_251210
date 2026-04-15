"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  useReportQuery,
  useSummaryGridDataQuery,
  useComparisonGridDataQuery,
  useHistoryGridDataQuery,
  useMonthlyReportSummaryDataQuery,
  useSummeryComparisonDataQuery,
} from "@/hooks/dashboard/report/report";
import { MonthlyReportChart } from "@/components/dashboard/report-sections/monthly-report-chart";
import { ReportFilters } from "@/components/dashboard/report-sections/report-filters";
import { SummaryGridSection } from "@/components/dashboard/report-sections/SummaryGridSection";
import ComparisonGridSection from "@/components/dashboard/report-sections/ComparisonGridSection";
import SummeryComparisonSection from "@/components/dashboard/report-sections/SummeryComparisonSection";
import { HistoryGridSection } from "@/components/dashboard/report-sections/HistoryGridSection";
import { MonthlyReportSummarySection } from "@/components/dashboard/report-sections/MonthlyReportSummarySection";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  ProUpgradePrompt,
  isSubscriptionError,
} from "@/components/dashboard/report-sections/pro-upgrade-prompt";

const CustomerReportPage = () => {
  const params = useParams<{ customerId: string }>();
  const customerId = params?.customerId as string;
  const [year, setYear] = useState<string | undefined>();
  const [month, setMonth] = useState("9");

  const enabledQuery = !!(customerId && year && month);

  const {
    data: chartRawData,
    error: chartError,
    isLoading: isChartLoading,
  } = useReportQuery(customerId, year || "", month, enabledQuery);

  const {
    data: summaryGridData,
    isLoading: isLoadingSummaryGrid,
    error: errorSummaryGrid,
  } = useSummaryGridDataQuery(customerId, year || "", month, enabledQuery);

  const {
    data: comparisonGridData,
    isLoading: isLoadingComparisonGrid,
    error: errorComparisonGrid,
  } = useComparisonGridDataQuery(customerId, year || "", month, enabledQuery);

  const {
    data: historyGridData,
    isLoading: isLoadingHistoryGrid,
    error: errorHistoryGrid,
  } = useHistoryGridDataQuery(customerId, year || "", month, enabledQuery);
  const {
    data: summeryComparisonData,
    isLoading: isLoadingSummeryComparison,
    error: errorSummeryComparison,
  } = useSummeryComparisonDataQuery(
    customerId,
    year || "",
    month,
    enabledQuery,
  );
  const {
    data: monthlyReportSummaryData,
    isLoading: isLoadingMonthlyReportSummary,
    error: errorMonthlyReportSummary,
  } = useMonthlyReportSummaryDataQuery(
    customerId,
    year || "",
    month,
    enabledQuery,
  );

  const isAnythingLoading =
    isChartLoading ||
    isLoadingSummaryGrid ||
    isLoadingComparisonGrid ||
    isLoadingHistoryGrid ||
    isLoadingMonthlyReportSummary ||
    isLoadingSummeryComparison;

  const chartData = chartRawData?.rows || [];
  const chartConfig = {
    impCnt: { label: "노출수", color: "#2563eb" },
    clickCnt: { label: "클릭수", color: "#60a5fa" },
    convCnt: { label: "전환수", color: "#34d399" },
    total_cost: { label: "광고비", color: "#f97316" },
    total_conv_amt: { label: "전환매출", color: "#8b5cf6" },
    avg_ror: { label: "ROAS", color: "#20c997" },
  };

  return (
    <div className="flex flex-col w-full min-h-screen py-8 px-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">대시보드</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>고객 {customerId} 보고서</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-4xl font-bold">고객 {customerId} 보고서</h1>

      <ReportFilters
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
      />

      <div className="mt-8 w-full max-w-6xl self-center">
        {isAnythingLoading ? (
          <div className="flex items-center justify-center h-96">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {chartError && (
              <p className="text-center text-red-500">
                차트 에러: {chartError.message}
              </p>
            )}
            {chartData.length > 0 && !chartError && (
              <MonthlyReportChart
                chartData={chartData}
                chartConfig={chartConfig}
              />
            )}
            {chartData.length === 0 && !chartError && !enabledQuery && (
              <div className="flex items-center justify-center h-96">
                <p>리포트를 보시려면 기간을 선택해주세요.</p>
              </div>
            )}
            {chartData.length === 0 && !chartError && enabledQuery && (
              <div className="flex items-center justify-center h-96">
                <p>선택된 기간에 대한 차트 데이터가 없습니다.</p>
              </div>
            )}

            {isSubscriptionError(errorSummaryGrid) ||
            isSubscriptionError(errorComparisonGrid) ||
            isSubscriptionError(errorHistoryGrid) ||
            isSubscriptionError(errorSummeryComparison) ||
            isSubscriptionError(errorMonthlyReportSummary) ? (
              <ProUpgradePrompt />
            ) : (
              <>
                <SummaryGridSection
                  data={summaryGridData}
                  error={errorSummaryGrid}
                />
                <ComparisonGridSection
                  data={comparisonGridData}
                  error={errorComparisonGrid}
                />

                <HistoryGridSection
                  data={historyGridData}
                  error={errorHistoryGrid}
                />
                <SummeryComparisonSection
                  data={summeryComparisonData}
                  error={errorSummeryComparison}
                />
                <MonthlyReportSummarySection
                  data={monthlyReportSummaryData}
                  error={errorMonthlyReportSummary}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerReportPage;
