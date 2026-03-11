"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { UserLogType } from "@/types/user.type";
import { useInfiniteActivity } from "@/hooks/useInfiniteActivity";
import { LogTypeEnum } from "@/const/LogTypeEnum.const";
import { cn } from "@/lib/utils";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "../ui/empty";

interface BaseListProps {
  type: LogTypeEnum;
  className?: (items: UserLogType[]) => string;
  renderItem: (item: UserLogType) => ReactNode;
}

const BaseList = ({ type, className, renderItem }: BaseListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteActivity(type);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const items = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <ScrollArea className="h-[calc(100dvh-209.6px)]">
      <div className={cn("flex flex-col gap-4 w-fit max-w-87.75", className?.(items))}>
        {items.length > 0 ? (
          items.map((item) => renderItem(item))
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>콘텐츠가 존재하지 않습니다.</EmptyTitle>
              <EmptyDescription>
                아직 활동 기록이 없습니다. <br />
                리콜 정보 또는 이미지를 검색하거나 상세 페이지를 방문해보세요.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        <div ref={bottomRef} />
        {isFetchingNextPage && <div>로딩 중...</div>}
      </div>
    </ScrollArea>
  );
};

export default BaseList;
