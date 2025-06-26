// src/drizzle/schema/user.ts

import { pgTable, varchar } from "drizzle-orm/pg-core"
import { createdAt, updatedAt } from "../schemaHelpers"
import { relations } from "drizzle-orm"
import { UserNotificationSettingsTable } from "@/drizzle/schema/userNotificationSettings"

export const UserTable = pgTable("users", {
  id: varchar().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt,
  updatedAt,
});


export const userRelations = relations(UserTable, ({ one }) => ({
  notificationSettings: one(UserNotificationSettingsTable),
}))




// src/drizzle/schema/user.ts  ✨ MySQL version
// import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
// import { relations } from "drizzle-orm";
// import { createdAt, updatedAt } from "../schemaHelpers";
// import { UserNotificationSettingsTable } from "@/drizzle/schema/userNotificationSettings";

// const id = varchar("id", { length: 36 }).primaryKey();

// export const UserTable = mysqlTable("users", {
//   id,
//   name: varchar("name", { length: 255 }).notNull(),
//   imageUrl: varchar("image_url", { length: 255 }).notNull(),
//   email: varchar("email", { length: 255 }).notNull().unique(),
//   createdAt,
//   updatedAt,
// });


// export const userRelations = relations(UserTable, ({ one }) => ({
//   notificationSettings: one(UserNotificationSettingsTable),
// }));
