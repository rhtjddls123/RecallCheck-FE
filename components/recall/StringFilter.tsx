"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface StringFilterProps {
  title: string;
  options: { [key: string]: string };
  paramKey: string;
}

const StringFilter = ({ title, options, paramKey }: StringFilterProps) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(title);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (option: string) => {
    setFilter(option);
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, options[option]);
    router.replace(`?${params.toString()}`);
  };

  const optionsList = Object.keys(options);

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center justify-center gap-1 rounded-[100px] text-14_M outline outline-gray-100 bg-white min-w-20 h-10.25 px-4",
            open && "bg-gray-950 text-[14px] font-medium text-white "
          )}
        >
          {filter} {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {optionsList.map((option) => (
          <DropdownMenuItem key={option} onClick={() => handleSort(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StringFilter;
