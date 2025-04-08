import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const links = sqliteTable("link", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  originalUrl: text("originalUrl").notNull(),
  shortUrl: text("shortUrl").notNull().unique(),
  description: text("description"),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
  clickCount: integer("clickCount").notNull().default(0),
});
