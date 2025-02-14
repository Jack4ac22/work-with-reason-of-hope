import sql from "better-sqlite3";
import path from "path";
import { baseDir } from "@/lib/db/db-helper";
console.log("baseDir: ", baseDir);
const dbPath = path.join(baseDir, "visits.db");
const visitsDB = new sql(dbPath);
async function initDb() {
  // Create tables if they don't exist
  visitsDB.exec(`
    CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_ip TEXT NOT NULL,
    path TEXT NOT NULL,
    method TEXT NOT NULL,
    user_agent TEXT,
    referer TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
      `);
}
initDb();

export default visitsDB;
