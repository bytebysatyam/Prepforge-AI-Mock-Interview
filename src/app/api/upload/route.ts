import { NextResponse } from "next/server";
import PDFParser from "pdf2json";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const pdfParser = new PDFParser();

    const text = await new Promise<string>((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", reject);

      pdfParser.on("pdfParser_dataReady", () => {
        const content = pdfParser.getRawTextContent();
        resolve(content);
      });

      pdfParser.parseBuffer(buffer);
    });
    console.log("RESUME TEXT:", text);

    await prisma.resume.create({
  data: {
    content: text,
    userId: "demo-user",
  },
});

    return NextResponse.json({
      message: "Resume uploaded successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}