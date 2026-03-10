import { LogTypeEnum } from "@/const/LogTypeEnum.const";
import { api } from "@/lib/axios";
import { GetActivityResponse } from "@/types/response.type";

export const authApi = {
  kakaoLogin: async (code: string) => {
    const response = await api.post("/auth/kakao", { code });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete("/auth");
    return response.data;
  },

  getActivity: async (type: LogTypeEnum, cursorId?: number) => {
    const response = await api.get<GetActivityResponse>(`/auth/activity`, {
      params: {
        type,
        cursorId
      }
    });
    return response.data;
  },

  deleteActivity: async (logId: number) => {
    const response = await api.delete(`/auth/activity/${logId}`);

    return response.data;
  }
};
