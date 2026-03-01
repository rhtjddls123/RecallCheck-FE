"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface StringFilterProps {
  title: string;
  options: { [key: string]: string };
  paramKey: string;
}

const StringFilter = ({ title, options, paramKey }: StringFilterProps) => {
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(paramKey);
  const currentLabel = Object.keys(options).find((key) => options[key] === currentValue) || title;

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(currentLabel);

  const router = useRouter();

  const handleSort = (option: string) => {
    setFilter(option);
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, options[option]);
    router.replace(`?${params.toString()}`);
  };

  const optionsList = Object.keys(options);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "text-[14px] leading-[100%] font-medium tracking-[-2.5%]",
            "select-none flex items-center justify-center gap-1 rounded-[100px] outline outline-gray-100 bg-white h-10.25 px-4 cursor-pointer",
            open && "bg-gray-950 text-white "
          )}
        >
          {filter} {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit min-w-32 p-1 rounded-xl shadow-md flex flex-col items-center">
        {optionsList.map((option) => (
          <button
            className={cn(
              "w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-gray-100 transition-colors",
              filter === option && "font-semibold"
            )}
            key={option}
            onClick={() => handleSort(option)}
          >
            {option}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default StringFilter;
