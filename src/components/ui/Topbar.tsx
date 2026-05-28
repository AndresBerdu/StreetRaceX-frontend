// TopbarComponent.tsx
import { useState, useRef, useEffect } from "react";
import { FaBell, FaTrophy, FaFlag, FaTimes, FaMedal } from "react-icons/fa";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNotificationStore } from "../../stores/useNotificationStore";
import { useNotificationSocket } from "../../hooks/useNotificationSocket";
import defaultImage from "../../assets/perfils/defaultImage.jpg";

const iconMap = {
  challenge_received: <FaFlag color="#f59e0b" />,
  challenge_rejected: <FaTimes color="#ef4444" />,
  results: <FaTrophy color="#10b981" />,
  rank_up: <FaMedal color="#6366f1" />,
};

export const TopbarComponent = () => {
  const user = useAuthStore((state) => state.user);
  const { notifications, markAllRead, unreadCount } = useNotificationStore();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Inicializar socket
  useNotificationSocket();

  const count = unreadCount();

  // Cerrar panel al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleBellClick = () => {
    setOpen((prev) => !prev);
    if (!open) markAllRead();
  };
  

  return (
    <header className="topbar">
      {/* LEFT */}
      <div>
        <h2 className="topbar-title">
          Welcome back, {user?.username || "Driver"}
        </h2>
        <p className="topbar-subtitle">Ready for your next challenge?</p>
      </div>

      {/* RIGHT */}
      <div className="topbar-actions">
        {/* RANK */}
        <div className="rank-badge">
          Rank <span>{user?.rank || "D"}</span>
        </div>

        {/* NOTIFICATIONS */}
        <div style={{ position: "relative" }} ref={panelRef}>
          <button className="notification-button" onClick={handleBellClick}>
            <FaBell />
            {count > 0 && (
              <span className="notification-dot">{count > 9 ? "9+" : count}</span>
            )}
          </button>

          {open && (
            <div className="notification-panel">
              <div className="notification-panel-header">
                <span>Notifications</span>
                <span className="notification-count">{notifications.length}</span>
              </div>

              {notifications.length === 0 ? (
                <div className="notification-empty">No notifications yet</div>
              ) : (
                <ul className="notification-list">
                  {notifications.map((n) => (
                    <li key={n.id} className={`notification-item ${n.read ? "read" : "unread"}`}>
                      <span className="notification-icon">{iconMap[n.type]}</span>
                      <div className="notification-body">
                        <p className="notification-message">{n.message}</p>
                        <span className="notification-time">
                          {new Date(n.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* USER */}
        <div className="topbar-user">
          {user?.profile_photo ? (
            <img src={user.profile_photo} alt="User" />
          ) : (
            <img src={defaultImage} alt="User" />
          )}
          <div>
            <h4>{user?.username || "Driver"}</h4>
            <p>{user?.role || "Racer"}</p>
          </div>
        </div>
      </div>
    </header>
  );
};