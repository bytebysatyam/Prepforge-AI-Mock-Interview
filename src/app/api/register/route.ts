import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();
const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const { name, email, password } = registerSchema.parse(await req.json());

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
