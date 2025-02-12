import logsDB from "@/lib/db/logsDB";

/**
 * Logs an error in logs.db
 * @param {Error} error - The error object.
 */
export async function logError(error) {
  try {
    const stmt = logsDB.prepare(`
      INSERT INTO logs (error_message, stack_trace) VALUES (?, ?);
    `);
    stmt.run(error.message, error.stack || "No stack trace");
  } catch (dbError) {
    console.error("Failed to log error:", dbError);
  }
}

/**
 * Retrieves all error logs from the logs table.
 * @returns {Promise<Array>} A list of error log entries.
 */
export async function getErrorLogs() {
  try {
    const sql = `SELECT * FROM logs ORDER BY created_at DESC;`;
    const stmt = logsDB.prepare(sql);
    return stmt.all();
  }
  catch (dbError) {
    console.error("Failed to get error logs:", dbError);
  }
}

/**
 * Retrieves a specific error log entry by ID.
 * @param {number} id - The ID of the error log.
 * @returns {Promise<Object|null>} The error log entry or null if not found.
 */
export async function getErrorLogById(id) {
  try {
    const sql = `SELECT * FROM logs WHERE id = ?;`;
    const stmt = logsDB.prepare(sql);
    return stmt.get(id);
  }
  catch (dbError) {
    console.error("Failed to get error log by ID:", dbError);
  }
}

/**
 * Deletes all error logs from the logs table.
 * @returns {Promise<void>} Resolves when all logs are deleted.
 */
export async function clearErrorLogs() {
  try {
    const sql = `DELETE FROM logs;`;
    const stmt = logsDB.prepare(sql);
    stmt.run();
  } catch (dbError) {
    console.error("Failed to clear error logs:", dbError);
  }
}
