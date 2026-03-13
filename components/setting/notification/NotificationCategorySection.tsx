"use client";

import SectionDivider from "./SectionDivider";
import NotificationCategory from "./NotificationCategory";
import { useState } from "react";

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface SubscriptionMap {
  [id: string]: string;
}

const ALL_CATEGORIES: Category[] = [
  { id: "0201", name: "식품", icon: "🥗" },
  { id: "0206", name: "화장품", icon: "💄" },
  { id: "0204", name: "의약품", icon: "💊" },
  { id: "0301", name: "자동차", icon: "🚗" },
  { id: "0207", name: "의료기기", icon: "🩺" },
  { id: "0203", name: "축산물", icon: "🥩" },
  { id: "0205", name: "의약외품", icon: "🩹" },
  { id: "0208", name: "위생용품", icon: "🧴" },
  { id: "0401", name: "생활화학제품", icon: "🧪" },
  { id: "0403", name: "먹는물", icon: "💧" },
  { id: "0405", name: "생활방사선제품", icon: "📡" },
  { id: "0101", name: "공산품", icon: "🔧" }
];

const NotificationCategorySection = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionMap>({});

  const toggleSubscription = (id: string) => {
    setSubscriptions((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = new Date().toISOString().split("T")[0];
      }
      return next;
    });
  };

  const subscribed = ALL_CATEGORIES.filter((c) => subscriptions[c.id]);
  const unsubscribed = ALL_CATEGORIES.filter((c) => !subscriptions[c.id]);
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
                  subscribedAt={subscriptions[cat.id]}
                  onToggle={() => toggleSubscription(cat.id)}
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
                  onToggle={() => toggleSubscription(cat.id)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default NotificationCategorySection;
