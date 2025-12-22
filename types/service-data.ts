import type { ReactNode } from "react";

export interface ServiceTextItem {
  content: string | ReactNode;
}

export interface Service {
  id: string;
  title: string;
  icon: ReactNode;
  description?: string;
  description2?: string;
  description3?: string;
  text?: ServiceTextItem[];
}
export type SERVICE_TYPE = Service[];
