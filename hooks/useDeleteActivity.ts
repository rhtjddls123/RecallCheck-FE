import { authApi } from "@/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (logId: number) => authApi.deleteActivity(logId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity"] });
    }
  });
};
