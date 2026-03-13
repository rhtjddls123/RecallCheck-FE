import { RECALL_CATEGORY_TYPE } from "@/const/RECALL_CATEGORY_KEY_MAP.const";
import { getCurrentFcmToken } from "@/hooks/useFcmToken";
import { api } from "@/lib/axios";
import { GetNotificationSetting, GetQuietTimeResponse } from "@/types/response.type";

export const notificationApi = {
  getNotifications: async (params?: { cursorId?: number; take?: number }) => {
    const response = await api.get("/notification", { params });
    return response.data;
  },

  markAsRead: async (id: number) => {
    const response = await api.patch(`/notification/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.patch("/notification/read-all");
    return response.data;
  },

  deleteNotification: async (id: number) => {
    const response = await api.delete(`/notification/${id}`);
    return response.data;
  },

  getNotificationSetting: async () => {
    const response = await api.get<GetNotificationSetting>("/notification/setting");
    return response.data;
  },

  subscribeNotification: async (categoryId: RECALL_CATEGORY_TYPE) => {
    const response = await api.post<{ message: string }>(`/notification/setting/${categoryId}`);
    return response.data;
  },

  unsubscribeNotification: async (categoryId: RECALL_CATEGORY_TYPE) => {
    const response = await api.delete<{ message: string }>(`/notification/setting/${categoryId}`);
    return response.data;
  },

  checkPushEnabled: async () => {
    const token = await getCurrentFcmToken();
    if (!token) return false;

    const { data } = await api.get<{
      exists: boolean;
    }>("/notification/fcm-token/check", {
      params: { token }
    });
    return data.exists;
  },

  getQuietTime: async () => {
    const response = await api.get<GetQuietTimeResponse>("/notification/quiet-time");
    return response.data;
  }
};
