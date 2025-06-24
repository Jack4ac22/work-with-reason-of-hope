/**
 * db.ts
 *
 * This module initializes the Drizzle ORM instance with a MySQL database connection.
 * It creates and exports a configured Drizzle client that can be used throughout the app
 * to interact with the database using the defined schema.
 *
 * Usage:
 *   Import the `db` object anywhere you need to perform database queries:
 *     import { db } from "@/drizzle/db"
 *
 * The Drizzle client is configured with the full schema to enable type-safe queries.
 */

import { env } from "@/data/env/server"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "@/drizzle/schema"

export const db = drizzle(env.DATABASE_URL, { schema })