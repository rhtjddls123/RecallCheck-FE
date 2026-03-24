"use client";

import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useAuth = () => {
  const { setUser, clearUser } = useAuthStore();
  const { settingUnread } = useNotificationStore();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        return await authApi.getMe();
      } catch {
        return null;
      }
    },
    retry: false
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      settingUnread(data.unreadCount);
    } else if (data === null) {
      clearUser();
    }
  }, [data, setUser, clearUser, settingUnread]);
};

export const useAuthGuard = () => {
  const { user } = useAuthStore();

  if (user) return "authorized" as const;
  return "unauthorized" as const;
};
