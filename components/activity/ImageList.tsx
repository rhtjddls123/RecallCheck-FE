"use client";

import { LogTypeEnum } from "@/const/LogTypeEnum.const";
import BaseList from "./BaseList";
import Link from "next/link";
import ImageWithDefault from "../common/ImageWithDefault";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageListItemProps {
  imgSrc: string | null;
  href: string;
}

const ImageListItem = ({ imgSrc, href }: ImageListItemProps) => {
  return (
    <Link href={href} className="relative">
      <ImageWithDefault src={imgSrc || ""} className="size-41 rounded-2xl object-cover" />
      <XIcon className="size-4 cursor-pointer hover:text-black/60 absolute top-2 right-2" />
    </Link>
  );
};

interface ImageListProps {
  type: LogTypeEnum;
}

const ImageList = ({ type }: ImageListProps) => {
  return (
    <BaseList
      className={(items) => cn(items.length > 0 && "grid grid-cols-2")}
      type={type}
      renderItem={(item) => (
        <ImageListItem key={item.id} imgSrc={item.imageUrl} href={item.targetUrl!} />
      )}
    />
  );
};

export default ImageList;
