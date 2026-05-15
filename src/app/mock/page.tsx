"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

type GenerateQuestionsResponse = {
  questions?: string[];
};

export default function MockInterview() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const webcamRef = useRef<Webcam>(null);

  const nextQuestion = () => {
    setCurrent((prev) => {
      if (prev < questions.length - 1) {
        setTimeLeft(60);
        return prev + 1;
      }

      return prev;
    });
  };

  useEffect(() => {
    void fetch("/api/generate", { method: "POST" })
      .then(async (res) => (await res.json()) as GenerateQuestionsResponse)
      .then((data) => setQuestions(data.questions ?? []));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCurrent((prev) => {
        if (prev < questions.length - 1) {
          setTimeLeft(60);
          return prev + 1;
        }

        return prev;
      });
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [questions.length, timeLeft]);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log("Captured:", imageSrc);
    alert("Answer snapshot captured");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>PrepForge Live Interview</h1>

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />

      <h2>Time Left: {timeLeft}s</h2>

      {questions.length > 0 && (
        <>
          <h3>{questions[current]}</h3>

          <button onClick={capture}>
            Capture Answer
          </button>

          <button onClick={nextQuestion}>
            Next Question
          </button>
        </>
      )}
    </div>
  );
}
