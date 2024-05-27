require('@/util/libraries/translation-app-library/verses.js');
import sql from "better-sqlite3";

const db = new sql("local.db");

function initDb() {
  console.log("initDb");

  // users table.
  db.exec(`
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
  db.exec(`
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
  db.exec(`CREATE TABLE IF NOT EXISTS Answers (
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
  db.exec(`CREATE TABLE IF NOT EXISTS Tags (
    id INTEGER PRIMARY KEY,
    external_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

  // categories table.
  db.exec(`CREATE TABLE IF NOT EXISTS Categories (
      id INTEGER PRIMARY KEY,
      external_id TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

  // question-tag table.
  db.exec(`CREATE TABLE IF NOT EXISTS QuestionTag (
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

  db.exec(`CREATE TABLE IF NOT EXISTS QuestionVerse (
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
  db.exec(`CREATE TABLE IF NOT EXISTS Changes (
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
  db.exec(`CREATE TABLE IF NOT EXISTS History (
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
  db.exec(`CREATE TABLE IF NOT EXISTS Reviews (
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
  db.exec(`CREATE TABLE IF NOT EXISTS ReviewsQueue (
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
  db.exec(`CREATE TABLE IF NOT EXISTS Translations (
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
  db.exec(`CREATE TABLE IF NOT EXISTS Permissions (
    id INTEGER PRIMARY KEY,
    external_id TEXT,
    permission TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

  // restrictions table.
  db.exec(`CREATE TABLE IF NOT EXISTS Restrictions (
    id INTEGER PRIMARY KEY,
    external_id TEXT,
    restriction TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

  // db.exec(`
  //   CREATE TABLE IF NOT EXISTS users (
  //     id INTEGER PRIMARY KEY,
  //     first_name TEXT,
  //     last_name TEXT,
  //     email TEXT
  //   )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY, 
      image_url TEXT NOT NULL,
      title TEXT NOT NULL, 
      content TEXT NOT NULL, 
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER, 
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
  db.exec(`
    CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER, 
      post_id INTEGER, 
      PRIMARY KEY(user_id, post_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
      FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    )`);

  // Creating two dummy users if they don't exist already
  const stmt = db.prepare("SELECT COUNT(*) AS count FROM users");

  if (stmt.get().count === 0) {
    db.exec(`
    INSERT INTO Users (first_name, last_name, email)
    VALUES ('John', 'Doe', 'john@example.com')
  `);

    db.exec(`
    INSERT INTO users (first_name, last_name, email)
    VALUES ('Max', 'Schwarz', 'max@example.com')
  `);
  }
}

initDb();

export async function getPosts(maxNumber) {
  let limitClause = "";

  if (maxNumber) {
    limitClause = "LIMIT ?";
  }

  const stmt = db.prepare(`
    SELECT posts.id, image_url AS image, title, content, created_at AS createdAt, first_name AS userFirstName, last_name AS userLastName, COUNT(likes.post_id) AS likes, EXISTS(SELECT * FROM likes WHERE likes.post_id = posts.id and likes.user_id = 2) AS isLiked
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    GROUP BY posts.id
    ORDER BY createdAt DESC
    ${limitClause}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return maxNumber ? stmt.all(maxNumber) : stmt.all();
}

export async function storePost(post) {
  const stmt = db.prepare(`
    INSERT INTO posts (image_url, title, content, user_id)
    VALUES (?, ?, ?, ?)`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return stmt.run(post.imageUrl, post.title, post.content, post.userId);
}

export async function updatePostLikeStatus(postId, userId) {
  const stmt = db.prepare(`
    SELECT COUNT(*) AS count
    FROM likes
    WHERE user_id = ? AND post_id = ?`);

  const isLiked = stmt.get(userId, postId).count === 0;

  if (isLiked) {
    const stmt = db.prepare(`
      INSERT INTO likes (user_id, post_id)
      VALUES (?, ?)`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return stmt.run(userId, postId);
  } else {
    const stmt = db.prepare(`
      DELETE FROM likes
      WHERE user_id = ? AND post_id = ?`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return stmt.run(userId, postId);
  }
}
