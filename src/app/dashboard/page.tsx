import Link from "next/link";

export default function DashboardPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "50px",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        PrepForge Dashboard
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
          marginTop: "10px",
        }}
      >
        AI-powered technical interview preparation
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          marginTop: "60px",
        }}
      >
        <Link
          href="/upload"
          style={cardStyle}
        >
          📄 Resume Upload
          <p>Upload your resume for AI analysis</p>
        </Link>

        <Link
          href="/interview"
          style={cardStyle}
        >
          🎤 Mock Interview
          <p>Attempt personalized interview questions</p>
        </Link>

        <Link
          href="/results"
          style={cardStyle}
        >
          📊 Analytics
          <p>Track performance and improvement</p>
        </Link>
      </div>
    </main>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: "30px",
  borderRadius: "18px",
  textDecoration: "none",
  color: "white",
  fontSize: "22px",
  fontWeight: "bold",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
};