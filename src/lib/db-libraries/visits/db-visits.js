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


/**
 * Retrieves all visits from the visits table.
 * @returns {Promise<Array>} A list of visit entries ordered by timestamp in descending order.
 */
export async function getVisits() {
  try {
    const sql = `SELECT * FROM visits ORDER BY timestamp DESC;`;
    const stmt = visitsDB.prepare(sql);
    return stmt.all();
  }
  catch (dbError) {
    console.error("Failed to get visits:", dbError);
  }
}