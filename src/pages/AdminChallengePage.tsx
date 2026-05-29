import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useFetch } from "../hooks/useFetch";
import { useUsername } from "../hooks/useUsername";
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
  challenger_username?: string;
  challenged_username?: string;
  winner_slug?: string | null;
};

type ApiResponse = {
  ok: boolean;
  data: Challenge[];
};

export const AdminChallengesPage = () => {
  const user = useAuthStore((state) => state.user);
  const [localChallenges, setLocalChallenges] = useState<Challenge[]>([]);
  const [showComplete, setShowComplete] = useState<Challenge | null>(null);
  const [completing, setCompleting] = useState(false);

  const { data, isLoading } = useFetch<ApiResponse>({
    url: `http://localhost:8000/api/challenges?status=STARTED`,
    method: "GET",
    onUnauthorized: () => {
      window.location.href = "/login";
    },
  });

  useEffect(() => {
    if (data?.data) setLocalChallenges(data.data);
  }, [data]);

  // Recolectar todos los slugs para resolverlos a usernames
  const allSlugs = localChallenges.flatMap((c) => [
    c.challenger_slug,
    c.challenged_slug,
    ...(c.winner_slug ? [c.winner_slug] : []),
  ]);
  const usernames = useUsername(allSlugs);

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
          prev.filter((c) => c.slug !== showComplete.slug),
        );
        setShowComplete(null);
      }
    } finally {
      setCompleting(false);
    }
  };

  const isAdminInvolved = (challenge: Challenge) =>
    challenge.challenger_slug === user?.slug ||
    challenge.challenged_slug === user?.slug;

  const challengerName = (c: Challenge) =>
    usernames[c.challenger_slug] ?? c.challenger_username ?? c.challenger_slug;

  const challengedName = (c: Challenge) =>
    usernames[c.challenged_slug] ?? c.challenged_username ?? c.challenged_slug;

  return (
    <div className="challenges-page">
      <div className="challenges-header">
        <div>
          <h1>⚖️ Dispute Resolution</h1>
          <p>Active challenges awaiting a winner decision.</p>
        </div>
      </div>

      {isLoading && <div style={{ color: "#94a3b8" }}>Loading disputes...</div>}

      <section className="challenges-grid">
        {!isLoading && localChallenges.length === 0 && (
          <p style={{ color: "#94a3b8" }}>No active disputes.</p>
        )}

        {localChallenges.map((challenge) => {
          const involved = isAdminInvolved(challenge);
          return (
            <div
              key={challenge.slug}
              className="challenge-card"
              style={{ opacity: involved ? 0.5 : 1 }}
            >
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
                    style={{ background: "#6366f122", color: "#6366f1" }}
                  >
                    STARTED
                  </span>
                </div>

                <div className="challenge-info">
                  <div>
                    <strong>⚔️ Challenger</strong>
                    <span>{challengerName(challenge)}</span>
                  </div>
                  <div>
                    <strong>🎯 Challenged</strong>
                    <span>{challengedName(challenge)}</span>
                  </div>
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

                {involved ? (
                  <p
                    style={{
                      marginTop: "1rem",
                      fontSize: "0.8rem",
                      color: "#f59e0b",
                      textAlign: "center",
                    }}
                  >
                    ⚠️ You are a participant — cannot resolve this challenge
                  </p>
                ) : (
                  <button
                    className="av-btn-confirm"
                    style={{ width: "100%", marginTop: "1rem" }}
                    onClick={() => setShowComplete(challenge)}
                  >
                    🏁 Decide Winner
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Modal winner */}
      {showComplete && (
        <div className="av-overlay">
          <div className="av-modal">
            <h3>Decide the Winner 🏆</h3>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              Challenge between <strong>{challengerName(showComplete)}</strong>{" "}
              and <strong>{challengedName(showComplete)}</strong>
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <button
                className="av-btn-confirm"
                disabled={completing}
                onClick={() => handleComplete(showComplete.challenger_slug)}
              >
                🥇 {challengerName(showComplete)} wins
              </button>
              <button
                className="av-btn-confirm"
                style={{ background: "#6366f1" }}
                disabled={completing}
                onClick={() => handleComplete(showComplete.challenged_slug)}
              >
                🥇 {challengedName(showComplete)} wins
              </button>
            </div>

            <button
              className="av-btn-cancel"
              style={{ marginTop: "0.75rem", width: "100%" }}
              onClick={() => setShowComplete(null)}
              disabled={completing}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
