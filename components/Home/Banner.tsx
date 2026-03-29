"use client";

import Link from "next/link";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { RecallNewsType } from "./BannerFetcher";
import ImageWithDefault from "../common/ImageWithDefault";

interface MainBannerPaginationProps {
  totalPage: number;
  currentPage: number;
  className?: string;
}

const BannerPagination = ({ totalPage, currentPage, className }: MainBannerPaginationProps) => (
  <div className={cn("flex w-fit gap-2", className)}>
    {Array.from({ length: totalPage }).map((_, idx) => (
      <span
        key={idx}
        className={cn(
          "h-1.5 w-1.5 rounded-full border border-black/10 bg-white transition-all duration-200",
          currentPage === idx && "bg-white/50"
        )}
      />
    ))}
  </div>
);

interface BannerProps {
  data: RecallNewsType[];
}

const Banner = ({ data }: BannerProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true
      }}
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: false
        })
      ]}
    >
      <CarouselContent className="m-0">
        {data.map((item, index) => (
          <CarouselItem key={item.id} className="aspect-video w-full rounded-3xl pl-0">
            <Link target="_blank" href={item.linkUrl} className="block w-full h-full rounded-3xl">
              <ImageWithDefault
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover rounded-3xl"
                proxyWidth={736}
                proxyHeight={414}
                proxyFit="cover"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <BannerPagination
        className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2"
        totalPage={count}
        currentPage={current}
      />
    </Carousel>
  );
};

export default Banner;
