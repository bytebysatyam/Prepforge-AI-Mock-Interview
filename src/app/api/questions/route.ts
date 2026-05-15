import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST() {
  try {
    const resume = await prisma.resume.findFirst({
      orderBy: {
  id: "desc"
},
    });

    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

   const result = await model.generateContent(`
You are a senior technical interviewer at a top software product company.

Analyze the following resume carefully and generate EXACTLY 15 highly relevant interview questions.

Strict Rules:
1. Questions must be based ONLY on the projects, technologies, frameworks, tools, and skills explicitly mentioned in the resume.
2. Focus on technical depth, implementation details, architecture, debugging, optimization, scalability, and real-world development challenges.
3. Include questions about:
   - Project architecture
   - Code implementation
   - Problem-solving decisions
   - Database design
   - API handling
   - Performance optimization
   - Error handling
   - Deployment
4. At least 8 questions must directly reference specific projects from the resume.
5. Avoid generic HR questions like:
   - Tell me about yourself
   - Why should we hire you
   - What are your strengths
6. Questions should simulate real technical interview rounds for software developer roles.
7. Make the questions challenging enough for placement interviews.

Output format:
Return ONLY the 15 questions as a numbered list.
Do not include explanations, headings, notes, or extra text.

Resume:
${resume.content}
`);

    const text = result.response.text();

    const questions = text
      .split("\n")
      .filter((q) => q.trim());

    return NextResponse.json({ questions });

  } catch (error) {
    console.error("QUESTION ERROR:", error);

    return NextResponse.json(
      { error: "Question generation failed" },
      { status: 500 }
    );
  }
}