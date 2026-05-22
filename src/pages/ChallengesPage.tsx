import { useState } from "react";

import raceImage from "../assets/ranks/rank.webp"

import "../styles/challenge.css";

type Challenge = {
  id?: string;

  title: string;

  description: string;

  difficulty: string;

  reward: number;

  distance: string;

  image: string;

  active?: boolean;
};

export const ChallengesPage = () => {

  const [challenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Downtown Sprint",
      description:
        "Race through downtown streets before sunrise.",

      difficulty: "Medium",

      reward: 5000,

      distance: "5 KM",

      image: raceImage,

      active: true,
    },

    {
      id: "2",
      title: "Night Tunnel Run",
      description:
        "High speed challenge inside the underground tunnels.",

      difficulty: "Hard",

      reward: 12000,

      distance: "12 KM",

      image: raceImage,

      active: true,
    },

    {
      id: "3",
      title: "Harbor Drift",
      description:
        "Precision drifting challenge near the harbor zone.",

      difficulty: "Easy",

      reward: 3500,

      distance: "3 KM",

      image: raceImage,

      active: true,
    },
  ]);

  return (
    <div className="challenges-page">

      {/* HEADER */}

      <div className="challenges-header">

        <div>

          <h1>
            Street Challenges
          </h1>

          <p>
            Compete and dominate the underground scene.
          </p>

        </div>

        <button className="challenge-create-button">
          Create Challenge
        </button>

      </div>

      {/* GRID */}

      <section className="challenges-grid">

        {challenges.map((challenge) => (

          <div
            key={challenge.id}
            className="challenge-card"
          >

            <img
              src={challenge.image}
              alt={challenge.title}
              className="challenge-card-image"
            />

            <div className="challenge-card-content">

              <span className="challenge-difficulty">
                {challenge.difficulty}
              </span>

              <h2>
                {challenge.title}
              </h2>

              <p className="challenge-description">
                {challenge.description}
              </p>

              <div className="challenge-info">

                <div>

                  <strong>
                    Reward
                  </strong>

                  <span>
                    ${challenge.reward}
                  </span>

                </div>

                <div>

                  <strong>
                    Distance
                  </strong>

                  <span>
                    {challenge.distance}
                  </span>

                </div>

              </div>

              <button className="challenge-button">
                View Challenge
              </button>

            </div>

          </div>

        ))}

      </section>

    </div>
  );
};