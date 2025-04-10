import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { links } from "./links";

export const clicks = sqliteTable("click", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  linkId: text("linkId")
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),
  timestamp: integer("timestamp", { mode: "timestamp_ms" }).$defaultFn(
    () => new Date()
  ),
  ip: text("ip"),

  country: text("country"),
  region: text("region"),
  city: text("city"),
  countryCode: text("countryCode"),

  deviceType: text("deviceType"),
  browser: text("browser"),
  os: text("os"),
});
