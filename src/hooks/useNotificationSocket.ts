import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "../stores/useAuthStore";
import { useNotificationStore } from "../stores/useNotificationStore";

let socket: Socket | null = null;

export const useNotificationSocket = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.updateUser);
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    if (!user?.slug) return;

    if (socket?.connected) {
      socket.emit("join", user.slug);
      return;
    }

    socket = io(import.meta.env.VITE_API_URL || "http://localhost:8000", {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("🔌 socket conected:", socket?.id);
      socket?.emit("join", user.slug);
    });

    socket.on("reconnect", () => {
      console.log("🔄 socket reconected, re-joining:", user.slug);
      socket?.emit("join", user.slug);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error socket:", err.message);
    });

    socket.on("notification:new", async (data) => {
      console.log("📨 notification:new get it:", data);
      let message = data.message;

      if (data.from_slug) {
        try {
          const res = await fetch(
            `http://localhost:8000/api/users/${data.from_slug}`,
            { credentials: "include" },
          );
          const json = await res.json();
          const username = json.data?.username ?? data.from_slug;
          message = `You received a new challenge from ${username}`;
        } catch {
          message = `You received a new challenge from ${data.from_slug}`;
        }
      }

      addNotification({
        type: data.type,
        message,
        reference_id: data.reference_id,
        timestamp: data.timestamp ?? Date.now(),
      });

      if (data.type === "rank_up") {
        try {
          const res = await fetch(
            `http://localhost:8000/api/users/${user.slug}`,
            { credentials: "include" },
          );
          const json = await res.json();
          if (res.ok && json.data) {
            setUser(json.data);
          }
        } catch (err) {
          console.error("Error refreshing user after rank up:", err);
        }
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 socket desconected:", reason);
    });

    return () => {
      if (!user?.slug) {
        socket?.disconnect();
        socket = null;
      }
    };
  }, [user?.slug]);
};