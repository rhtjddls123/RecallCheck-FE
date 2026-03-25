"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "@/services/notificationService";
import { useAuthStore } from "@/store/authStore";

export const useKeywordList = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["keywords"],
    queryFn: () => notificationApi.getKeywords(),
    enabled: !!user
  });
};

export const useAddKeyword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (keyword: string) => notificationApi.addKeyword(keyword),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["keywords"] })
  });
};

export const useDeleteKeyword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => notificationApi.deleteKeyword(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["keywords"] })
  });
};
