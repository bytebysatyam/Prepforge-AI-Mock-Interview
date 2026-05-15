import { NextResponse } from "next/server";

const notConfigured = async () =>
  NextResponse.json(
    { error: "NextAuth is not configured for this project." },
    { status: 501 },
  );

const auth = async () => null;

const handlers = {
  GET: notConfigured,
  POST: notConfigured,
};

const signIn = async () => {
  throw new Error("NextAuth sign-in is not configured.");
};

const signOut = async () => {
  throw new Error("NextAuth sign-out is not configured.");
};

export { auth, handlers, signIn, signOut };
