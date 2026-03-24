"use client";

import { memo } from "react";
import { LogTypeEnum } from "@/const/LogTypeEnum.const";
import BaseList from "./BaseList";
import Link from "next/link";
import ImageWithDefault from "../common/ImageWithDefault";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDeleteActivity } from "@/hooks/useDeleteActivity";

interface ImageListItemProps {
  logId: number;
  imgSrc: string | null;
  href: string;
}

const ImageListItem = memo(function ImageListItem({ logId, imgSrc, href }: ImageListItemProps) {
  const { mutate: deleteActivity } = useDeleteActivity();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteActivity(logId);
  };

  return (
    <Link href={href} className="relative">
      <ImageWithDefault
        src={imgSrc || ""}
        className="w-full aspect-square rounded-2xl object-cover"
      />
      <XIcon
        onClick={handleDelete}
        className="size-4 cursor-pointer hover:text-black/60 absolute top-2 right-2"
      />
    </Link>
  );
});

interface ImageListProps {
  type: LogTypeEnum;
}

const ImageList = ({ type }: ImageListProps) => {
  return (
    <BaseList
      className={(items) =>
        cn(items.length > 0 && "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4")
      }
      type={type}
      renderItem={(item) => (
        <ImageListItem
          key={item.id}
          logId={item.id}
          imgSrc={item.imageUrl}
          href={item.targetUrl!}
        />
      )}
    />
  );
};

export default ImageList;
