-- Tables
create table Roles (
	Id uniqueidentifier primary key default newid(),
	Name varchar(10) not null
)
go
create table VacationTypes (
	Id uniqueidentifier primary key default newid(),
	Name varchar(15) not null
)
go
create table VacationStatuses (
	Id uniqueidentifier primary key default newid(),
	Name varchar(8) not null
)
go
create table Companies (
	Id uniqueidentifier primary key default newid(),
	Name nvarchar(64) not null,
	Bulstat int unique not null,
	YearVacationLimit tinyint not null,
)
go 
create table Users (
	Id uniqueidentifier primary key default newid(),
	Email nvarchar(64) unique not null,
	FirstName nvarchar(32),
	LastName nvarchar(32),
	IsActive bit default 0,
	IsEmailConfirmed bit default 0,
	Password text not null,
	VacationLimit tinyint not null,
	SecurityKey uniqueidentifier not null,
	CompanyId uniqueidentifier foreign key references Companies(Id) on delete cascade,
	RoleId uniqueidentifier foreign key references Roles(Id)
)
go
create table Vacations (
	Id uniqueidentifier primary key default newid(),
	Username nvarchar(64) not null,
	Days text not null,
	Description nvarchar(500),
	VacationStatusId uniqueidentifier foreign key references VacationStatuses(Id),
	VacationTypeId uniqueidentifier foreign key references VacationTypes(Id),
	UserId uniqueidentifier foreign key references Users(Id) on delete cascade
)
go

-- Data
insert into Roles (Id, Name)
values
	('0C02034D-C10F-4B9C-A8B2-B7CDE214434C', 'Superadmin'),
	('83DBF158-A1DD-46A4-A8A4-892FB07A388E', 'Admin'),
	('279DF7B4-BD50-4E3A-8DBD-92D7139E01DE', 'User')
go
insert into VacationTypes (Name)
values 
	('Paid'),
	('Unpaid'),
	('Sick'),
	('Business Trip'),
	('Maternity'),
	('Paternity')
go
insert into VacationStatuses (Name)
values 
	('Accepted'),
	('Rejected'),
	('Pending')
go
insert into Companies (Id, Name, Bulstat, YearVacationLimit)
values ('4B229C42-689E-469C-8306-BAF99293B65E', 'CVC Internal', 999999999, 0)
go
insert into Users (Email, FirstName, LastName, IsActive, IsEmailConfirmed, Password, VacationLimit, SecurityKey, CompanyId, RoleId)
values ('montishak@gmail.com', 'Simeon', 'Mechkov', 1, 1, '238fd53fac,4949d38947e07bf3996e16fb925a8d17', 0, '7AAB73ED-D06B-43F9-B41D-A4B8BDF8C8CD', '4B229C42-689E-469C-8306-BAF99293B65E', '0C02034D-C10F-4B9C-A8B2-B7CDE214434C')