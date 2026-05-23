"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";

type ServiceCtaPanelProps = {
  icon: ReactNode;
  title: string;
  description: string;
  lines?: Array<{ content: string }>;
};

export const ServiceCtaPanel = ({
  icon,
  title,
  description,
  lines = [],
}: ServiceCtaPanelProps) => {
  const openMembership = useUIStore((state) => state.openMembership);

  return (
    <div className="text-center py-12">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {lines.slice(0, 3).map((line, idx) => (
        <p key={idx} className="text-base font-medium text-gray-600">
          {line.content}
        </p>
      ))}
      <br />
      <Button onClick={openMembership}>PRO 기능 이용하기</Button>
    </div>
  );
};
