"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import { services } from "@/data/service-data";
import { useSearchParams } from "next/navigation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface TabNavProps {
  onTabChange?: (value: string) => void;
}

export const TabNav = ({ onTabChange }: TabNavProps) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "media-report";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    window.history.pushState(null, "", `?${params.toString()}`);
    onTabChange?.(value);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <TabsList className="flex lg:grid w-full grid-cols-4 lg:grid-cols-9 mb-8 ">
        {services.map((service) => (
          <Tooltip key={service.id}>
            <TooltipTrigger asChild>
              <TabsTrigger
                value={service.id}
                className="text-xs"
                onClick={() => handleTabChange(service.id)}
                data-state={currentTab === service.id ? "active" : "inactive"}
              >
                {service.icon}
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent>{service.title}</TooltipContent>
          </Tooltip>
        ))}

        <Tooltip>
          <TooltipTrigger asChild>
            <TabsTrigger
              value="inquiry"
              className="text-xs"
              onClick={() => handleTabChange("inquiry")}
              data-state={currentTab === "inquiry" ? "active" : "inactive"}
            >
              <MessageSquare className="w-6 h-6" />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent>1:1 문의</TooltipContent>
        </Tooltip>
      </TabsList>
    </TooltipProvider>
  );
};
