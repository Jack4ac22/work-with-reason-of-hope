import mainDB from "@/util/db-libraries/users-library/usersDB";

export default async function createUser(data) {
  const { name, email, title, message } = data;
  const sql = `
  INSERT INTO Users (name, email, title, message)
  VALUES (?, ?, ?, ?);
  `;
  const stmt = mainDB.prepare(sql);
  const result = stmt.run(name, email, title, message);
  return result;
}