"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useNotificationStore } from "@/store/notificationStore";

export const useSse = () => {
  const { user } = useAuthStore();
  const { incrementUnread } = useNotificationStore();

  useEffect(() => {
    if (!user) return;

    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BASE_URL}/notification/stream`, {
      withCredentials: true
    });

    eventSource.onmessage = (e) => {
      const { title, body } = JSON.parse(e.data as string) as { title: string; body: string };
      const count = body.split(",").map((s) => s.trim()).length;
      toast.message(title);

      incrementUnread(count);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user, incrementUnread]);
};
