import { create } from "zustand";

interface NotificationStore {
  unreadCount: number;
  settingUnread: (count: number) => void;
  incrementUnread: (count?: number) => void;
  decrementUnread: () => void;
  resetUnread: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadCount: 0,

  settingUnread: (count) => set(() => ({ unreadCount: count })),

  incrementUnread: (count = 1) => set((state) => ({ unreadCount: state.unreadCount + count })),

  decrementUnread: () => set((state) => ({ unreadCount: state.unreadCount - 1 })),

  resetUnread: () => set({ unreadCount: 0 })
}));
