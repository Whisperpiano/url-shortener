CREATE TABLE `click` (
	`id` text PRIMARY KEY NOT NULL,
	`linkId` text NOT NULL,
	`timestamp` integer,
	`ip` text,
	`country` text,
	`region` text,
	`city` text,
	`deviceType` text,
	`browser` text,
	`os` text,
	FOREIGN KEY (`linkId`) REFERENCES `link`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `link` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`originalUrl` text NOT NULL,
	`shortUrl` text NOT NULL,
	`description` text,
	`createdAt` integer,
	`clickCount` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `link_shortUrl_unique` ON `link` (`shortUrl`);