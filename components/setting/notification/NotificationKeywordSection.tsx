"use client";

import { useState } from "react";
import { XIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useKeywordList, useAddKeyword, useDeleteKeyword } from "@/hooks/useKeyword";

const SkeletonUI = () => (
  <div className="mb-8">
    <Skeleton className="mb-3 h-3 w-16" />
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-700">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5 dark:border-zinc-700"
        >
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

const NotificationKeywordSection = () => {
  const { data, isPending, isError } = useKeywordList();
  const { mutate: addKeyword, isPending: isAdding } = useAddKeyword();
  const { mutate: deleteKeyword } = useDeleteKeyword();
  const [input, setInput] = useState("");

  if (isPending) return <SkeletonUI />;
  if (isError)
    return <p className="mb-8 text-sm text-red-500">에러가 발생하였습니다.</p>;

  const handleAdd = () => {
    const keyword = input.trim();
    if (!keyword) return;
    if (keyword.length > 20) {
      toast.error("키워드는 20자 이하로 입력해주세요.");
      return;
    }
    if (data && data.length >= 10) {
      toast.error("키워드는 최대 10개까지 등록 가능합니다.");
      return;
    }

    addKeyword(keyword, {
      onSuccess: () => setInput(""),
      onError: () => toast.error("이미 등록된 키워드입니다.")
    });
  };

  return (
    <div className="mb-8">
      <p className="mb-3 text-xs font-medium text-gray-500 dark:text-gray-400">키워드 알림</p>

      <div className="mb-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="키워드 입력 (최대 20자)"
          maxLength={20}
          className="flex-1 rounded-xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:bg-zinc-700 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
        <button
          onClick={handleAdd}
          disabled={isAdding || !input.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-950 text-white transition-opacity disabled:opacity-40 dark:bg-gray-100 dark:text-gray-950"
        >
          <PlusIcon className="size-4" />
        </button>
      </div>

      {data && data.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-700">
          {data.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center justify-between px-4 py-3.5 ${i !== 0 ? "border-t border-gray-100 dark:border-zinc-700" : ""}`}
            >
              <span className="text-sm dark:text-gray-100">{item.keyword}</span>
              <button onClick={() => deleteKeyword(item.id)}>
                <XIcon className="size-4 text-gray-400 dark:text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-xl border border-gray-200 py-6 dark:border-zinc-700">
          <p className="text-sm text-gray-400 dark:text-gray-500">등록된 키워드가 없습니다.</p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            키워드를 등록하면 관련 리콜 알림을 받을 수 있어요.
          </p>
        </div>
      )}

      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        최대 10개 · 현재 {data?.length ?? 0}개 등록됨
      </p>
    </div>
  );
};

export default NotificationKeywordSection;
