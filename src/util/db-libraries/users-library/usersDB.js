import sql from "better-sqlite3";

const mainDB = new sql("src/assets/sqlite/main.db");

function initDb() {
  console.log("initDb");

  // users table.
  mainDB.exec(`
CREATE TABLE IF NOT EXISTS Users (
  external_id TEXT,
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  password TEXT,
  first_name TEXT,
  last_name TEXT,
  phone_number TEXT,
  date_of_birth TEXT,
  role TEXT,
  profile_picture TEXT,
  last_login TIMESTAMP,
  is_active INTEGER,
  is_verified INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `);
  // questions table.
  mainDB.exec(`
CREATE TABLE IF NOT EXISTS Questions (
  id INTEGER PRIMARY KEY,
  external_id TEXT,
    category_id INTEGER,
    difficulty TEXT,
    status TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(category_id) REFERENCES Categories(external_id)
);
  `);
  // answers table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS Answers (
    external_id TEXT,
    id INTEGER PRIMARY KEY,
    question_id INTEGER,
    isCorrect INTEGER,
    status TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(question_id) REFERENCES Questions(external_id)
);`);

  // tags table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS Tags (
    id INTEGER PRIMARY KEY,
    external_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

  // categories table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS Categories (
      id INTEGER PRIMARY KEY,
      external_id TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

  // question-tag table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS QuestionTag (
    question_id INTEGER,
    external_id TEXT,
    tag_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(question_id) REFERENCES Questions(external_id),
    FOREIGN KEY(tag_id) REFERENCES Tags(external_id)
);
`);

  // question-verse table.

  mainDB.exec(`CREATE TABLE IF NOT EXISTS QuestionVerse (
    external_id TEXT,
    question_id INTEGER,
    verse_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(question_id) REFERENCES Questions(external_id),
    FOREIGN KEY(verse_id) REFERENCES Verses(external_id)
);
`);

  // changes table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS Changes (
    id INTEGER PRIMARY KEY,
    external_id TEXT,
    table_name TEXT,
    item_id INTEGER,
    field_name TEXT,
    old_value TEXT,
    new_value TEXT,
    change_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by INTEGER,
    FOREIGN KEY(changed_by) REFERENCES Users(external_id)
);
`);

  // history table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS History (
    id INTEGER PRIMARY KEY,
    external_id TEXT,
    table_name TEXT,
    item_id INTEGER,
    field_name TEXT,
    old_value TEXT,
    new_value TEXT,
    operation TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by INTEGER,
    FOREIGN KEY(changed_by) REFERENCES Users(exernal_id)
);
`);

  // reviews table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS Reviews (
    id INTEGER PRIMARY KEY,
    external_id TEXT,
    user_id INTEGER,
    translation_id INTEGER,
    rating INTEGER,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES Users(exernal_id),
    FOREIGN KEY(translation_id) REFERENCES Translations(external_id)
);
`);

  // reviews queue table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS ReviewsQueue (
    id INTEGER PRIMARY KEY,
    external_id TEXT,
    translation_id INTEGER,
    editor_id INTEGER,
    status TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(translation_id) REFERENCES Translations(external_id),
    FOREIGN KEY(editor_id) REFERENCES Users(exernal_id)
);
`);

  // translations table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS Translations (
      id INTEGER PRIMARY KEY,
      external_id TEXT,
      table_name TEXT,
      item_id INTEGER,
      field_name TEXT,
      language TEXT,
      translation TEXT,
      status TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

  // permisions table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS Permissions (
    id INTEGER PRIMARY KEY,
    external_id TEXT,
    permission TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

  // restrictions table.
  mainDB.exec(`CREATE TABLE IF NOT EXISTS Restrictions (
    id INTEGER PRIMARY KEY,
    external_id TEXT,
    restriction TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

  // mainDB.exec(`
  //   CREATE TABLE IF NOT EXISTS users (
  //     id INTEGER PRIMARY KEY,
  //     first_name TEXT,
  //     last_name TEXT,
  //     email TEXT
  //   )`);
  mainDB.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY, 
      image_url TEXT NOT NULL,
      title TEXT NOT NULL, 
      content TEXT NOT NULL, 
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER, 
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
  mainDB.exec(`
    CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER, 
      post_id INTEGER, 
      PRIMARY KEY(user_id, post_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    )`);

  // Creating two dummy users if they don't exist already
  const stmt = mainDB.prepare("SELECT COUNT(*) AS count FROM users");

  if (stmt.get().count === 0) {
    mainDB.exec(`
    INSERT INTO Users (first_name, last_name, email)
    VALUES ('John', 'Doe', 'john@example.com')
  `);

    mainDB.exec(`
    INSERT INTO users (first_name, last_name, email)
    VALUES ('Max', 'Schwarz', 'max@example.com')
  `);
  }
}

initDb();

export default mainDB;