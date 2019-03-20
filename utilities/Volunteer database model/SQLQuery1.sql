DROP TABLE IF EXISTS [dbo].[Users];
DROP TABLE IF EXISTS [dbo].[Organizations];
DROP TABLE IF EXISTS [dbo].[Volunteers];
DROP TABLE IF EXISTS [dbo].[Projects];
DROP TABLE IF EXISTS [dbo].[Reviews];
DROP TABLE IF EXISTS [dbo].[Pictures];
DROP TABLE IF EXISTS [dbo].[ProjectVolunteers];

CREATE TABLE [dbo].[Users]
(
	Id int IDENTITY(1,1) PRIMARY KEY,
	Username varchar (255),
	Role int,
	Hash varbinary (255),
	Salt varbinary (255),
	Email varchar (255),
	Created date
);

CREATE TABLE dbo.Organizations
(
	Id int IDENTITY(1,1) PRIMARY KEY,
	Title varchar (255),
	Description varchar (255),
	WebsiteUrl varchar (255),
	UserId int NOT NULL,
	UNIQUE(UserId),
	FOREIGN KEY(UserId) REFERENCES [Users] (Id)
);

CREATE TABLE dbo.Volunteers
(
	Id int IDENTITY(1,1) PRIMARY KEY,
	FirstName varchar (255),
	LastName varchar (255),
	Description varchar (255),
	UserId int NOT NULL,
	UNIQUE(UserId),
	FOREIGN KEY(UserId) REFERENCES [Users] (Id)
);

CREATE TABLE dbo.Projects
(
	Id int IDENTITY(1,1) PRIMARY KEY,
	Title varchar (255),
	Description varchar (255),
	Email varchar (255),
	Phone varchar (255),
	Url varchar (255),
	Start date,
	[End] date,
	OrganizationId int NOT NULL,
	FOREIGN KEY(OrganizationId) REFERENCES [Organizations] (Id)
);

CREATE TABLE dbo.Reviews
(
	Id int IDENTITY(1,1) PRIMARY KEY,
	Title varchar (255),
	Grade int,
	Text varchar (255),
	Created date,
	OrganizationId int NOT NULL,
	FOREIGN KEY(OrganizationId) REFERENCES [Organizations] (Id)
);

CREATE TABLE dbo.Pictures
(
	Id int IDENTITY(1,1) PRIMARY KEY,
	Title varchar (255),
	Url varchar (255),
	ProjectId int,
	VolunteerId int,
	OrganizationId int,
	FOREIGN KEY(ProjectId) REFERENCES [Projects] (Id),
	FOREIGN KEY(VolunteerId) REFERENCES [Volunteers] (Id),
	FOREIGN KEY(OrganizationId) REFERENCES [Organizations] (Id)
);

CREATE TABLE dbo.ProjectVolunteers
(
	ProjectId int,
	VolunteerId int,
	PRIMARY KEY(ProjectId, VolunteerId),
	FOREIGN KEY(ProjectId) REFERENCES [Projects] (Id),
	FOREIGN KEY(VolunteerId) REFERENCES [Volunteers] (Id)
);
