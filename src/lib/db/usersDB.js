import sql from "better-sqlite3";

// get the envicoment variables from the .env file
const enviroment = process.env.NODE_ENV || process.env.WORKING_ENV || "development";
const dbPath = enviroment === "development" ? "src/assets/sqlite/development/main.db" : "src/assets/sqlite/main.db";
const mainDB = new sql(dbPath);

function initDb() {
  mainDB.exec(`
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_id TEXT UNIQUE,
  username TEXT UNIQUE COLLATE NOCASE DEFAULT NULL,
  full_name TEXT DEFAULT NULL COLLATE NOCASE,
  email TEXT UNIQUE COLLATE NOCASE,
  password TEXT,

  phone_number TEXT UNIQUE DEFAULT NULL COLLATE NOCASE,
  date_of_birth TEXT DEFAULT NULL,

  isSuperAdmin INTEGER default 0,
  isAdmin INTEGER default 0,
  isEditor INTEGER default 0,
  isTranslator INTEGER default 0,
  isProofreader INTEGER default 0,

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
  mainDB.exec(`
CREATE TRIGGER IF NOT EXISTS log_user_changes
AFTER UPDATE ON Users
FOR EACH ROW

BEGIN
  UPDATE Users
  SET last_activity = CURRENT_TIMESTAMP
  WHERE id = NEW.id;

  UPDATE Users
  SET updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.id;
END;
`);

  mainDB.exec(`
CREATE TABLE IF NOT EXISTS UserSessions (
  id TEXT PRIMARY KEY ,
  user_id INTEGER,
  session_id TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

  mainDB.exec(`
  CREATE TABLE IF NOT EXISTS ErrorsLogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    stack TEXT default NULL,
    ip_address TEXT default NULL COLLATE NOCASE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);
}

initDb();

export default mainDB;