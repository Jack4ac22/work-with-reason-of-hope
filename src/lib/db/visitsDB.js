import sql from "better-sqlite3";

const enviroment = process.env.NODE_ENV || process.env.WORKING_ENV || "development";
const srcFolderPath = process.cwd();
const dbPath = enviroment === "development" ? "/src/assets/sqlite/development/visits.db" : "/src/assets/sqlite/visits.db";
// Initialize separate databases

const visitsDB = new sql(srcFolderPath + dbPath);
async function initDb() {
console.log(srcFolderPath + dbPath);
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
