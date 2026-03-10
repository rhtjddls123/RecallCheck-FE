import { RecallType } from "./recall.type";

export interface RecallPaginationResponse {
  data: RecallType[];
  total: number;
  page: number;
  take: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ChatbotSearchResponse {
  found: boolean;
  differentCategory: boolean;
  data: {
    products: RecallType[];
    count: number;
    targetUrl: string | null;
  };
}

export interface CorrectTypoResponse {
  isSame: boolean;
  corrected: string;
}

export interface EmbeddingSearchResponse {
  found: boolean;
  data: RecallType[];
}

export interface ImageOcrResponse {
  found: boolean;
  message: string;
  query: string | null;
  path: string | null;
}
