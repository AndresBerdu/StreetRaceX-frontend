import { create } from "zustand";
import type { User } from "../types/user.type";
import { persist } from "zustand/middleware";

interface AuthStore {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,

            login: (user) => set({ user }),

            logout: () => set({ user: null }),
            updateUser: (data) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...data } : null,
                })),
        }),
        {
            name: "streetracex-user",
        }
    )
);