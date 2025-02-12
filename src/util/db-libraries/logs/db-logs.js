import mainDB from "@/util/db-libraries/users-library/usersDB";

/**
 * Logs an error message into the ErrorsLogs table.
 * @param {string} message - The error message.
 * @param {string} [stack=null] - The error stack trace (optional).
 * @returns {Promise<void>} Resolves when the log entry is inserted.
 */
export async function logError(message, stack = null, ipAddress = null) {
  try {
    const sql = `INSERT INTO ErrorsLogs (message, stack) VALUES (?, ?);`;
    const stmt = mainDB.prepare(sql);
    stmt.run(message, stack);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Retrieves all error logs from the ErrorsLogs table.
 * @returns {Promise<Array>} A list of error log entries.
 */
export async function getErrorLogs() {
  const sql = `SELECT * FROM ErrorsLogs ORDER BY created_at DESC;`;
  const stmt = mainDB.prepare(sql);
  return stmt.all();
}

/**
 * Retrieves a specific error log entry by ID.
 * @param {number} id - The ID of the error log.
 * @returns {Promise<Object|null>} The error log entry or null if not found.
 */
export async function getErrorLogById(id) {
  const sql = `SELECT * FROM ErrorsLogs WHERE id = ?;`;
  const stmt = mainDB.prepare(sql);
  return stmt.get(id);
}

/**
 * Deletes all error logs from the ErrorsLogs table.
 * @returns {Promise<void>} Resolves when all logs are deleted.
 */
export async function clearErrorLogs() {
  const sql = `DELETE FROM ErrorsLogs;`;
  const stmt = mainDB.prepare(sql);
  stmt.run();
}
