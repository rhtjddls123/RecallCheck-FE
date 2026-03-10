import { api } from "@/lib/axios";

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
  }
};
