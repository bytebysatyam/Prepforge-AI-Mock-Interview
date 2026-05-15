"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json() as { error?: string };

    if (!uploadRes.ok) {
      alert(uploadData.error ?? "Upload failed");
      setLoading(false);
      return;
    }

    const questionRes = await fetch("/api/questions", {
      method: "POST",
    });

    const questionData = await questionRes.json() as { questions: unknown[] };

    if (!questionRes.ok) {
      alert("Question generation failed");
      setLoading(false);
      return;
    }

    localStorage.setItem(
      "questions",
      JSON.stringify(questionData.questions)
    );

    window.location.href = "/interview";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top right, #3b82f6, #0f172a 60%)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          padding: "45px",
          borderRadius: "24px",
          width: "500px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          🚀
        </div>

        <h1
          style={{
            fontSize: "36px",
            color: "#0f172a",
            marginBottom: "8px",
          }}
        >
          PrepForge
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
            fontSize: "15px",
          }}
        >
          AI-Powered Mock Interview Platform
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
            fontSize: "14px",
            color: "#475569",
          }}
        >
          <span>1️⃣ Upload</span>
          <span>2️⃣ Generate</span>
          <span>3️⃣ Practice</span>
        </div>

        <div
          style={{
            border: "2px dashed #2563eb",
            borderRadius: "18px",
            padding: "35px",
            background: "#f8fafc",
            marginBottom: "25px",
            transition: "0.3s",
          }}
        >
          <p
            style={{
              marginBottom: "15px",
              color: "#334155",
              fontWeight: "bold",
            }}
          >
            Upload Your Resume (PDF)
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files?.[0] ?? null)
            }
          />

          {file && (
            <p
              style={{
                marginTop: "15px",
                color: "#2563eb",
                fontWeight: "bold",
              }}
            >
              📄 {file.name}
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            background: loading
              ? "#94a3b8"
              : "linear-gradient(90deg, #2563eb, #1d4ed8)",
            color: "white",
            border: "none",
            borderRadius: "14px",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
          }}
        >
          {loading
            ? "Generating Questions..."
            : "Start AI Interview"}
        </button>
      </div>
    </div>
  );
}