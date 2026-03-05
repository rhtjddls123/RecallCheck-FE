import {
  RECALL_CATEGORY_KEY_MAP,
  RECALL_CATEGORY_KEY_TYPE
} from "@/const/RECALL_CATEGORY_KEY_MAP.const";
import { api } from "@/lib/axios";
import { ChatbotSearchResponse, EmbeddingSearchResponse } from "@/types/response.type";

interface chatbotSearchRecallParams {
  query: string;
  category?: RECALL_CATEGORY_KEY_TYPE;
}

export const recallApi = {
  chatbotSearchRecall: async (params: chatbotSearchRecallParams) => {
    const res = await api.get<ChatbotSearchResponse>("/recall/chatbot-search", {
      params: {
        query: params.query,
        categoryId: params.category && RECALL_CATEGORY_KEY_MAP[params.category]
      }
    });

    return res.data;
  },
  embeddingSearch: async (params: { query: string }): Promise<EmbeddingSearchResponse> => {
    const res = await api.get<EmbeddingSearchResponse>("/recall/embedding-search", {
      params: {
        query: params.query
      }
    });

    return res.data;
  }
};
