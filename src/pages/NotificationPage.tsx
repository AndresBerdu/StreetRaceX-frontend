// NotificationsPage.tsx
import { FaBell, FaFlag, FaMedal, FaTimes, FaTrophy } from "react-icons/fa";
import { useNotificationStore } from "../stores/useNotificationStore";
import { useState } from "react";

const iconMap = {
  challenge_received: <FaFlag color="#f59e0b" />,
  challenge_rejected: <FaTimes color="#ef4444" />,
  results: <FaTrophy color="#10b981" />,
  rank_up: <FaMedal color="#6366f1" />,
};

const labelMap = {
  challenge_received: "Challenge",
  challenge_rejected: "Rejected",
  results: "Results",
  rank_up: "Rank Up",
};

export const NotificationsPage = () => {
  const { notifications, markAllRead } = useNotificationStore();

  useState(() => {
    markAllRead();
  });

  return (
    <div className="challenges-page">
      <div className="challenges-header">
        <div>
          <h1>Notifications</h1>
          <p>All your recent activity and alerts.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#64748b" }}>
          <FaBell />
          <span>{notifications.length} total</span>
        </div>
      </div>

      {notifications.length === 0 ? (
        <p style={{ color: "#94a3b8", marginTop: "2rem" }}>No notifications yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                background: n.read ? "#1e293b" : "#1e293b",
                border: `1px solid ${n.read ? "#334155" : "#6366f1"}`,
                borderRadius: "0.75rem",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                opacity: n.read ? 0.7 : 1,
              }}
            >
              <span style={{ fontSize: "1.2rem", marginTop: "0.1rem" }}>
                {iconMap[n.type]}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "#64748b",
                    }}
                  >
                    {labelMap[n.type]}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#475569" }}>
                    {new Date(n.timestamp).toLocaleString([], {
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p style={{ margin: 0, color: "#e2e8f0", fontSize: "0.9rem" }}>{n.message}</p>
              </div>
              {!n.read && (
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#6366f1",
                    marginTop: "0.4rem",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};