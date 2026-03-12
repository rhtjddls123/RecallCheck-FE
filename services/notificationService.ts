import { api } from "@/lib/axios";

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
  }
};
