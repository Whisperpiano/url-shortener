CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT lower(hex(randomblob(16))) NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
DROP TABLE `foo`;