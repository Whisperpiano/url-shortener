import { sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey().notNull(),
  limit: integer("limit").notNull().default(20),
});
