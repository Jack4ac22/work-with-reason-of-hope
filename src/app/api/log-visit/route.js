import { registerVisit } from '@/lib/db-libraries/visits/db-visits';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const visitorIP = req.headers.get("X-Visitor-IP") || "unknown";
  const path = req.headers.get("X-Path") || "unknown";
  const method = req.headers.get("X-Method") || "unknown";
  const userAgent = req.headers.get("X-User-Agent") || "unknown";
  const referer = req.headers.get("X-Referer") || "direct";
  try {
    await registerVisit(visitorIP, path, method, userAgent, referer);
    return NextResponse.json({ message: "Visit logged successfully" });
  }
  catch (error) {
    console.error("Failed to log visit:", error);
    return NextResponse.json({ error: "Failed to log visit" }, { status: 500 });
  }

}
