import RecallItem from "../common/RecallItem";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const RecentRecallCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start"
      }}
    >
      <CarouselContent className="m-0 gap-3 w-85.75">
        {[1, 2, 3, 4, 5].map((v) => (
          <CarouselItem key={v} className="p-0 basis-33">
            <RecallItem
              href=""
              title="제목인데 좀긴걸써보려고하는데요"
              description="설명인데 좀긴걸써보려고하는데요"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default RecentRecallCarousel;
