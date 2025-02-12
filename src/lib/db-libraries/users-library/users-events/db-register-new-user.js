import mainDB from "@/lib/db/usersDB";
import crypto from "crypto";

/**
 * Registers a new user in the database with verification tokens.
 * 
 * @param {Object} data - The user registration data.
 * @param {string} data.fullName - The full name of the user.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.resume - The resume or additional information about the user.
 * @param {Array<string>} data.roles - The roles requested by the user.
 * @param {boolean} data.agreement - Whether the user agreed to the terms and conditions.
 * @returns {Object} The database result along with verification tokens.
 */
export default async function registerNewUser(data) {
  const { fullName, email, resume, roles } = data;
  const isAdmin = roles.includes("admin") ? 1 : 0;
  const isEditor = roles.includes("editor") ? 1 : 0;
  const isTranslator = roles.includes("translator") ? 1 : 0;
  const isReviewer = roles.includes("proofreader") ? 1 : 0;
  const newUUID = crypto.randomUUID();
  const email_verification_token = Math.floor(Math.random() * 1000000).toString();
  const email_verification_expiry = Date.now() + 1000 * 60 * 60 * 24 * 7;
  console.log(email_verification_expiry, " - email_verification_expiry - ", typeof email_verification_expiry);
  const sql = `
    INSERT INTO Users (
      external_id, full_name, email, bio, isAdmin, isEditor, isTranslator, isProofreader, email_verification_token, email_verification_expiry
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?, ?);
  `;
  const stmt = mainDB.prepare(sql);
  const result = stmt.run(
    newUUID,
    fullName,
    email,
    resume,
    isAdmin,
    isEditor,
    isTranslator,
    isReviewer,
    email_verification_token,
    email_verification_expiry
  );
  const newUser = {
    id: result.lastInsertRowid,
    external_id: newUUID,
    full_name: fullName,
    email,
    bio: resume,
    isAdmin,
    isEditor,
    isTranslator,
    isProofreader: isReviewer,
    email_verification_token,
    email_verification_expiry,
  };
  return newUser;
}
