import mainDB from "@/util/db-libraries/users-library/usersDB";

export default async function findUserByfield(field, value) {
  const sql = `
    SELECT *
    FROM Users
    WHERE ${field} = ?
    `
  const stmt = mainDB.prepare(sql);
  const result = stmt.get(value);
  return result;
}
