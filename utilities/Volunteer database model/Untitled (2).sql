CREATE TABLE `orders` 
(
	`id` int,
	`user_id` int,
	`status` varchar(255),
	`created_at` varchar(255)
);

CREATE TABLE `order_items` 
(
	`order_id` int,
	`product_id` int,
	`quantity` int
);

CREATE TABLE `orderMore` 
(
	`id` int
);

CREATE TABLE `products` 
(
	`id` int,
	`name` varchar(255),
	`merchant_id` int,
	`price` int,
	`status` varchar(255),
	`created_at` varchar(255)
);

CREATE TABLE `users` 
(
	`id` int,
	`full_name` varchar(255),
	`email` varchar(255),
	`gender` varchar(255),
	`date_of_birth` varchar(255),
	`created_at` varchar(255),
	`country_code` int
);

CREATE TABLE `merchants` 
(
	`id` int,
	`merchant_name` varchar(255),
	`country_code` int,
	`created_at` varchar(255),
	`admin_id` int
);

CREATE TABLE `countries` 
(
	`code` int,
	`name` varchar(255),
	`continent_name` varchar(255)
);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`country_code`) REFERENCES `countries` (`code`);

ALTER TABLE `merchants` ADD FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`);

ALTER TABLE `merchants` ADD FOREIGN KEY (`country_code`) REFERENCES `countries` (`code`);
