import { NextResponse } from "next/server";

const sessions = new Map(); // In-memory store for demo purposes

export async function POST(request: Request) {
  const sessionId = Date.now().toString(); // Generate a unique session ID
  sessions.set(sessionId, { participants: [], nominations: {} });

  return NextResponse.json({ sessionId });
}
