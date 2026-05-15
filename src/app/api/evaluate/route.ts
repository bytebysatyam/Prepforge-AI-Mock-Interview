import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const evaluationSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export async function POST(req: Request) {
  try {
    const { question, answer } = evaluationSchema.parse(await req.json());
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

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

    const scoreMatch = /Score:\s*(\d+)/i.exec(text);
    const feedbackMatch = /Feedback:\s*([\s\S]*?)(?:\nImprovement:|$)/i.exec(
      text,
    );
    const improvementMatch = /Improvement:\s*([\s\S]*)$/i.exec(text);

    return NextResponse.json({
      score: parseInt(scoreMatch?.[1] ?? "0", 10),
      feedback: feedbackMatch?.[1]?.trim() ?? "No feedback",
      improvement: improvementMatch?.[1]?.trim() ?? "No improvement suggestion",
    });
  } catch (error) {
    console.error("EVALUATION ERROR:", error);

    return NextResponse.json(
      { error: "Evaluation failed" },
      { status: 500 }
    );
  }
}
