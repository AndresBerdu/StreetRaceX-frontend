import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import defaultImage from "../assets/perfils/defaultImage.jpg"
import "../styles/ranking.css";

type User = {
  slug: string;
  username: string;
  profile_photo: string | null;
  rank: string;
  victories: number;
  defeats: number;
  consecutive_victories: number;
};

type ApiResponse = {
  ok: boolean;
  data: User[];
  meta: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
};

const PAGE_SIZE = 10;

const RANK_COLORS: Record<string, string> = {
  S: "#c0392b",
  A: "#e67e22",
  B: "#2980b9",
  C: "#27ae60",
  D: "#7f8c8d",
};

const SKELETON_ROWS = Array.from({ length: PAGE_SIZE }, (_, i) => i);

const positionLabel = (pos: number) => {
  if (pos === 1) return "🥇";
  if (pos === 2) return "🥈";
  if (pos === 3) return "🥉";
  return `#${pos}`;
};

export const RankingPage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useFetch<ApiResponse>({
    url: `http://localhost:8000/api/users?page=${page}&size=${PAGE_SIZE}`,
    method: "GET",
  });

  const users = (data?.data ?? []).sort((a, b) => b.victories - a.victories);

  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.totalItems ?? 0;

  const globalIndex = (i: number) => (page - 1) * PAGE_SIZE + i + 1;

  return (
    <div className="page">
      <header className="header">
        <h1 className="title">Global Ranking</h1>
        <p className="subtitle">
          {totalItems > 0
            ? `${totalItems} Racers Registered`
            : "No Racers"}
        </p>
      </header>

      {error && <div className="errorBanner">⚠️ {error}</div>}

      <section className="table">
        <div className="row tableHeader">
          <span className="colPos">#</span>
          <span className="colRacer">Racer</span>
          <span className="colRank">Rank</span>
          <span className="colStat">Victories</span>
          <span className="colStat">Defeats</span>
          <span className="colStat">Consecutive Victories</span>
        </div>

        {isLoading &&
          SKELETON_ROWS.map((i) => (
            <div key={i} className="row skeletonRow">
              <div className="bone boneShort" />
              <div className="skeletonUser">
                <div className="bone boneAvatar" />
                <div className="bone boneName" />
              </div>
              <div className="bone boneShort" />
              <div className="bone boneStat" />
              <div className="bone boneStat" />
              <div className="bone boneStat" />
            </div>
          ))}

        {!isLoading &&
          users.map((user, i) => {
            const pos = globalIndex(i);
            const rankColor = RANK_COLORS[user.rank?.toUpperCase()] ?? "#444";

            return (
              <div key={user.slug} className={`row ${pos <= 3 ? "topRow" : ""}`}>
                <span className={`colPos ${pos <= 3 ? "topPos" : ""}`}>
                  {positionLabel(pos)}
                </span>

                <div className="colRacer">
                  <img
                    src={user.profile_photo ?? defaultImage}
                    alt={user.username}
                    className="avatar"
                  />
                  <span className="username">{user.username}</span>
                </div>

                <span className="colRank">
                  <span className="rankBadge" style={{ background: rankColor }}>
                    {user.rank?.toUpperCase() ?? "?"}
                  </span>
                </span>

                <span className="colStat wins">{user.victories}</span>
                <span className="colStat losses">{user.defeats}</span>
                <span className="colStat streak">
                  {user.consecutive_victories > 0
                    ? `🔥 ${user.consecutive_victories}`
                    : user.consecutive_victories}
                </span>
              </div>
            );
          })}
      </section>

      {totalPages > 1 && (
        <nav className="pagination">
          <button
            className="pageBtn"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← prev
          </button>

          <span className="pageInfo">
            page {page} of {totalPages}
          </span>

          <button
            className="pageBtn"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            next →
          </button>
        </nav>
      )}
    </div>
  );
};

