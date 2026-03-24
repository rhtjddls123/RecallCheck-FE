"use client";

import { FormEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SearchIcon, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const [focused, setFocused] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const xButtonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("query", inputValue);
    params.set("page", "1");

    router.push(`/recall?${params.toString()}`);
  };

  const onDelete = () => {
    if (inputRef.current?.value) inputRef.current.value = "";
    if (pathname !== "/") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("query");
      params.set("page", "1");

      router.push(`/recall?${params.toString()}`);
    }
    inputRef.current?.blur();
    xButtonRef.current?.blur();
  };

  return (
    <form
      key={query ?? ""}
      onSubmit={handleSubmit}
      className="flex w-full items-center bg-gray-100 gap-2 rounded-[100px] bg-gray-25 dark:bg-zinc-700 px-3 py-1.5 focus-within:outline focus-within:outline-gray-700 dark:focus-within:outline-zinc-400"
    >
      <button type="submit" className="cursor-pointer">
        <SearchIcon className="text-gray-500 dark:text-gray-400" />
      </button>
      <input
        ref={inputRef}
        className="w-full focus-visible:outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        role="search"
        placeholder="검색어를 입력하세요"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        defaultValue={query || ""}
      />
      <button type="button" onClick={onDelete} ref={xButtonRef}>
        <XIcon className={cn("size-5 dark:text-gray-400", !focused && "opacity-0")} />
      </button>
    </form>
  );
};

export default SearchInput;
