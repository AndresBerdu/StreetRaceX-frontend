// stores/useNotificationStore.ts
import { create } from "zustand";

export type AppNotification = {
    id: string;
    type: "challenge_received" | "challenge_rejected" | "results" | "rank_up";
    message: string;
    reference_id?: string;
    timestamp: number;
    read: boolean;
};

type NotificationStore = {
    notifications: AppNotification[];
    addNotification: (n: Omit<AppNotification, "id" | "read">) => void;
    markAllRead: () => void;
    unreadCount: () => number;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
    notifications: [],

    addNotification: (n) =>
        set((state) => ({
            notifications: [
                { ...n, id: crypto.randomUUID(), read: false },
                ...state.notifications,
            ].slice(0, 50),
        })),

    markAllRead: () =>
        set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

    unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));