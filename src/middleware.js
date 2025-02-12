import { NextResponse } from "next/server";

export default function middleware(req) {
  try {
    const visitorIP = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    const path = req.nextUrl.pathname;
    const method = req.method;
    const userAgent = req.headers.get("user-agent") || "unknown";
    const referer = req.headers.get("referer") || "direct";
    const res = NextResponse.next();
    res.headers.set("X-Visitor-IP", visitorIP);
    res.headers.set("X-Path", path);
    res.headers.set("X-Method", method);
    res.headers.set("X-User-Agent", userAgent);
    res.headers.set("X-Referer", referer);
    return res;
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.next();
  }
}


// Apply middleware globally to all pages except the api
export const config = {
  matcher: "/((?!api).*)",
};
