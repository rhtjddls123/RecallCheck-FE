"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Empty, EmptyHeader, EmptyTitle } from "../ui/empty";
import { NotificationType } from "@/types/notification.type";
import { useRouter } from "next/navigation";
import {
  useDeleteNotification,
  useInfiniteNotification,
  useReadAllNotification,
  useReadNotification
} from "@/hooks/useNotification";
import { ScrollArea } from "../ui/scroll-area";
import { XIcon } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";

const NotificationList = () => {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteNotification();
  const { decrementUnread } = useNotificationStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const { mutate: markAsRead } = useReadNotification();

  const { mutate: markAllAsRead } = useReadAllNotification();

  const { mutate: deleteNotification } = useDeleteNotification();

  const handleClick = (notification: NotificationType) => {
    if (!notification.isRead) {
      decrementUnread();
      markAsRead(notification.id);
    }
    if (notification.recall) {
      router.push(`/recall/${notification.recall.recallSn}`);
    }
  };

  const handleDelete = (e: React.MouseEvent, notification: NotificationType) => {
    e.preventDefault();
    e.stopPropagation();
    deleteNotification(notification);
  };

  const notifications: NotificationType[] = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700">
        <span className="font-semibold dark:text-gray-100">알림</span>
        <Button variant="ghost" size="sm" onClick={() => markAllAsRead()}>
          전체 읽음
        </Button>
      </div>

      <ScrollArea className="h-96">
        {notifications.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>알림이 없습니다.</EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleClick(notification)}
            className={cn(
              "relative p-4 border-b dark:border-zinc-700 cursor-pointer hover:bg-muted transition-colors",
              !notification.isRead && "bg-blue-50 dark:bg-blue-950"
            )}
          >
            <div className="relative flex items-start gap-2">
              {!notification.isRead && (
                <div className="absolute w-2 h-2 rounded-full bg-blue-500 -left-2 -top-1" />
              )}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{notification.title}</span>
                <span className="text-xs text-muted-foreground">{notification.body}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>
            <button
              className="p-2 cursor-pointer hover:text-black/60 dark:hover:text-white/60 absolute top-0 right-0 dark:text-gray-400"
              onClick={(e) => handleDelete(e, notification)}
            >
              <XIcon className="size-4" />
            </button>
          </div>
        ))}

        {/* 무한 스크롤 트리거 */}
        <div ref={bottomRef} className="py-2 text-center text-sm text-muted-foreground">
          {isFetchingNextPage && "로딩 중..."}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotificationList;
