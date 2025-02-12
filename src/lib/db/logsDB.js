import sql from "better-sqlite3";

const enviroment = process.env.NODE_ENV || process.env.WORKING_ENV || "development";
const dbPath = enviroment === "development" ? "src/assets/sqlite/development/logs.db" : "src/assets/sqlite/logs.db";
// Initialize separate databases
const logsDB = new sql(dbPath);
async function initDb() {
  logsDB.exec(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
}
initDb();

export default logsDB;