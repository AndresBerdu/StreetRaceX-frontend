import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useFetch } from "../hooks/useFetch";
import "../styles/challenge.css";

type Challenge = {
  slug: string;
  type_race: string;
  locality_rece: string;
  date_race: string;
  notes: string;
  status: string;
  challenger_slug: string;
  challenged_slug: string;
  winner_slug?: string | null; 
};

type ApiResponse = {
  ok: boolean;
  data: Challenge[];
};

const statusColors: Record<string, string> = {
  CREATED: "#f59e0b",
  ACCEPTED: "#10b981",
  REJECTED: "#ef4444",
  CANCELED: "#6b7280",
  STARTED: "#6366f1",
  COMPLETED: "#3b82f6",
};

export const ChallengesPage = () => {
  const user = useAuthStore((state) => state.user);
  const [localChallenges, setLocalChallenges] = useState<Challenge[]>([]);
  const [updating, setUpdating] = useState<string | null>(null);
  const [showComplete, setShowComplete] = useState<Challenge | null>(null);
  const [completing, setCompleting] = useState(false);

  const { data, isLoading } = useFetch<ApiResponse>({
    url: `http://localhost:8000/api/challenges/user/${user?.slug}`,
    method: "GET",
    onUnauthorized: () => {
      window.location.href = "/login";
    },
  });

  useEffect(() => {
    if (data?.data) setLocalChallenges(data.data);
  }, [data]);

  const handleUpdateStatus = async (
    challengeSlug: string,
    status: "ACCEPTED" | "REJECTED",
  ) => {
    setUpdating(challengeSlug);
    try {
      const res = await fetch(
        `http://localhost:8000/api/challenges/${challengeSlug}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );
      if (res.ok) {
        setLocalChallenges((prev) =>
          prev.map((c) => (c.slug === challengeSlug ? { ...c, status } : c)),
        );
      }
    } finally {
      setUpdating(null);
    }
  };

  const handleComplete = async (winnerSlug: string) => {
    if (!showComplete) return;
    setCompleting(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/challenges/${showComplete.slug}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "COMPLETED",
            winner_slug: winnerSlug,
          }),
        },
      );
      if (res.ok) {
        setLocalChallenges((prev) =>
          prev.map((c) =>
            c.slug === showComplete.slug
              ? { ...c, status: "COMPLETED", winner_slug: winnerSlug }
              : c,
          ),
        );
        setShowComplete(null);
      }
    } finally {
      setCompleting(false);
    }
  };

  console.log(
    "challenges:",
    localChallenges.map((c) => ({
      slug: c.slug,
      status: c.status,
      challenged_slug: c.challenged_slug,
      my_slug: user?.slug,
      match: c.challenged_slug === user?.slug,
    })),
  );

  return (
    <div className="challenges-page">
      <div className="challenges-header">
        <div>
          <h1>My Challenges</h1>
          <p>Track your active and past street challenges.</p>
        </div>
      </div>

      {isLoading && (
        <div style={{ color: "#94a3b8" }}>Loading challenges...</div>
      )}

      <section className="challenges-grid">
        {!isLoading && localChallenges.length === 0 && (
          <p style={{ color: "#94a3b8" }}>No challenges yet.</p>
        )}

        {localChallenges.map((challenge) => (
          <div key={challenge.slug} className="challenge-card">
            <div className="challenge-card-content">
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "0.8rem",
                }}
              >
                <span className="challenge-difficulty">
                  {challenge.type_race}
                </span>
                <span
                  className="challenge-status-badge"
                  style={{
                    background: `${statusColors[challenge.status]}22`,
                    color: statusColors[challenge.status],
                  }}
                >
                  {challenge.status}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  color: "#94a3b8",
                }}
              >
                {challenge.slug}
              </h2>

              <div className="challenge-info">
                <div>
                  <strong>📍 Locality</strong>
                  <span>{challenge.locality_rece}</span>
                </div>
                <div>
                  <strong>📅 Date</strong>
                  <span>
                    {new Date(challenge.date_race).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {challenge.notes && (
                <p className="challenge-description">{challenge.notes}</p>
              )}

              <div
                style={{
                  marginTop: "0.8rem",
                  fontSize: "0.8rem",
                  color: "#64748b",
                }}
              >
                {challenge.challenger_slug === user?.slug
                  ? `⚔️ You challenged ${challenge.challenged_slug}`
                  : `🎯 Challenged by ${challenge.challenger_slug}`}
              </div>

              {/* Botones accept/reject — solo para el retado y solo si está en created */}
              {challenge.status.toLowerCase() === "created" &&
                challenge.challenged_slug === user?.slug && (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <button
                      className="av-btn-confirm"
                      style={{ flex: 1 }}
                      disabled={updating === challenge.slug}
                      onClick={() =>
                        handleUpdateStatus(challenge.slug, "ACCEPTED")
                      }
                    >
                      {updating === challenge.slug ? "..." : "✅ Accept"}
                    </button>
                    <button
                      className="av-btn-cancel"
                      style={{
                        flex: 1,
                        color: "#ef4444",
                        borderColor: "#ef4444",
                      }}
                      disabled={updating === challenge.slug}
                      onClick={() =>
                        handleUpdateStatus(challenge.slug, "REJECTED")
                      }
                    >
                      {updating === challenge.slug ? "..." : "❌ Reject"}
                    </button>
                  </div>
                )}

              {challenge.status === "STARTED" &&
                (challenge.challenger_slug === user?.slug ||
                  challenge.challenged_slug === user?.slug) && (
                  <button
                    className="av-btn-confirm"
                    style={{ width: "100%", marginTop: "1rem" }}
                    onClick={() => setShowComplete(challenge)}
                  >
                    🏁 Register Result
                  </button>
                )}
            </div>
          </div>
        ))}

        {showComplete && (
          <div className="av-overlay">
            <div className="av-modal">
              <h3>Who won? 🏆</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                Select the winner of challenge{" "}
                <strong>{showComplete.slug}</strong>
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                <button
                  className="av-btn-confirm"
                  disabled={completing}
                  onClick={() => handleComplete(showComplete.challenger_slug)}
                >
                  🥇{" "}
                  {showComplete.challenger_slug === user?.slug
                    ? "I won"
                    : showComplete.challenger_slug}
                </button>
                <button
                  className="av-btn-confirm"
                  style={{ background: "#6366f1" }}
                  disabled={completing}
                  onClick={() => handleComplete(showComplete.challenged_slug)}
                >
                  🥇{" "}
                  {showComplete.challenged_slug === user?.slug
                    ? "I won"
                    : showComplete.challenged_slug}
                </button>
              </div>

              <button
                className="av-btn-cancel"
                style={{ marginTop: "0.5rem", width: "100%" }}
                onClick={() => setShowComplete(null)}
                disabled={completing}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
