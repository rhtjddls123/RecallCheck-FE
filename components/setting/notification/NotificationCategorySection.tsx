"use client";

import SectionDivider from "./SectionDivider";
import NotificationCategory from "./NotificationCategory";
import {
  RECALL_CATEGORY_KEY_TYPE,
  RECALL_CATEGORY_TYPE
} from "@/const/RECALL_CATEGORY_KEY_MAP.const";
import {
  Utensils,
  Sparkles,
  Pill,
  Car,
  Stethoscope,
  Beef,
  ShieldPlus,
  Droplets,
  FlaskConical,
  Waves,
  Radiation,
  Wrench,
  LucideIcon
} from "lucide-react";
import {
  useNotificationCategoryList,
  useSubscribeNotification,
  useUnsubscribeNotification
} from "@/hooks/useNotificationCategory";
import { Skeleton } from "@/components/ui/skeleton";

export interface Category {
  id: RECALL_CATEGORY_TYPE;
  name: RECALL_CATEGORY_KEY_TYPE;
  icon: LucideIcon;
}

const ALL_CATEGORIES: Category[] = [
  { id: "0101", name: "공산품", icon: Wrench },
  { id: "0301", name: "자동차", icon: Car },
  { id: "0203", name: "축산물", icon: Beef },
  { id: "0204", name: "의약품", icon: Pill },
  { id: "0205", name: "의약외품", icon: ShieldPlus },
  { id: "0207", name: "의료기기", icon: Stethoscope },
  { id: "0208", name: "위생용품", icon: Droplets },
  { id: "0206", name: "화장품", icon: Sparkles },
  { id: "0405", name: "생활방사선제품", icon: Radiation },
  { id: "0401", name: "생활화학제품", icon: FlaskConical },
  { id: "0201", name: "식품", icon: Utensils },
  { id: "0403", name: "먹는물", icon: Waves }
];

const NotificationCategorySection = () => {
  const { data, isPending, isError } = useNotificationCategoryList();
  const { mutate: subscribe } = useSubscribeNotification();
  const { mutate: unsubscribe } = useUnsubscribeNotification();

  if (isPending) return <SkeletonUI />;
  if (isError) return <p className="text-16_B text-red-500 mb-10">에러가 발생하였습니다.</p>;

  const subscribed = ALL_CATEGORIES.filter((c) =>
    data?.find((s) => s.menu.id === c.id && s.isActive)
  );
  const unsubscribed = ALL_CATEGORIES.filter(
    (c) => !data?.find((s) => s.menu.id === c.id && s.isActive)
  );

  return (
    <section className="mb-8">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        카테고리
      </p>

      <div className="rounded-xl border divide-y overflow-hidden">
        {subscribed.length > 0 && (
          <>
            <SectionDivider label={`구독 중 ${subscribed.length}`} />
            {subscribed.map((cat) => (
              <div key={cat.id}>
                <NotificationCategory
                  category={cat}
                  subscribedAt={data?.find((s) => s.menu.id === cat.id)?.updatedAt ?? null}
                  onToggle={() => unsubscribe(cat.id)}
                />
              </div>
            ))}
          </>
        )}

        {unsubscribed.length > 0 && (
          <>
            <SectionDivider label={`구독 안함 ${unsubscribed.length}`} />
            {unsubscribed.map((cat) => (
              <div key={cat.id}>
                <NotificationCategory
                  category={cat}
                  subscribedAt={null}
                  onToggle={() => subscribe(cat.id)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

const SkeletonUI = () => {
  return (
    <section className="mb-8">
      <Skeleton className="mb-3 h-3 w-16" />

      <div className="rounded-xl border divide-y overflow-hidden">
        <div className="bg-muted/50 px-4 py-2">
          <Skeleton className="h-2.5 w-20" />
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5">
            <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-2.5 w-36" />
            </div>
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        ))}

        <div className="bg-muted/50 px-4 py-2">
          <Skeleton className="h-2.5 w-24" />
        </div>

        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5 opacity-50">
            <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-2.5 w-32" />
            </div>
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NotificationCategorySection;
