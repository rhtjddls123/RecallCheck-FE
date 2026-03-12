import { create } from "zustand";

interface NotificationStore {
  unreadCount: number;
  incrementUnread: (count?: number) => void;
  resetUnread: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadCount: 0,

  incrementUnread: (count = 1) => set((state) => ({ unreadCount: state.unreadCount + count })),

  resetUnread: () => set({ unreadCount: 0 })
}));
