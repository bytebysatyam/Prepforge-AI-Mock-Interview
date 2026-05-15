"use client";

import { useEffect, useState } from "react";

type EvaluationResponse = {
  score?: number;
  feedback?: string;
  improvement?: string;
  error?: string;
};

export default function InterviewPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [loadingEval, setLoadingEval] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("questions");

    if (saved) {
      const parsed = JSON.parse(saved) as string[];
      setQuestions(parsed);
      setAnswers(new Array(parsed.length).fill(""));
      setEvaluations(new Array(parsed.length).fill(""));
      setScores(new Array(parsed.length).fill(0));
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!loadingEval && !evaluations[current]) {
        void evaluateAnswer();
      }
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
    // evaluateAnswer intentionally uses the latest render state for the active question/timer cycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, evaluations, loadingEval, timeLeft]);

  const evaluateAnswer = async () => {
    if (!questions[current] || loadingEval) {
      return;
    }

    setLoadingEval(true);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questions[current],
          answer: answers[current],
        }),
      });

      const data = (await res.json()) as EvaluationResponse;

      const updatedEvaluations = [...evaluations];
      updatedEvaluations[current] = res.ok
        ? `Score: ${data.score ?? 0}/10
Feedback: ${data.feedback ?? "No feedback"}
Improvement: ${data.improvement ?? "No improvement suggestion"}`
        : data.error ?? "Evaluation failed";
      setEvaluations(updatedEvaluations);

      if (res.ok) {
        const updatedScores = [...scores];
        updatedScores[current] = data.score ?? 0;
        setScores(updatedScores);
        localStorage.setItem("scores", JSON.stringify(updatedScores));
      }
    } finally {
      setLoadingEval(false);
    }
  };

  const updateAnswer = (value: string) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  if (!questions.length) {
    return <h1 style={{ padding: "40px" }}>Loading...</h1>;
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1>Mock Interview</h1>

      <p>
        Question {current + 1} of {questions.length}
      </p>

      <h2
        style={{
          color: timeLeft < 30 ? "red" : "#2563eb",
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          background: "#f8fafc",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
        Time Left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </h2>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "12px",
        }}
      >
        <h3>{questions[current]}</h3>

        <textarea
          value={answers[current]}
          onChange={(e) => updateAnswer(e.target.value)}
          placeholder="Type your answer here..."
          style={{
            width: "100%",
            minHeight: "150px",
            marginTop: "20px",
            padding: "12px",
            borderRadius: "8px",
          }}
        />

        <br />
        <br />

        <button onClick={evaluateAnswer} disabled={loadingEval}>
          {loadingEval ? "Evaluating..." : "Evaluate Answer"}
        </button>

        {evaluations[current] && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              background: "#f3f4f6",
              borderRadius: "10px",
              whiteSpace: "pre-wrap",
            }}
          >
            {evaluations[current]}
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          disabled={current === 0}
          onClick={() => {
            setCurrent(current - 1);
            setTimeLeft(120);
          }}
        >
          Previous
        </button>

        <button
          onClick={() => {
            if (current === questions.length - 1) {
              window.location.href = "/results";
            } else {
              setCurrent(current + 1);
              setTimeLeft(120);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
