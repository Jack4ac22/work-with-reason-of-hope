import mainDB from "@/util/db-libraries/users-library/usersDB";
import crypto from "crypto";

export default async function registerNewUser(data) {
  const { fullName, email, resume, roles } = data;

  // Map roles to database schema fields
  const isAdmin = roles.includes("admin") ? 1 : 0;
  const isEditor = roles.includes("editor") ? 1 : 0;
  const isTranslator = roles.includes("translator") ? 1 : 0;
  const isReviewer = roles.includes("proofreader") ? 1 : 0;
  const newUUID = crypto.randomUUID();
  // email_verification_token: generate a random token of 6 digits: 66ea603032 not suitable
  const email_verification_token = Math.floor(Math.random() * 1000000).toString();

  // TIMESTAMP for the email_verification_expiry with 7days 
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

  return result;
}
