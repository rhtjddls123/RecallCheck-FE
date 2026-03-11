import { RECALL_CATEGORY_TYPE } from "@/const/RECALL_CATEGORY_KEY_MAP.const";

export interface RecentRecallType {
  recallSn: string;
  productNm: string;
  makr?: string;
  bsnmNm?: string;
  recallImgUrls: string[];
}

export interface RecallType {
  recallSn: string; // 리콜번호 (PK)
  cntntsId: RECALL_CATEGORY_TYPE; // 메뉴 ID
  productNm: string; // 제품명

  makr: string | null; // 제조사
  bsnmNm: string | null; // 사업자명
  mnfcturPd: string | null; // 제조기간
  modlNmInfo: string | null; // 모델명 정보
  mnfcturNoInfo: string | null; // 제조번호 정보
  stdBrcd: string | null; // 표준 바코드(유통표준코드)
  distbTmlmtDe: string | null; // 유통기한
  prmisnNo: string | null; // 허가번호
  mdlpClNo: string | null; // 의료기기 분류번호
  aditfield13: string | null; // 제품 상세내용
  etcInfo: string | null; // 기타 정보
  mainSleoffic: string | null; // 주요 판매처
  shrtcomCn: string | null; // 결함 내용
  recallSe: string | null; // 리콜 구분

  recallPublictBgnde: string | null; // 리콜 공표 시작일
  recallPublictEndde: string | null; // 리콜 공표 만료일

  injryCauseResult: string | null; // 위해 원인
  injryFrgltyTrgter: string | null; // 위해 취약 대상자
  hrmflGrad: string | null; // 위해성 등급
  acdntCn: string | null; // 사고 내용
  cnsmrGhvrTips: string | null; // 소비자 행동 요령
  trtmntAtpn: string | null; // 취급 주의사항

  recallBgnde: string | null; // 리콜 시작일
  recallEndde: string | null; // 리콜 종료일

  recallProcssInfo: string | null; // 리콜 절차
  recallEntrpsInfo: string | null; // 문의처

  infoOriginInstt: string | null; // 정보 출처 기관
  infoOriginInsttUrl: string | null; // 정보 출처 URL
  infoCreatInstt: string | null; // 정보 생성 기관

  infoCreatUrl: string[] | null; // 정보 생성 URL (||로 구분)
  recallImgUrls: string[] | null;

  createdAt: Date;
  updatedAt: Date;
}
