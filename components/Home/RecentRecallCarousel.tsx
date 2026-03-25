import { RecentRecallType } from "@/types/recall.type";
import RecallItem, { RecallItemSkeleton } from "../common/RecallItem";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export const RecentRecallCarouselLoadingFallback = () => {
  return (
    <Carousel
      opts={{
        align: "start"
      }}
    >
      <CarouselContent className="m-0 gap-3 w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <CarouselItem key={i} className="p-0 basis-35 sm:basis-40 md:basis-45">
            <RecallItemSkeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const RecentRecallCarousel = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/recall/recent`, {
    next: { revalidate: 60 * 10 } // 10분마다 재검증
  });
  const recalls = (await res.json()) as RecentRecallType[];

  return (
    <Carousel
      opts={{
        align: "start"
      }}
    >
      <CarouselContent className="m-0 gap-3 w-full">
        {recalls.map((recall) => (
          <CarouselItem key={recall.recallSn} className="p-0 basis-35 sm:basis-40 md:basis-45">
            <RecallItem
              href={`/recall/${recall.recallSn}`}
              title={recall.productNm}
              description={recall.bsnmNm || recall.makr || ""}
              img={recall.recallImgUrls.length > 0 ? recall.recallImgUrls[0] : "/defaultImg.jpeg"}
              alt={recall.productNm}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default RecentRecallCarousel;
