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
