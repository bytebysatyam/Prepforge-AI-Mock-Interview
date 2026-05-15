"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginResponse = {
  message?: string;
  error?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = (await res.json()) as LoginResponse;

    if (data.message) {
      alert(data.message);
      router.push("/dashboard");
    } else {
      alert(data.error ?? "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 p-8">
        <h1 className="mb-6 text-3xl font-bold">Login</h1>

        <input
          className="mb-4 w-full rounded-lg bg-slate-800 p-3"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="mb-4 w-full rounded-lg bg-slate-800 p-3"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-cyan-500 py-3"
        >
          Login
        </button>
      </div>
    </div>
  );
}
