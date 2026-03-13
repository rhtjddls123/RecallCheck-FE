"use client";

import { authApi } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useAuth = () => {
  const { setUser } = useAuthStore();
  const { settingUnread } = useNotificationStore();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.getMe(),
    retry: false,
    staleTime: Infinity
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      settingUnread(data.unreadCount);
    }
  }, [data, setUser, settingUnread]);
};

export const useAuthGuard = () => {
  const { user } = useAuthStore();

  if (user) return "authorized" as const;
  return "unauthorized" as const;
};
