"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export const useSse = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/notification/stream`, {
      withCredentials: true
    });

    eventSource.onmessage = (e) => {
      const notification = JSON.parse(e.data as string);
      console.log("새 알림:", notification);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user]);
};
