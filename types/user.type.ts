import { LogTypeEnum } from "@/const/LogTypeEnum.const";

export interface UserType {
  id: number;
  kakaoId: string;
  nickname: string;
  profileImage: string;
  role: "USER" | "ADMIN";
  unreadCount: number;
}

export interface UserLogType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  type: typeof LogTypeEnum;
  keyword: string | null;
  productNm: string | null;
  makr: string | null;
  imageUrl: string | null;
  targetUrl: string | null;
}
