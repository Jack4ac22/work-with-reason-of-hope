'use server';

export async function logVisit({ visitorIP, path, method, userAgent, referer }) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000/";
  fetch(`${baseURL}/api/log-visit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorIP, path, method, userAgent, referer }),
  }).catch((err) => console.error("Logging failed:", err));
}