'use server';
import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "@/lib/db";
import { cookies } from "next/headers";

// Define collections for users and sessions
const userCollection = mongoose.connection.collection("users");
const sessionCollection = mongoose.connection.collection("sessions");

// Setup Lucia with MongoDB
const adapter = new MongodbAdapter(userCollection, sessionCollection);

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

// Create a session for the authenticated user
export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

// Verify authentication session
export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }
  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }
  try {
    const result = await lucia.validateSession(sessionId);
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    return result;
  } catch (error) {
    console.error("Session validation error:", error);
    return { user: null, session: null };
  }
}

// Destroy user session
export async function destroySession() {
  const { session } = await verifyAuth();
  if (!session) {
    return { error: "Unauthorized" };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
