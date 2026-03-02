"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "../ui/pagination";
import { toast } from "sonner";

interface RecallPaginationProps {
  totalPage: number;
}

const RecallPagination = ({ totalPage }: RecallPaginationProps) => {
  const [inputPage, setInputPage] = useState("");
  const [showInput, setShowInput] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const curPage = Number(searchParams.get("page") || 1);

  const getPages = () => {
    if (curPage <= 2) {
      // 1,2페이지면 1~5까지 표시
      return Array.from({ length: Math.min(5, totalPage) }, (_, i) => i + 1);
    }
    // 그 외엔 현재 기준 앞뒤 2개
    return Array.from({ length: totalPage }, (_, i) => i + 1).filter(
      (p) => p >= curPage - 2 && p <= curPage + 2
    );
  };

  const pages = getPages();

  const showEllipsis = totalPage > 5 && curPage + 2 < totalPage;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`?${params.toString()}`);
  };

  const handleEllipsisSubmit = () => {
    const page = Number(inputPage);
    if (isNaN(page)) {
      toast.error("숫자를 입력해주세요!");
    } else if (page >= 1 && page <= totalPage) {
      handlePageChange(page);
      setShowInput(false);
      setInputPage("");
    } else {
      toast.error(`올바른 범위를 입력해주세요 (1~${totalPage})`);
    }
  };

  return (
    <Pagination className="my-2">
      <PaginationContent>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink isActive={page === curPage} onClick={() => handlePageChange(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showEllipsis && (
          <PaginationItem>
            {showInput ? (
              <input
                autoFocus
                min={1}
                max={totalPage}
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEllipsisSubmit()}
                onBlur={() => {
                  handleEllipsisSubmit();
                  setShowInput(false);
                  setInputPage("");
                }}
                placeholder={`${totalPage}`}
                className="w-12 border rounded px-1 text-center text-sm focus:outline-none"
              />
            ) : (
              <button className="cursor-pointer" onClick={() => setShowInput(true)}>
                ...
              </button>
            )}
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default RecallPagination;
