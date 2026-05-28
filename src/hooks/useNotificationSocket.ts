import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "../stores/useAuthStore";
import { useNotificationStore } from "../stores/useNotificationStore";

let socket: Socket | null = null;

export const useNotificationSocket = () => {
  const user = useAuthStore((state) => state.user);
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    if (!user?.slug) return;

    socket = io(import.meta.env.VITE_API_URL || "http://localhost:8000", {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
    });

    // ✅ Esperar a que conecte antes de emitir join
    socket.on("connect", () => {
      console.log("✅ Socket conectado:", socket?.id);
      socket?.emit("join", user.slug);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error socket:", err.message);
    });

    socket.on("notification:new", (data) => {
      console.log("🔔 Notificación:", data);
      addNotification({
        type: data.type,
        message: data.message,
        reference_id: data.reference_id,
        timestamp: data.timestamp ?? Date.now(),
      });
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [user?.slug]);
};