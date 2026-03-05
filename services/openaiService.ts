import { api } from "@/lib/axios";
import { CorrectTypoResponse, ImageOcrResponse } from "@/types/response.type";

export const openaiApi = {
  correctTypo: async (query: string): Promise<CorrectTypoResponse> => {
    const res = await api.get<CorrectTypoResponse>("/openai/correct-typo", {
      params: {
        query
      }
    });

    return res.data;
  },
  imageOcr: async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await api.post<ImageOcrResponse>("/openai/image-ocr", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return res.data;
  }
};
