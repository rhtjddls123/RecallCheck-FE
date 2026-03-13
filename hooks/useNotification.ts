import { notificationApi } from "@/services/notificationService";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { NotificationType } from "@/types/notification.type";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useInfiniteNotification = () => {
  const { user } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) => notificationApi.getNotifications({ cursorId: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.cursorId : undefined),
    enabled: !!user
  });
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => notificationApi.markAsRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] })
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { decrementUnread } = useNotificationStore();

  return useMutation({
    mutationFn: (notification: NotificationType) =>
      notificationApi.deleteNotification(notification.id),
    onSuccess: (_, notification) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      if (!notification.isRead) {
        decrementUnread();
      }
    }
  });
};

export const useReadAllNotification = () => {
  const queryClient = useQueryClient();
  const { resetUnread } = useNotificationStore();
  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      resetUnread();
    }
  });
};
