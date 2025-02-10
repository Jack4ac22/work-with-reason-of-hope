import 'server-only';
import { cookies } from 'next/headers';
import { encodeJWT, decodeJWT } from '@/util/lib/jwt/jwt';

const COOKIE_NAME = 'session';
const COOKIE_EXPIRATION_DAYS = (process.env.JWT_EXPIRES_IN || "7d").split("d")[0];

/**
 * Creates a new session or refreshes an existing one.
 * Steps:
 * 1. Reads the previous session if it exists and decodes the JWT token.
 * 2. If the session is invalid, deletes the session and creates a new one.
 * 3. If no session exists, creates a new session.
 * 
 * @param {Object} payload - The data to store in the session.
 * @returns {string} The newly created session token.
 */
export async function createSession(payload = {}) {
  const expiresAt = new Date(Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);
  const sessionToken = encodeJWT({ ...payload, expiresAt });
  const cookieStore = cookies();

  cookieStore.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || process.env.WORKING_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
  return sessionToken;
}

/**
 * Updates the session with new data.
 * 
 * @param {Object} new_payload - The updated data for the session.
 * @returns {string} The updated session token.
 */
export async function updateSession(new_payload = {}) {
  const currentSession = await getSession();
  const updatedSession = { ...currentSession, ...new_payload };
  return await createSession(updatedSession);
}

/**
 * Retrieves the session data.
 * 
 * @param {string|null} key - A specific key to retrieve from the session.
 * @returns {Object|string|null} The session data or a specific key value.
 */
export async function getSession(key = null) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  const decoded = decodeJWT(sessionToken);
  if (!decoded || new Date(decoded.expiresAt) < new Date()) {
    await deleteSession();
    return null;
  }

  return key ? decoded[key] : decoded;
}

/**
 * Deletes the session.
 * 
 * @param {string|null} key - A specific key to remove from the session, or delete the session entirely.
 */
export async function deleteSession(key = null) {
  const cookieStore = cookies();
  if (key) {
    const sessionData = await getSession();
    if (sessionData && key in sessionData) {
      delete sessionData[key];
      await createSession(sessionData);
    }
  } else {
    cookieStore.delete(COOKIE_NAME);
  }
}
