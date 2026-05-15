"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function MockInterview() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    fetch("/api/generate", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions || []));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimeLeft(60);
    }
  };

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