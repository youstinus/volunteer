CREATE TABLE `Organizations` 
(
	`Id` int,
	`Title` varchar(255),
	`Description` varchar(255),
	`WebsiteUrl` varchar(255)
);

CREATE TABLE `Volunteers` 
(
	`Id` int,
	`FirstName` varchar(255),
	`LastName` varchar(255),
	`Description` varchar(255),
	`Picture_Id` int,
	`quantity` int
);

CREATE TABLE `Pictures` 
(
	`Id` int,
	`Title` varchar(255),
	`Url` varchar(255),
	`Project_Id` int,
	`Organization_Id` int,
	`Volunteer_Id` int
);

CREATE TABLE `Projects` 
(
	`Id` int,
	`Title` varchar(255),
	`Description` varchar(255),
	`Email` varchar(255),
	`Phone` varchar(255),
	`WebsiteUrl` varchar(255),
	`Start` datetime,
	`End` datetime,
	`Organization_Id` int
);

CREATE TABLE `Users` 
(
	`Id` int,
	`Username` varchar(255),
	`Role` varchar(255),
	`PasswordHash` varbinary,
	`PasswordSalt` varbinary
);

CREATE TABLE `ProjectVolunteers` 
(
	`Id` int,
	`Project_Id` int,
	`Volunteer_Id` int
);

ALTER TABLE `Volunteers` ADD FOREIGN KEY (`Picture_Id`) REFERENCES `Pictures` (`Id`);

ALTER TABLE `ProjectVolunteers` ADD FOREIGN KEY (`Project_Id`) REFERENCES `Projects` (`Id`);

ALTER TABLE `ProjectVolunteers` ADD FOREIGN KEY (`Volunteer_Id`) REFERENCES `Volunteers` (`Id`);

ALTER TABLE `Pictures` ADD FOREIGN KEY (`Project_Id`) REFERENCES `Projects` (`Id`);

ALTER TABLE `Pictures` ADD FOREIGN KEY (`Organization_Id`) REFERENCES `Organizations` (`Id`);

ALTER TABLE `Pictures` ADD FOREIGN KEY (`Volunteer_Id`) REFERENCES `Volunteers` (`Id`);

ALTER TABLE `Projects` ADD FOREIGN KEY (`Organization_Id`) REFERENCES `Organizations` (`Id`);
