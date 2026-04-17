"use client";

import React from "react";

export type SummaryObject = {
  summary: string;
};

export type NestedSummaryObject = {
  summary: SummaryObject;
};

export type ReportData = string | SummaryObject | NestedSummaryObject;

interface SummaryComparisonSectionProps {
  data: ReportData | undefined | null;
  error: Error | null;
}

interface Item {
  name: string;
  percentText: string | null;
  prevAmount: number | null;
  currAmount: number | null;
  raw: string;
  direction: "up" | "down" | "neutral";
}

// ₩ 금액 숫자 추출
const extractAmounts = (s: string) => {
  const moneyRegex = /₩[\s\S]*?([0-9][0-9,\s]*)/g;
  const arr: string[] = [];
  let m;
  while ((m = moneyRegex.exec(s)) !== null) arr.push(m[1]);
  return arr.map((x) => Number(x.replace(/[,\s]/g, "")));
};

const parseLine = (line: string): Item => {
  const normalized = line
    .replace(/\u2212/g, "-")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  //  잘리는 부분 제거
  const cleaned = normalized.replace(/-\s*전월:\s*₩[0-9,]*/g, "").trim();

  const nameIdMatch = cleaned.match(
    /캠페인\s*'([^']+)'\s*\(id\s*[: ]?\s*([^\)]+)\)/i,
  );
  const nameMatch = cleaned.match(/캠페인\s*'([^']+)'/i);
  const name = nameIdMatch
    ? `${nameIdMatch[1].trim()} (id:${nameIdMatch[2].trim()})`
    : nameMatch
      ? nameMatch[1].trim()
      : cleaned.slice(0, 60);

  const percentMatch = cleaned.match(/\(\s*([+-]?[0-9,.]+)\s*%\s*\)/);
  const percentText = percentMatch
    ? `${
        percentMatch[1].startsWith("+") || percentMatch[1].startsWith("-")
          ? percentMatch[1]
          : percentMatch[1]
      }%`
    : null;

  const amounts = extractAmounts(cleaned);
  const prevAmount = amounts.length >= 1 ? amounts[0] : null;
  const currAmount = amounts.length >= 2 ? amounts[1] : null;

  let direction: Item["direction"] = "neutral";
  if (percentText) {
    const num = Number(percentText.replace(/%/g, "").replace(/,/g, ""));
    direction = num > 0 ? "up" : num < 0 ? "down" : "neutral";
  } else if (prevAmount !== null && currAmount !== null) {
    direction =
      currAmount > prevAmount
        ? "up"
        : currAmount < prevAmount
          ? "down"
          : "neutral";
  }

  return {
    name,
    percentText,
    prevAmount,
    currAmount,
    raw: cleaned,
    direction,
  };
};

/* 메인 섹션 컴포넌트 */
const SummaryComparisonSection = ({
  data,
  error,
}: SummaryComparisonSectionProps) => {
  if (error)
    return (
      <p className="text-center text-red-500 mt-8">
        써머리 비교 데이터 에러: {error.message}
      </p>
    );
  if (!data) return null;

  //  summaryText 추출
  let summaryText: string | null = null;

  try {
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed.summary === "string") {
          summaryText = parsed.summary;
        } else {
          summaryText = data;
        }
      } catch {
        summaryText = data;
      }
    } else if (data && typeof data.summary === "string") {
      try {
        const parsed = JSON.parse(data.summary);
        if (parsed && typeof parsed.summary === "string") {
          summaryText = parsed.summary;
        } else if (typeof parsed === "string") {
          summaryText = parsed;
        } else {
          summaryText = data.summary;
        }
      } catch {
        summaryText = data.summary;
      }
    } else if (
      data &&
      typeof data === "object" &&
      "summary" in data &&
      data.summary &&
      typeof data.summary === "object" &&
      "summary" in data.summary &&
      typeof data.summary.summary === "string"
    ) {
      summaryText = data.summary.summary;
    }
  } catch {
    summaryText = null;
  }

  if (!summaryText) return null;
  summaryText = summaryText.replace(/\\n/g, "\n");

  const lines = summaryText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const parsed: Item[] = lines.map(parseLine);
  const increased = parsed.filter((p) => p.direction === "up");
  const decreased = parsed.filter((p) => p.direction === "down");

  const renderPercent = (percentText: string | null) => {
    if (!percentText) return null;
    const isPositive = percentText.startsWith("+");
    const isNegative = percentText.startsWith("-");
    const icon = isPositive ? "📈" : isNegative ? "📉" : "";
    const colorClass = isPositive
      ? "text-red-500 font-bold"
      : isNegative
        ? "text-blue-500 font-bold"
        : "text-gray-500 font-medium";

    return (
      <span className="flex items-center gap-1">
        {icon}
        <span className={colorClass}>{percentText}</span>
      </span>
    );
  };

  const renderLine = (it: Item, textColorClass = "text-foreground/70") => (
    <p
      className={`${textColorClass} flex items-center flex-wrap gap-2 whitespace-nowrap`}
    >
      전월:{" "}
      <span className="font-medium">
        {it.prevAmount !== null ? it.prevAmount.toLocaleString() : "-"}
      </span>
      이번달:{" "}
      <span className="font-bold">
        {it.currAmount !== null ? it.currAmount.toLocaleString() : "-"}
      </span>
      {renderPercent(it.percentText)}
    </p>
  );

  if (!increased.length && !decreased.length) {
    return (
      <div className="mt-8 p-6 bg-muted/30 border border-border/50 rounded-2xl shadow-card text-center text-foreground/70">
        {summaryText}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6 text-foreground flex items-center gap-3">
        <div className="w-1 h-6 modern-gradient rounded-full" />
        전월 대비 캠페인 요약 (퍼센트 기준 분류)
      </h3>

      <div className="flex flex-col gap-6">
        {/* 증가 섹션 */}
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl shadow-card">
          <h4 className="text-blue-600 font-bold mb-3">증가</h4>

          <div className="space-y-3 text-sm">
            {increased.length ? (
              increased.map((it, i) => (
                <div
                  key={it.name + i}
                  className="pb-2 border-b last:border-b-0"
                >
                  <p className="font-semibold text-foreground/90">{it.name}</p>
                  {renderLine(it)}
                </div>
              ))
            ) : (
              <p className="text-foreground/60">해당 그룹이 없습니다.</p>
            )}
          </div>
        </div>

        {/* 감소 섹션 */}
        <div className="p-6 bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20 rounded-2xl shadow-card">
          <h4 className="text-destructive font-bold mb-3">감소</h4>
          <div className="space-y-3 text-sm">
            {decreased.length ? (
              decreased.map((it, i) => (
                <div
                  key={it.name + i}
                  className="pb-2 border-b last:border-b-0"
                >
                  <p className="font-semibold text-foreground/90">{it.name}</p>
                  {renderLine(it, "text-foreground/70")}
                </div>
              ))
            ) : (
              <p className="text-foreground/60">해당 그룹이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryComparisonSection;
