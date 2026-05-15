"use client";

import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [scores, setScores] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("scores");

    if (saved) {
      setScores(JSON.parse(saved));
    }
  }, []);

  const average =
    scores.length > 0
      ? (
          scores.reduce((a, b) => a + b, 0) /
          scores.length
        ).toFixed(1)
      : 0;

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1>Interview Results</h1>

      <div
        style={{
          marginTop: "30px",
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "14px",
        }}
      >
        <h2>Average Score: {average}/10</h2>

        <h3 style={{ marginTop: "20px" }}>
          Individual Scores
        </h3>

        {scores.map((score, i) => (
          <p key={i}>
            Question {i + 1}: {score}/10
          </p>
        ))}
      </div>
    </div>
  );
}