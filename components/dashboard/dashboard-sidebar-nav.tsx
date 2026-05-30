"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, ChevronDown, LayoutDashboard, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function DashboardSidebarNav() {
  const pathname = usePathname();
  const [reportOpen, setReportOpen] = React.useState(false);
  const [trendOpen, setTrendOpen] = React.useState(false);

  React.useEffect(() => {
    if (pathname.startsWith("/dashboard")) setReportOpen(true);
    if (pathname.startsWith("/marketing-trend-dashboard")) setTrendOpen(true);
  }, [pathname]);

  return (
    <React.Fragment>
      <SidebarHeader className="flex items-center">
        <div className="flex">
          <h2 className="px-3 py-2 text-lg font-semibold tracking-tight flex group-data-[collapsible=icon]:hidden">
            대시보드
          </h2>
          <SidebarTrigger className="hidden md:flex" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setReportOpen((prev) => !prev)}
              isActive={pathname.startsWith("/dashboard")}
              data-state={reportOpen ? "open" : "closed"}
            >
              <LayoutDashboard />
              <span>보고서</span>
              <ChevronDown
                className={cn(
                  "ml-auto size-4 transition-transform",
                  reportOpen && "rotate-180",
                )}
              />
            </SidebarMenuButton>
            {reportOpen && (
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === "/dashboard"}
                  >
                    <Link href="/dashboard">
                      <Book />
                      <span>보고서</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setTrendOpen((prev) => !prev)}
              isActive={pathname.startsWith("/marketing-trend-dashboard")}
              data-state={trendOpen ? "open" : "closed"}
            >
              <TrendingUp />
              <span>마케팅 트렌드</span>
              <ChevronDown
                className={cn(
                  "ml-auto size-4 transition-transform",
                  trendOpen && "rotate-180",
                )}
              />
            </SidebarMenuButton>
            {trendOpen && (
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === "/marketing-trend-dashboard"}
                  >
                    <Link href="/marketing-trend-dashboard">
                      <Book />
                      <span>마케팅 트렌드</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </React.Fragment>
  );
}
