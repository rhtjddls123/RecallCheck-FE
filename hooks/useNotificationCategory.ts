import { RECALL_CATEGORY_TYPE } from "@/const/RECALL_CATEGORY_KEY_MAP.const";
import { notificationApi } from "@/services/notificationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotificationCategoryList = () => {
  return useQuery({
    queryKey: ["notification", "setting"],
    queryFn: () => notificationApi.getNotificationSetting()
  });
};

export const useSubscribeNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: RECALL_CATEGORY_TYPE) =>
      notificationApi.subscribeNotification(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification", "setting"] });
    }
  });
};

export const useUnsubscribeNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: RECALL_CATEGORY_TYPE) =>
      notificationApi.unsubscribeNotification(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification", "setting"] });
    }
  });
};
