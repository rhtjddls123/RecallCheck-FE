export interface NotificationType {
  id: number;
  createdAt: string;
  title: string;
  body: string;
  isRead: boolean;
  recall: { recallSn: string } | null;
}
