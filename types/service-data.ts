import type { ReactNode } from "react";
export type TextBlock = {
  content: ReactNode;
  className?: string;
};
export type SERVICE_TYPE = {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  description2?: string;
  description3?: string;
  text?: TextBlock[];
}[];
