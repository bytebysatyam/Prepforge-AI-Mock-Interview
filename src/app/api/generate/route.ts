import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import Groq from "groq-sdk";

const prisma = new PrismaClient();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST() {
  try {
    const resume = await prisma.resume.findFirst({
      orderBy: { id: "desc" },
    });

    if (!resume) {
      return NextResponse.json(
        { error: "No resume found" },
        { status: 404 }
      );
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Generate 6 personalized technical mock interview questions based on the resume."
        },
        {
          role: "user",
          content: resume.content
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const output = completion.choices[0]?.message?.content || "";

    const questions = output
      .split("\n")
      .filter((q) => q.trim() !== "");

    return NextResponse.json({ questions });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
      error: error.message
    }, { status: 500 });
  }
}
