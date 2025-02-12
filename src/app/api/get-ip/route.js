export async function GET(req) {
  // Get the forwarded IP from headers (Vercel & proxies)
  const forwardedFor = req.headers.get("x-forwarded-for") || "Unknown";
  // Get the detected IP (may be a proxy IP)
  const ip = req.ip || "Unknown";

  return Response.json({ ip, forwardedFor, req });
}
