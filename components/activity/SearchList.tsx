"use client";

import { LogTypeEnum } from "@/const/LogTypeEnum.const";
import BaseList from "./BaseList";
import { XIcon } from "lucide-react";
import Link from "next/link";

interface SearchListItemProps {
  title: string;
  description: string;
}

const SearchListItem = ({ title, description }: SearchListItemProps) => {
  return (
    <Link href={description} className="flex flex-col gap-1">
      <div className="flex gap-1 items-center">
        <div className="size-6 bg-blue-400" />
        <p className="text-18_B truncate flex-1">{title}</p>
        <XIcon className="size-4 cursor-pointer hover:text-black/60" />
      </div>

      <p className="text-12_M text-gray-400 truncate w-11/12">{description}</p>
    </Link>
  );
};

interface SearchListProps {
  type: LogTypeEnum;
}

const SearchList = ({ type }: SearchListProps) => {
  return (
    <BaseList
      type={type}
      renderItem={(item) => (
        <SearchListItem key={item.id} title={item.keyword!} description={item.targetUrl!} />
      )}
    />
  );
};

export default SearchList;
