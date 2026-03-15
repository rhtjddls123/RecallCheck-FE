import Banner from "./Banner";

export interface RecallNewsType {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  thumbnailUrl: string;
  linkUrl: string;
  date: string;
}
const BannerFetcher = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/consumer24/recall-news`, {
    next: { revalidate: 60 * 10 }
  });
  const recallNews = (await res.json()) as RecallNewsType[];

  return <Banner data={recallNews} />;
};

export default BannerFetcher;
