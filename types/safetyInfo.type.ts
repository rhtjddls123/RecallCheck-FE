export interface RecentSafetyInfoType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  externalId: string;
  title: string;
  uploadDate: string;
  updateDate: string;
  infoUrl: string;
  tmnlImgUrl?: string;
}
