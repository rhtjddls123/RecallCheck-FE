import {
  RECALL_CATEGORY_KEY_TYPE,
  RECALL_CATEGORY_TYPE
} from "@/const/RECALL_CATEGORY_KEY_MAP.const";

export interface NotificationType {
  id: number;
  createdAt: string;
  title: string;
  body: string;
  isRead: boolean;
  recall: { recallSn: string } | null;
}

export interface NotificationSettingType {
  id: number;
  createdAt: string;
  updatedAt: string;
  menu: {
    id: RECALL_CATEGORY_TYPE;
    name: RECALL_CATEGORY_KEY_TYPE;
  };
  isActive: boolean;
}
