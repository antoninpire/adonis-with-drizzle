CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);

CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);