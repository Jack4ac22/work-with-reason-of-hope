import { NextResponse } from "next/server";
import { getVisits } from "@/lib/db-libraries/visits/db-visits";
export async function GET(req) {
  try {
    const visits = await getVisits();
    return NextResponse.json(visits);
  }
  catch (error) {
    console.error("Failed to get visits:", error);
    return NextResponse.json({ error: "Failed to get visits" }, { status: 500 });
  }
}