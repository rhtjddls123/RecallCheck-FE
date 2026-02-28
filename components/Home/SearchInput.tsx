"use client";

import { FormEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SearchIcon, XIcon } from "lucide-react";

const SearchInput = () => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const xButtonRef = useRef<HTMLButtonElement | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onDelete = () => {
    if (inputRef.current?.value) inputRef.current.value = "";
    inputRef.current?.blur();
    xButtonRef.current?.blur();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center bg-gray-100 gap-2 rounded-[100px] bg-gray-25 px-3 py-1.5 focus-within:outline focus-within:outline-gray-700"
    >
      <button type="submit" className="cursor-pointer">
        <SearchIcon className="text-gray-500" />
      </button>
      <input
        ref={inputRef}
        className="w-full focus-visible:outline-none"
        role="search"
        placeholder="검색어를 입력하세요"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button type="button" onClick={onDelete} ref={xButtonRef}>
        <XIcon className={cn("size-5", !focused && "opacity-0")} />
      </button>
    </form>
  );
};

export default SearchInput;
