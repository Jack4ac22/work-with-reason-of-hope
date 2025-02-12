import sql from "better-sqlite3";

const enviroment = process.env.WORKING_ENV || process.env.NODE_ENV || "development";
const dbPath = enviroment === "development" ? "src/assets/sqlite/development/logs.db" : "logs.db";
console.log(process.env.NODE_ENV + " " + process.env.WORKING_ENV);

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