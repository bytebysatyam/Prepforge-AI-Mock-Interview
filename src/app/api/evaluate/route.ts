import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(`
Evaluate this interview answer.

Question:
${question}

Answer:
${answer}

Return response in exactly this format:

Score: X/10
Feedback: ...
Improvement: ...
    `);

    const text = result.response.text();

    const scoreMatch = text.match(/Score:\s*(\d+)/i);
    const feedbackMatch = text.match(
      /Feedback:\s*([\s\S]*?)(?:\nImprovement:|$)/i,
    );
    const improvementMatch = text.match(/Improvement:\s*([\s\S]*)$/i);

    return NextResponse.json({
      score: parseInt(scoreMatch?.[1] ?? "0", 10),
      feedback: feedbackMatch?.[1]?.trim() || "No feedback",
      improvement: improvementMatch?.[1]?.trim() || "No improvement suggestion",
    });
  } catch (error) {
    console.error("EVALUATION ERROR:", error);

    return NextResponse.json(
      { error: "Evaluation failed" },
      { status: 500 }
    );
  }
}
