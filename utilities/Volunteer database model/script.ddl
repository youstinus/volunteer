CREATE TABLE User
(
	Id int NOT NULL AUTO_INCREMENT,
	Username varchar (255),
	Role int,
	Hash blob,
	Salt blob,
	Email varchar (255),
	Created date,
	PRIMARY KEY(Id)
);

CREATE TABLE Organization
(
	Id int NOT NULL AUTO_INCREMENT,
	Title varchar (255),
	Description varchar (255),
	WebsiteUrl varchar (255),
	fk_UserId int NOT NULL,
	PRIMARY KEY(Id),
	UNIQUE(fk_UserId),
	FOREIGN KEY(fk_UserId) REFERENCES User (Id)
);

CREATE TABLE Volunteer
(
	Id int NOT NULL AUTO_INCREMENT,
	FirstName varchar (255),
	LastName varchar (255),
	Description varchar (255),
	fk_UserId int NOT NULL,
	PRIMARY KEY(Id),
	UNIQUE(fk_UserId),
	FOREIGN KEY(fk_UserId) REFERENCES User (Id)
);

CREATE TABLE Project
(
	Id int NOT NULL AUTO_INCREMENT,
	Title varchar (255),
	Description varchar (255),
	Email varchar (255),
	Phone varchar (255),
	Url varchar (255),
	Start date,
	End date,
	fk_OrganizationId int NOT NULL,
	PRIMARY KEY(Id),
	FOREIGN KEY(fk_OrganizationId) REFERENCES Organization (Id)
);

CREATE TABLE Review
(
	Id int NOT NULL AUTO_INCREMENT,
	Title varchar (255),
	Grade int,
	Text varchar (255),
	Created date,
	fk_OrganizationId int NOT NULL,
	PRIMARY KEY(Id),
	FOREIGN KEY(fk_OrganizationId) REFERENCES Organization (Id)
);

CREATE TABLE Picture
(
	Id int NOT NULL AUTO_INCREMENT,
	Title varchar (255),
	Url varchar (255),
	fk_ProjectId int,
	fk_VolunteerId int,
	fk_OrganizationId int,
	PRIMARY KEY(Id),
	FOREIGN KEY(fk_ProjectId) REFERENCES Project (Id),
	FOREIGN KEY(fk_VolunteerId) REFERENCES Volunteer (Id),
	FOREIGN KEY(fk_OrganizationId) REFERENCES Organization (Id)
);

CREATE TABLE Project_Volunteer
(
	fk_ProjectId int,
	fk_VolunteerId int,
	PRIMARY KEY(fk_ProjectId, fk_VolunteerId),
	FOREIGN KEY(fk_ProjectId) REFERENCES Project (Id),
	FOREIGN KEY(fk_VolunteerId) REFERENCES Volunteer (Id)
);
