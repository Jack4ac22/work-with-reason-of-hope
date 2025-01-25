import sql from "better-sqlite3";

// get the envicoment variables from the .env file
const enviroment = process.env.NODE_ENV || process.env.WORKING_ENV || "development";
const dbPath = enviroment === "development" ? "src/assets/sqlite/development/main.db" : "src/assets/sqlite/main.db";
const mainDB = new sql(dbPath);

function initDb() {
  // users table.
  mainDB.exec(`
CREATE TABLE IF NOT EXISTS Users (
  external_id TEXT,
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE COLLATE NOCASE DEFAULT NULL,
  email TEXT UNIQUE COLLATE NOCASE,
  password TEXT ,
  full_name TEXT,
  phone_number TEXT UNIQUE DEFAULT NULL COLLATE NOCASE,
  date_of_birth TEXT DEFAULT NULL,
  isSuperAdmin INTEGER default 0,
  isAdmin INTEGER default 0,
  isEditor INTEGER default 0,
  isTranslator INTEGER default 0,
  isReviewer INTEGER default 0,
  profile_picture TEXT DEFAULT NULL,
  last_login TIMESTAMP DEFAULT NULL,
  is_active INTEGER default 0,
  is_verified INTEGER default 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  two_factor_enabled INTEGER default 0,
  two_factor_secret TEXT default NULL,
  password_reset_token TEXT default NULL,
  password_reset_expiry TIMESTAMP default NULL,
  country TEXT default NULL,
  state TEXT default NULL,
  city TEXT default NULL,
  postal_code TEXT default NULL,
  address TEXT default NULL,
  language_preference TEXT default NULL,
  timezone TEXT default NULL,
  notification_preferences TEXT default NULL,
  last_password_change TIMESTAMP default NULL,
  failed_login_attempts INTEGER default 0,
  account_locked_until TIMESTAMP default NULL,
  last_activity TIMESTAMP default CURRENT_TIMESTAMP,
  email_verification_token TEXT default NULL,
  email_verification_expiry TIMESTAMP default NULL,
  phone_number_verified INTEGER default 0,
  bio TEXT default NULL,
  website_url TEXT default NULL,
  custom_attributes TEXT default NULL,
  is_deleted INTEGER default 0,
  deleted_at TIMESTAMP default NULL,
  deleted_by INTEGER default NULL
);
`);

  // Creating two dummy users if they don't exist already
  const stmt = mainDB.prepare("SELECT COUNT(*) AS count FROM users");

  if (stmt.get().count === 0) {
    mainDB.exec(`
    INSERT INTO Users (full_name, email)
    VALUES ('John Doe', 'john@example.com')
  `);

    mainDB.exec(`
    INSERT INTO users (full_name, email)
    VALUES ('Max Schwarz', 'max@example.com')
  `);
  }
}

initDb();

export default mainDB;