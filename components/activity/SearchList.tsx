"use client";

import { memo } from "react";
import { LogTypeEnum } from "@/const/LogTypeEnum.const";
import BaseList from "./BaseList";
import { ShieldCheckIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useDeleteActivity } from "@/hooks/useDeleteActivity";

interface SearchListItemProps {
  logId: number;
  title: string;
  description: string;
}

const SearchListItem = memo(function SearchListItem({ logId, title, description }: SearchListItemProps) {
  const { mutate: deleteActivity } = useDeleteActivity();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteActivity(logId);
  };
  return (
    <Link href={description} className="flex flex-col gap-1">
      <div className="flex gap-1 items-center">
        <ShieldCheckIcon className="size-6" />
        <p className="text-18_B truncate flex-1">{title}</p>
        <XIcon onClick={handleDelete} className="size-4 cursor-pointer hover:text-black/60" />
      </div>

      <p className="text-12_M text-gray-400 truncate w-11/12">
        {process.env.NEXT_PUBLIC_FRONTEND_URL}
        {description}
      </p>
    </Link>
  );
});

interface SearchListProps {
  type: LogTypeEnum;
}

const SearchList = ({ type }: SearchListProps) => {
  return (
    <BaseList
      type={type}
      renderItem={(item) => {
        if (!item.keyword || !item.targetUrl) return null;
        return (
          <SearchListItem
            key={item.id}
            logId={item.id}
            title={item.keyword}
            description={item.targetUrl}
          />
        );
      }}
    />
  );
};

export default SearchList;
