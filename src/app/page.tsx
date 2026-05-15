import Link from "next/link";

const features = [
  {
    title: "AI Resume Analysis",
    desc: "Upload your resume and identify improvement areas.",
  },
  {
    title: "Mock Interviews",
    desc: "Practice real-world technical interviews.",
  },
  {
    title: "Performance Analytics",
    desc: "Track your interview growth with score insights.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="px-6 py-24 text-center">
        <h1 className="text-6xl font-bold">
          Prep<span className="text-cyan-400">Forge</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Your AI interview preparation partner.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/register"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-slate-600 px-6 py-3"
          >
            Login
          </Link>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-700 p-6"
            >
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="mt-3 text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}