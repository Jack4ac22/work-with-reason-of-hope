// src/drizzle/schema/userNotificationSettings.ts

// import { boolean, pgTable, varchar, uuid } from "drizzle-orm/pg-core"
// import { createdAt, updatedAt } from "@/drizzle/schemaHelpers"
// import { UserTable } from "@/drizzle/schema/user"
// import { relations } from "drizzle-orm"

// export const UserNotificationSettingsTable = pgTable(
//   "user_notification_settings",
//   {
//     userId: uuid().references(() => UserTable.id),
//     newJobEmailNotifications: boolean().notNull().default(false),
//     aiPrompt: varchar(),
//     createdAt,
//     updatedAt,
//   }
// )

// export const userNotificationSettingsRelations = relations(
//   UserNotificationSettingsTable,
//   ({ one }) => ({
//     user: one(UserTable, {
//       fields: [UserNotificationSettingsTable.userId],
//       references: [UserTable.id],
//     }),
//   })
// )


import { mysqlTable, varchar, boolean } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "@/drizzle/schemaHelpers";
import { UserTable } from "@/drizzle/schema/user";

export const UserNotificationSettingsTable = mysqlTable(
  "user_notification_settings",
  {
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => UserTable.id),
    newJobEmailNotifications: boolean("new_job_email_notifications")
      .notNull()
      .default(false),
    aiPrompt: varchar("ai_prompt", { length: 255 }),
    createdAt,
    updatedAt,
  },
);

export const userNotificationSettingsRelations = relations(
  UserNotificationSettingsTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserNotificationSettingsTable.userId],
      references: [UserTable.id],
    }),
  }),
);
