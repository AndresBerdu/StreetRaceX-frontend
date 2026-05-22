import { useState } from "react";

import avatar from "../assets/ranks/rank.webp";

import "../styles/ranking.css";

type Racer = {
  id?: string;

  username: string;

  level: number;

  reputation: number;

  wins: number;

  losses: number;

  crew: string;

  avatar: string;
};

export const RankingPage = () => {

  const [racers] = useState<Racer[]>([
    {
      id: "1",
      username: "ShadowDriver",
      level: 42,
      reputation: 9850,
      wins: 120,
      losses: 18,
      crew: "Night Riders",
      avatar,
    },

    {
      id: "2",
      username: "TokyoGhost",
      level: 38,
      reputation: 8700,
      wins: 98,
      losses: 22,
      crew: "Drift Kings",
      avatar,
    },

    {
      id: "3",
      username: "NitroX",
      level: 35,
      reputation: 8100,
      wins: 89,
      losses: 27,
      crew: "Street Phantoms",
      avatar,
    },
  ]);

  return (
    <div className="ranking-page">

      {/* HEADER */}

      <div className="ranking-header">

        <div>

          <h1>
            Global Ranking
          </h1>

          <p>
            The most feared racers in the underground scene.
          </p>

        </div>

      </div>

      {/* TABLE */}

      <section className="ranking-table">

        <div className="ranking-table-header">

          <span>#</span>

          <span>Racer</span>

          <span>Level</span>

          <span>Reputation</span>

          <span>Record</span>

          <span>Crew</span>

        </div>

        {racers.map((racer, index) => (

          <div
            key={racer.id}
            className="ranking-row"
          >

            <span className="ranking-position">
              #{index + 1}
            </span>

            <div className="ranking-user">

              <img
                src={racer.avatar}
                alt={racer.username}
                className="ranking-avatar"
              />

              <span>
                {racer.username}
              </span>

            </div>

            <span>
              Lv. {racer.level}
            </span>

            <span>
              {racer.reputation}
            </span>

            <span>
              {racer.wins}W / {racer.losses}L
            </span>

            <span>
              {racer.crew}
            </span>

          </div>

        ))}

      </section>

    </div>
  );
};