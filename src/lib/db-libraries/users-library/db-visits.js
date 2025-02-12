import visitsDB from "@/lib/db/visitsDB";

/**
 * Logs a visit in visits.db
 * @param {string} ip - Visitor's IP address.
 * @param {string} path - Requested path.
 */
export async function logVisit(ip, path) {
  try {
    const stmt = visitsDB.prepare(`
      INSERT INTO visits (visitor_ip, path) VALUES (?, ?);
    `);
    stmt.run(ip, path);
  } catch (error) {
    logError(error);
  }
}