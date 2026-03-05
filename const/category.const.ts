export const CATEGORIES = {
  "생활용품/가전": ["공산품"],
  자동차: ["자동차"],
  "농산/축산/수산": ["축산물"],
  "의료/미용": ["의약품", "의약외품", "의료기기", "위생용품", "화장품"],
  환경: ["생활방사선제품", "생활화학제품"],
  식품: ["식품", "먹는물"]
} as const;

export type MainCategory = keyof typeof CATEGORIES;
