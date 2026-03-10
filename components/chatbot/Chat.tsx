"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { nanoid } from "nanoid";
import { ChatMessage, ChatStep, MessagePayload } from "@/types/chatbot.type";
import { MainCategory } from "@/const/category.const";
import CategoryButtons from "./CategoryButtons";
import SubCategoryButtons from "./SubCategoryButtons";
import TypingIndicator from "./TypingIndicator";
import CancelButton from "./CancelButton";
import { RECALL_CATEGORY_KEY_TYPE } from "@/const/RECALL_CATEGORY_KEY_MAP.const";
import { recallApi } from "@/services/recallService";
import YesNoButtons from "./YesNoButtons";
import SearchResults from "./SearchResults";
import { openaiApi } from "@/services/openaiService";
import { CameraIcon } from "lucide-react";

const BOT = {
  greeting: "안녕하세요! 리콜 제품 검색 서비스입니다",
  askCategory: "어떤 카테고리의 제품을 검색하시나요?",
  askSub: (cat: string) => `'${cat}'의 세부 분류를 선택해주세요.`,
  askQuery: "검색할 제품명 또는 업체명을 입력해주세요.",
  found: "리콜 대상 제품을 찾았습니다. 아래 내용을 확인해주세요.",
  notFoundInCategory: "선택하신 카테고리에 해당 제품의 리콜 내역이 없습니다.",
  foundOtherCategory: "다른 카테고리에서 리콜 대상 제품을 찾았습니다. 아래 내용을 확인해주세요.",
  notFound: "해당 제품의 리콜 내역이 없습니다.",
  typoCorrection: (typo: string) => `혹시 '${typo}'을(를) 검색하셨나요?`,
  askEmbedding: "연관된 제품을 보여드릴까요?",
  foundEmbedding: "비슷한 제품들을 찾았습니다.",
  notFoundEmbedding: "비슷한 제품이 없습니다.",
  error: "검색 중 오류가 발생했습니다. 다시 시도해주세요.",
  retry: "처음으로 돌아갑니다. 카테고리를 선택해주세요.",
  cancelled: "취소했습니다. 카테고리를 다시 선택해주세요.",
  ocrRetry: "다시 입력해주세요.",
  ocrConfirm: (query: string) => `'${query}'이(가) 맞습니까?`
};

function botMsg(message: string, payload?: MessagePayload): ChatMessage {
  return { id: nanoid(), message, direction: "incoming", payload };
}
function userMsg(message: string): ChatMessage {
  return { id: nanoid(), message, direction: "outgoing" };
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<ChatStep>("SELECT_CATEGORY");
  const [selectedSub, setSelectedSub] = useState<RECALL_CATEGORY_KEY_TYPE | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [path, setPath] = useState("");

  const [originalQuery, setOriginalQuery] = useState("");
  const [correctedQuery, setCorrectedQuery] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const pushWithDelay = async (msgs: ChatMessage[], delayMs?: number) => {
    for (const msg of msgs) {
      setIsTyping(true);
      const delay = delayMs ?? Math.min(Math.max(msg.message.length * 25, 500), 1400);
      await new Promise((res) => setTimeout(res, delay));
      setIsTyping(false);
      setMessages((prev) => [...prev, msg]);
    }
  };

  const push = (...msgs: ChatMessage[]) => setMessages((prev) => [...prev, ...msgs]);

  const markUsed = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, used: true } : m)));
  };

  const resetToStart = async (labelMsg?: string) => {
    setSelectedSub(null);
    setInput("");
    setOriginalQuery("");
    setCorrectedQuery("");
    setStep("SELECT_CATEGORY");
    await pushWithDelay([botMsg(labelMsg ?? BOT.retry, { type: "category-buttons" })]);
  };

  useEffect(() => {
    const init = async () => {
      await pushWithDelay([
        botMsg(BOT.greeting),
        botMsg(BOT.askCategory, { type: "category-buttons" })
      ]);
    };
    init();
  }, []);

  const handleCategory = async (cat: MainCategory, msgId: string) => {
    if (step !== "SELECT_CATEGORY") return;
    markUsed(msgId);
    setStep("SELECT_SUBCATEGORY");
    push(userMsg(cat));
    await pushWithDelay([botMsg(BOT.askSub(cat), { type: "subcategory-buttons", category: cat })]);
  };

  // 세부 카테고리 선택
  const handleSub = async (sub: RECALL_CATEGORY_KEY_TYPE, msgId: string) => {
    if (step !== "SELECT_SUBCATEGORY") return;
    markUsed(msgId);
    setSelectedSub(sub);
    setStep("INPUT_QUERY");
    push(userMsg(sub));
    await pushWithDelay([botMsg(BOT.askQuery, { type: "query-cancel" })]);
  };

  // 모르겠어요 → 카테고리 없이 INPUT_QUERY로
  const handleUnknownCategory = async (msgId: string) => {
    if (step !== "SELECT_CATEGORY") return;
    markUsed(msgId);
    setSelectedSub(null);
    setStep("INPUT_QUERY");
    push(userMsg("모르겠어요"));
    await pushWithDelay([botMsg(BOT.askQuery, { type: "query-cancel" })]);
  };

  const handleCancel = async (msgId: string) => {
    markUsed(msgId);
    push(userMsg("취소"));
    await resetToStart(BOT.cancelled);
  };

  const handleSearch = async () => {
    const query = input.trim();
    if (step !== "INPUT_QUERY" || !query) return;

    setInput("");
    await searchWithQuery(query, path);
    setPath("");
  };

  const searchWithQuery = async (query: string, path?: string) => {
    setOriginalQuery(query);
    push(userMsg(query));
    if (path) setPath(path);
    setStep("LOADING");
    setIsTyping(true);

    try {
      const result = await recallApi.chatbotSearchRecall({
        query,
        category: selectedSub ?? undefined,
        path
      });

      setIsTyping(false);

      if (result.found) {
        const message = result.differentCategory ? BOT.foundOtherCategory : BOT.found;
        if (result.differentCategory) {
          await pushWithDelay([botMsg(BOT.notFoundInCategory)]);
        }
        await pushWithDelay([
          botMsg(message, {
            type: "results",
            products: result.data.products,
            foundInOtherCategory: result.differentCategory,
            count: result.data.count,
            targetUrl: result.data.targetUrl
          })
        ]);
        await resetToStart();
        setPath("");
        return;
      }

      await pushWithDelay([botMsg(BOT.notFound)]);
      await proceedToTypoStep(query);
    } catch {
      setIsTyping(false);
      setPath("");
      await pushWithDelay([botMsg(BOT.error)]);
      await resetToStart();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setStep("LOADING");
    setIsTyping(true);

    try {
      const result = await openaiApi.imageOcr(file);
      setIsTyping(false);

      if (!result.found || !result.query || !result.path) {
        // OCR 실패 → message 출력 + 다시 입력 안내, INPUT_QUERY 유지
        await pushWithDelay([botMsg(result.message), botMsg(BOT.ocrRetry)]);
        setStep("INPUT_QUERY");
        return;
      }

      // OCR 성공 → query 확인 질문
      setStep("CONFIRM_OCR");
      await pushWithDelay([
        botMsg(BOT.ocrConfirm(result.query), {
          type: "confirm-ocr",
          ocrQuery: result.query,
          path: result.path
        })
      ]);
    } catch {
      setIsTyping(false);
      await pushWithDelay([botMsg(BOT.error)]);
      setStep("INPUT_QUERY");
    }
  };

  // OCR "예" → 바로 검색
  const handleOcrYes = async (msgId: string, ocrQuery: string, path: string) => {
    if (step !== "CONFIRM_OCR") return;
    markUsed(msgId);
    push(userMsg("예"));
    await searchWithQuery(ocrQuery, path);
  };

  // OCR "아니오" → input에 query 입력해두고 수정 가능하게
  const handleOcrNo = async (msgId: string, ocrQuery: string, path: string) => {
    if (step !== "CONFIRM_OCR") return;
    markUsed(msgId);
    push(userMsg("아니오"));
    setPath(path);
    setInput(ocrQuery);
    setStep("INPUT_QUERY");
  };

  const proceedToTypoStep = async (query: string) => {
    setIsTyping(true);
    try {
      const typoResult = await openaiApi.correctTypo(query);
      if (typoResult.isSame) {
        setIsTyping(false);
        await proceedToEmbeddingStep();
        return;
      }
      const corrected = typoResult.corrected;
      setCorrectedQuery(corrected);
      setIsTyping(false);
      setStep("CONFIRM_TYPO");
      await pushWithDelay([botMsg(BOT.typoCorrection(corrected), { type: "confirm-typo" })]);
    } catch {
      setIsTyping(false);
      await proceedToEmbeddingStep();
    }
  };

  const handleTypoYes = async (msgId: string) => {
    if (step !== "CONFIRM_TYPO") return;
    markUsed(msgId);
    push(userMsg("예"));
    setStep("LOADING");
    setIsTyping(true);

    await searchWithQuery(correctedQuery, path);
    setPath("");
  };

  const handleTypoNo = async (msgId: string) => {
    if (step !== "CONFIRM_TYPO") return;
    markUsed(msgId);
    push(userMsg("아니오"));
    setPath("");
    await proceedToEmbeddingStep();
  };

  const proceedToEmbeddingStep = async () => {
    setStep("CONFIRM_EMBEDDING");
    await pushWithDelay([botMsg(BOT.askEmbedding, { type: "confirm-embedding" })]);
  };

  const handleEmbeddingYes = async (msgId: string) => {
    if (step !== "CONFIRM_EMBEDDING") return;
    markUsed(msgId);
    push(userMsg("예"));
    setStep("LOADING");
    setIsTyping(true);

    try {
      const result = await recallApi.embeddingSearch({ query: originalQuery });
      setIsTyping(false);

      if (result.found) {
        await pushWithDelay([
          botMsg(BOT.foundEmbedding, {
            type: "results",
            products: result.data,
            targetUrl: null
          })
        ]);
      } else {
        await pushWithDelay([botMsg(BOT.notFoundEmbedding)]);
      }
    } catch {
      setIsTyping(false);
      await pushWithDelay([botMsg(BOT.error)]);
    }

    await resetToStart();
  };

  const handleEmbeddingNo = async (msgId: string) => {
    if (step !== "CONFIRM_EMBEDDING") return;
    markUsed(msgId);
    push(userMsg("아니오"));
    await resetToStart();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const renderPayload = (msg: ChatMessage) => {
    if (!msg.payload) return null;

    switch (msg.payload.type) {
      case "category-buttons":
        return (
          <CategoryButtons
            onSelect={(cat) => handleCategory(cat, msg.id)}
            onUnknown={() => handleUnknownCategory(msg.id)}
            disabled={msg.used ?? false}
          />
        );
      case "subcategory-buttons":
        return (
          <SubCategoryButtons
            category={msg.payload.category as MainCategory}
            onSelect={(sub) => handleSub(sub, msg.id)}
            onCancel={() => handleCancel(msg.id)}
            disabled={msg.used ?? false}
          />
        );
      case "results":
        return (
          <SearchResults
            products={msg.payload.products}
            count={msg.payload.count}
            targetUrl={msg.payload.targetUrl}
          />
        );
      case "query-cancel":
        return <CancelButton onCancel={() => handleCancel(msg.id)} disabled={msg.used ?? false} />;
      case "confirm-typo":
        return (
          <YesNoButtons
            onYes={() => handleTypoYes(msg.id)}
            onNo={() => handleTypoNo(msg.id)}
            disabled={msg.used ?? false}
          />
        );
      case "confirm-embedding":
        return (
          <YesNoButtons
            onYes={() => handleEmbeddingYes(msg.id)}
            onNo={() => handleEmbeddingNo(msg.id)}
            disabled={msg.used ?? false}
          />
        );
      case "confirm-ocr":
        return (
          <YesNoButtons
            onYes={() =>
              handleOcrYes(
                msg.id,
                (msg.payload as { type: "confirm-ocr"; ocrQuery: string; path: string }).ocrQuery,
                (msg.payload as { type: "confirm-ocr"; ocrQuery: string; path: string }).path
              )
            }
            onNo={() =>
              handleOcrNo(
                msg.id,
                (msg.payload as { type: "confirm-ocr"; ocrQuery: string }).ocrQuery,
                (msg.payload as { type: "confirm-ocr"; ocrQuery: string; path: string }).path
              )
            }
            disabled={msg.used ?? false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100%-44px)] max-w-2xl mx-auto bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex justify-end gap-2 flex-col ${
              msg.direction === "outgoing" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex flex-col gap-1 max-w-[78%]">
              {msg.message && (
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.direction === "incoming"
                      ? "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                      : "bg-indigo-500 text-white rounded-tr-none"
                  }`}
                >
                  {msg.message}
                </div>
              )}
            </div>
            {renderPayload(msg)}
          </div>
        ))}

        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 border-t bg-white flex items-center gap-2">
        {/* 이미지 첨부 버튼 (INPUT_QUERY 스텝에서만 활성화) */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <button
          onClick={() => imageInputRef.current?.click()}
          disabled={step !== "INPUT_QUERY"}
          className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center
                     hover:bg-gray-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150"
          title="이미지로 검색"
        >
          <CameraIcon className="size-5" />
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            step === "INPUT_QUERY"
              ? "제품명 또는 업체명을 입력하세요..."
              : "위에서 항목을 선택해주세요"
          }
          disabled={step !== "INPUT_QUERY"}
          className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none
                     focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all
                     disabled:text-gray-400 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSearch}
          disabled={step !== "INPUT_QUERY" || !input.trim()}
          className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center
                     hover:bg-indigo-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150 shadow-sm text-lg cursor-pointer"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
