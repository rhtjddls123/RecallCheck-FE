"use client";

import { memo } from "react";
import { LogTypeEnum } from "@/const/LogTypeEnum.const";
import BaseList from "./BaseList";
import Link from "next/link";
import { XIcon } from "lucide-react";
import ImageWithDefault from "../common/ImageWithDefault";
import { useDeleteActivity } from "@/hooks/useDeleteActivity";

interface ViewListItemProps {
  logId: number;
  productNm: string;
  imgSrc: string;
  makr: string;
  href: string;
}

const ViewListItem = memo(function ViewListItem({ logId, productNm, imgSrc, makr, href }: ViewListItemProps) {
  const { mutate: deleteActivity } = useDeleteActivity();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteActivity(logId);
  };
  return (
    <Link href={href} className="flex items-center gap-2 relative">
      <ImageWithDefault
        src={imgSrc}
        alt={productNm}
        className="size-19.25 rounded-2xl object-cover"
      />
      <div className="flex flex-col gap-1.5 w-64">
        <h3 className="text-18_B truncate">{productNm}</h3>
        <p className="text-12_M truncate text-gray-400">{makr}</p>
      </div>
      <XIcon
        onClick={handleDelete}
        className="size-4 cursor-pointer hover:text-black/60 absolute top-2 right-2"
      />
    </Link>
  );
});

interface ViewListProps {
  type: LogTypeEnum;
}

const ViewList = ({ type }: ViewListProps) => {
  return (
    <BaseList
      type={type}
      renderItem={(item) => (
        <ViewListItem
          key={item.id}
          logId={item.id}
          productNm={item.productNm ?? ""}
          imgSrc={item.imageUrl ?? ""}
          makr={item.makr ?? ""}
          href={item.targetUrl ?? ""}
        />
      )}
    />
  );
};

export default ViewList;
