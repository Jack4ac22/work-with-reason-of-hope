import { NextResponse } from "next/server";
import {  logError } from "@/lib/db-libraries/logs/db-logs"; 
import { logVisit } from "@/lib/db-libraries/users-library/db-visits";

export default async function middleware(req) {
  console.log("middleware is invoced!")
  try {
    // Extract visitor IP and requested path
    const visitorIP = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    const path = req.nextUrl.pathname;

    // Log the visit in visits.db
    logVisit(visitorIP, path);

    return NextResponse.next();
  } catch (error) {
    // Log error in logs.db
    logError(error);
    return NextResponse.next();
  }
}

// Apply middleware globally to all pages
export const config = {
  matcher: "/:path*",
};
