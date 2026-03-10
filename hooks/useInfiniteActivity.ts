import { LogTypeEnum } from "@/const/LogTypeEnum.const";
import { authApi } from "@/services/authService";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteActivity = (type: LogTypeEnum) => {
  return useInfiniteQuery({
    queryKey: ["activity", type],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      authApi.getActivity(type, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.cursorId : undefined)
  });
};
