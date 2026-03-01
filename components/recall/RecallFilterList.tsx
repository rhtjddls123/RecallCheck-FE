import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import StringFilter from "./StringFilter";
import DateFilter from "./DateFilter";
import { RECALL_CATEGORY_KEY_MAP } from "@/const/RECALL_CATEGORY_KEY_MAP.const";
import { ORDER_FILTER_KEY_MAP } from "@/const/FILTER.cont";

const RecallFilterList = () => {
  return (
    <Carousel opts={{ align: "start", dragFree: true }} className="w-full bg-white pb-2">
      <CarouselContent className="ml-0 gap-2 mx-4">
        <CarouselItem className="p-0 basis-auto">
          <StringFilter title="카테고리" options={RECALL_CATEGORY_KEY_MAP} paramKey="category" />
        </CarouselItem>
        <CarouselItem className="p-0 basis-auto">
          <DateFilter title="리콜날짜" />
        </CarouselItem>
        <CarouselItem className="p-0 basis-auto">
          <StringFilter title="정렬" options={ORDER_FILTER_KEY_MAP} paramKey="order" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default RecallFilterList;
