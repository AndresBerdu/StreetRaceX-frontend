import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useFetch } from "../hooks/useFetch";
import "../styles/challenge.css";
import { useUsername } from "../hooks/useUsername";

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
  const [updating, setUpdating] = useState<string | null>(null);

  const {
    data,
    isLoading,
    execute: reloadChallenges,
  } = useFetch<ApiResponse>({
    url: `http://localhost:8000/api/challenges/user/${user?.slug}`,
    method: "GET",
    onUnauthorized: () => {
      window.location.href = "/login";
    },
  });

  const localChallenges = data?.data ?? [];

  useEffect(() => {
    if (!user?.slug) return;
    reloadChallenges(undefined); // carga inicial
    const interval = setInterval(() => reloadChallenges(undefined), 15000);
    return () => clearInterval(interval);
  }, [user?.slug]);

  const { execute: updateChallenge } = useFetch({
    url: "", 
    method: "PATCH",
    onSuccess: () => reloadChallenges(undefined),
  });

  const handleUpdateStatus = async (
    challengeSlug: string,
    status: "ACCEPTED" | "REJECTED",
  ) => {
    setUpdating(challengeSlug);
    await updateChallenge(
      { status },
      `http://localhost:8000/api/challenges/${challengeSlug}`,
    );
    setUpdating(null);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const allSlugs = localChallenges.flatMap((c) => [
    c.challenger_slug,
    c.challenged_slug,
    ...(c.winner_slug ? [c.winner_slug] : []),
  ]);
  const usernames = useUsername(allSlugs);

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
                  <span>{formatDate(challenge.date_race)}</span>
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
                  ? `⚔️ You challenged ${usernames[challenge.challenged_slug] ?? challenge.challenged_slug}`
                  : `🎯 Challenged by ${usernames[challenge.challenger_slug] ?? challenge.challenger_slug}`}
              </div>

              {/* CREATED — el retado puede aceptar o rechazar */}
              {challenge.status === "CREATED" &&
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

              {/* COMPLETED — mostrar ganador */}
              {challenge.status === "COMPLETED" && challenge.winner_slug && (
                <p
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.85rem",
                    color: "#10b981",
                    textAlign: "center",
                  }}
                >
                  🏆 Winner:{" "}
                  <strong>
                    {challenge.winner_slug === user?.slug
                      ? "You"
                      : (usernames[challenge.winner_slug] ??
                        challenge.winner_slug)}
                  </strong>
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
