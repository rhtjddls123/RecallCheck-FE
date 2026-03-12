"use client";

import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { setUser } = useAuthStore();
  const { incrementUnread } = useNotificationStore();

  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const user = await authApi.getMe();
      setUser(user);
      incrementUnread(user.unreadCount);
      return user;
    },
    retry: false
  });
};
