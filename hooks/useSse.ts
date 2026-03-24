"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "@/store/notificationStore";

const RECONNECT_DELAY_MS = 3000;

export const useSse = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { incrementUnread } = useNotificationStore();
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!user) return;

    let isCancelled = false;

    const connect = () => {
      if (isCancelled) return;

      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notification/stream`,
        { withCredentials: true }
      );
      esRef.current = eventSource;

      eventSource.onmessage = (e) => {
        const { title } = JSON.parse(e.data as string) as { title: string; body: string };
        toast.message(title);
        incrementUnread();
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      };

      eventSource.onerror = () => {
        eventSource.close();
        if (!isCancelled) {
          reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY_MS);
        }
      };
    };

    connect();

    return () => {
      isCancelled = true;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      esRef.current?.close();
      esRef.current = null;
    };
  }, [user?.id, queryClient, incrementUnread]);
};
