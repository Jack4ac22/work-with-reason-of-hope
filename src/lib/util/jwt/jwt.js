import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "test";

/**
 * Generate a JWT token
 * @param {Object} payload - Data to be stored in the token
 * @param {string} expiresIn - Expiration time (default: 7d)
 * @returns {string} Signed JWT token
 */
export function encodeJWT(payload, expiresIn = process.env.JWT_EXPIRES_IN || "7d") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded payload or null if invalid
 */
export function decodeJWT(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Invalid JWT:", error.message);
    return null;
  }
}

export default { encodeJWT, decodeJWT };