import visitsDB from "@/lib/db/visitsDB";
import { logError } from "@/lib/db-libraries/logs/db-logs";

/**
 * Logs a visit in visits.db
 * @param {string} ip - Visitor's IP address.
 * @param {string} path - Requested path.
 * @param {string} method - Request method.
 * @param {string} userAgent - User agent.
 * @param {string} referer - Referrer URL.
 */
export async function registerVisit(ip, path, method, userAgent, referer) {
  try {
    const stmt = visitsDB.prepare(`
      INSERT INTO visits (visitor_ip, path, method, user_agent, referer, timestamp)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP);
      `);
    stmt.run(ip, path, method, userAgent, referer);
  } catch (error) {
    logError(error);
  }
}