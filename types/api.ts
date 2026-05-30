export interface Industry {
  id: number;
  slug: string;
  name: string;
}

export interface Source {
  id: number;
  name: string;
  slug?: string;
  type?: string;
  is_active?: boolean;
}

export interface ContentItem {
  id: number;
  source: Source;
  external_id?: string;
  title: string;
  url: string;
  thumbnail_url?: string | null;
  published_at?: string | null;
  collected_at?: string;
  metadata?: Record<string, unknown> | null;
  industries: Industry[];
  is_pinned?: boolean;
  llm_summary?: string | null;
}

export interface TrendKeyword {
  id: number;
  source?: Source;
  keyword: string;
  rank: number;
  observed_at?: string;
  metadata?: Record<string, unknown> | null;
  industries?: Industry[];
}

export interface DashboardData {
  date: string;
  industry: Industry | null;
  news: ContentItem[];
  by_industry: Record<string, ContentItem[]>;
  trends: Record<string, TrendKeyword[]>;
  youtube_marketing: ContentItem[];
  youtube_curated?: ContentItem[];
  industries?: Industry[];
  totals?: {
    items: number;
    trends: number;
  };
}
