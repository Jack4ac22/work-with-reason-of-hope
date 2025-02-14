import sql from "better-sqlite3";
import path from "path";
import { baseDir } from "@/lib/db/db-helper";
const dbPath = path.join(baseDir, "logs.db");

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