import bcrypt from "bcryptjs";

/**
 * Hashes a password securely using bcrypt.
 * @param {string} password - The plaintext password to hash.
 * @returns {Promise<string>} The hashed password.
 */
export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

/**
 * Compares a plaintext password with a hashed password to check validity.
 * @param {string} password - The plaintext password.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} True if passwords match, otherwise false.
 */
export async function comparePassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
