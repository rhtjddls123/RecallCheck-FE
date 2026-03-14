import { RecallType } from "@/types/recall.type";
import RecallResultCard from "./RecallResultCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";

interface SearchResultsProps {
  products: RecallType[];
  count?: number;
  targetUrl: string | null;
}

const SearchResults = ({ products, count, targetUrl }: SearchResultsProps) => {
  return (
    <Carousel
      opts={{
        align: "start"
      }}
      className="w-full mt-2"
    >
      {count && targetUrl && (
        <div className="pl-2 flex gap-1 text-12_M dark:text-gray-300">
          <p>총 {count}개의 결과가 존재합니다.</p>
          <Link href={targetUrl} className="underline dark:text-gray-400">
            전체보기
          </Link>
        </div>
      )}
      <CarouselContent className="m-0 gap-3 flex w-full">
        {products.map((product) => (
          <CarouselItem key={product.recallSn} className="p-0 basis-auto">
            <RecallResultCard
              key={product.recallSn}
              product={product}
              foundInOtherCategory={product.cntntsId}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default SearchResults;
