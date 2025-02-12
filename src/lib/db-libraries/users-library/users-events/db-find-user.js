import mainDB from "@/lib/db/usersDB";

const allowedFields = ["id", "external_id", "email", "username", "full_name"];


export default async function findUserByfield(field, value) {
  if (!allowedFields.includes(field)) {
    throw new Error("Invalid field name");
  }
  if (!value) {
    throw new Error("Value is required");
  }
  const sql = `
    SELECT *
    FROM Users
    WHERE ${field} = ?
    `
  const stmt = mainDB.prepare(sql);
  const result = stmt.get(value);
  return result;
}
