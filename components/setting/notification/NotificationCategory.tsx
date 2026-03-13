import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Category } from "./NotificationCategorySection";

interface NotificationCategoryProps {
  category: Category;
  subscribedAt: string | null;
  onToggle: () => void;
}

const NotificationCategory = ({ category, subscribedAt, onToggle }: NotificationCategoryProps) => {
  const isSubscribed = subscribedAt !== null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3.5 transition-opacity",
        !isSubscribed && "opacity-50"
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-base">
        {category.icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{category.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {isSubscribed
            ? `${format(new Date(subscribedAt), "yyyy.MM.dd", { locale: ko })}부터 구독 중`
            : "구독하지 않은 카테고리"}
        </p>
      </div>

      {isSubscribed ? (
        <Button variant="outline" size="sm" className="shrink-0 text-xs h-8" onClick={onToggle}>
          구독 취소
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 text-xs h-8 border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 dark:border-emerald-600 dark:text-emerald-400 dark:bg-emerald-950 dark:hover:bg-emerald-900"
          onClick={onToggle}
        >
          구독하기
        </Button>
      )}
    </div>
  );
};

export default NotificationCategory;
