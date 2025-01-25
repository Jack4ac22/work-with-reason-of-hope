import mainDB from "@/util/db-libraries/users-library/usersDB";

export default async function registerNewUser(data) {
  const { fullName, email, resume, roles } = data;

  // Map roles to database schema fields
  const isAdmin = roles.includes("admin") ? 1 : 0;
  const isEditor = roles.includes("editor") ? 1 : 0;
  const isTranslator = roles.includes("translator") ? 1 : 0;
  const isReviewer = roles.includes("proofreader") ? 1 : 0;

  const sql = `
    INSERT INTO Users (
      full_name, email, bio, isAdmin, isEditor, isTranslator, isReviewer
    )
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  const stmt = mainDB.prepare(sql);
  const result = stmt.run(
    fullName,
    email,
    resume,
    isAdmin,
    isEditor,
    isTranslator,
    isReviewer
  );

  return result;
}
