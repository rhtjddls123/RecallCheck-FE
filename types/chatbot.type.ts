import { MainCategory } from "@/const/category.const";
import { RecallType } from "./recall.type";

export type ChatStep =
  | "SELECT_CATEGORY"
  | "SELECT_SUBCATEGORY"
  | "INPUT_QUERY"
  | "CONFIRM_TYPO"
  | "CONFIRM_EMBEDDING"
  | "LOADING"
  | "CONFIRM_OCR"
  | "EDIT_OCR";

// chatscope에 넘길 메시지 + 커스텀 payload 타입
export interface ChatMessage {
  id: string;
  message: string; // 말풍선 텍스트 (버튼/카드면 빈 문자열)
  direction: "incoming" | "outgoing";
  payload?: MessagePayload;
  used?: boolean;
  imageUrl?: string;
}

export type MessagePayload =
  | { type: "category-buttons" }
  | { type: "subcategory-buttons"; category: MainCategory }
  | { type: "query-cancel" }
  | { type: "results"; products: RecallType[]; foundInOtherCategory?: boolean; count?: number }
  | { type: "no-result" }
  | { type: "confirm-typo" }
  | { type: "confirm-embedding" }
  | { type: "confirm-ocr" }
  | { type: "edit-ocr" };
