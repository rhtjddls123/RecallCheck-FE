import { api } from "@/lib/axios";
import { CorrectTypoResponse } from "@/types/response.type";

export const openaiApi = {
  correctTypo: async (query: string): Promise<CorrectTypoResponse> => {
    const res = await api.get<CorrectTypoResponse>("/openai/correct-typo", {
      params: {
        query
      }
    });

    return res.data;
  }
};
