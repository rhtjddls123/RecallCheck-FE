"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import { format, parse } from "date-fns";
import { ko } from "date-fns/locale";

interface DateFilterProps {
  title: string;
}

const DateFilter = ({ title }: DateFilterProps) => {
  const searchParams = useSearchParams();
  const from = searchParams.get("startDate");
  const to = searchParams.get("endDate");
  const parseDate = (d: string | null) => (d ? parse(d, "yy-MM-dd", new Date()) : undefined);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: parseDate(from),
    to: parseDate(to)
  });

  const router = useRouter();

  const handleFilter = (selectedDate?: DateRange) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedDate?.from) params.set("startDate", format(selectedDate.from, "yy-MM-dd"));
    if (selectedDate?.to) params.set("endDate", format(selectedDate.to, "yy-MM-dd"));
    router.replace(`?${params.toString()}`);
    setDate(selectedDate);
  };

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
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "yy.MM.dd")} - {format(date.to, "yy.MM.dd")}
              </>
            ) : (
              format(date.from, "yy.MM.dd")
            )
          ) : (
            <>{title}</>
          )}
          {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleFilter}
          numberOfMonths={1}
          locale={ko}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateFilter;
