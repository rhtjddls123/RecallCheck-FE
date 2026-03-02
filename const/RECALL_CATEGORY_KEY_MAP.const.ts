export const RECALL_CATEGORY_KEY_MAP = {
  생활화학제품: "0401",
  위생용품: "0208",
  의약외품: "0205",
  생활방사선제품: "0405",
  화장품: "0206",
  먹는물: "0403",
  축산물: "0203",
  공산품: "0101",
  의료기기: "0207",
  의약품: "0204",
  식품: "0201",
  자동차: "0301"
  // '해외 리콜':'0501',
} as const;

export type RECALL_CATEGORY_KEY_TYPE = keyof typeof RECALL_CATEGORY_KEY_MAP;
