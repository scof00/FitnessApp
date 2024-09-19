USE [master]
GO
IF db_id('FitnessApp') IS NULL
	CREATE DATABASE [FitnessApp]
GO
USE [FitnessApp]
GO

DROP TABLE IF EXISTS [Workouts];
DROP TABLE IF EXISTS [Exercises];
DROP TABLE IF EXISTS [WorkoutExercises];
DROP TABLE IF EXISTS [Muscles];
DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [ExerciseDate];
DROP TABLE IF EXISTS [Biometrics];

CREATE TABLE [Workouts](
	[Id] integer PRIMARY KEY identity NOT NULL,
	[Name] nvarchar(255) NOT NULL,
	[UserId] integer NOT NULL
)

CREATE TABLE [Exercises](
	[Id] integer PRIMARY KEY identity NOT NULL,
	[MuscleId] integer NOT NULL,
	[Name] nvarchar(255) NOT NULL,
	[Sets] integer NOT NULL,
	[Reps] integer NOT NULL,
	[Weight] integer NOT NULL,
	[WeightType] nvarchar(255) NOT NULL,
	[Notes] nvarchar(255),
	[UserId] integer NOT NULL
)

CREATE TABLE [WorkoutExercises](
	[Id] integer PRIMARY KEY identity NOT NULL,
	[WorkoutId] integer NOT NULL,
	[ExerciseId] integer NOT NULL
)

CREATE TABLE [Muscles] (
	[Id] integer PRIMARY KEY identity NOT NULL,
	[Name] nvarchar(255) NOT NULL
)

CREATE TABLE [Users] (
	[Id] integer PRIMARY KEY identity NOT NULL,
	[Username] nvarchar(255) NOT NULL,
	[Password] nvarchar(255) NOT NULL,
	[isAdmin] BIT NOT NULL
)

CREATE TABLE [ExerciseDate] (
	[Id] integer PRIMARY KEY identity NOT NULL,
	[ExerciseId] integer NOT NULL,
	[Sets] integer NOT NULL,
	[Reps] integer NOT NULL,
	[Weight] integer NOT NULL,
	[WeightType] nvarchar(255) NOT NULL,
	[Notes] nvarchar(255),
	[UserId] integer NOT NULL,
	[DatePerformed] datetime NOT NULL
)

CREATE TABLE [Biometrics](
	[Id] integer PRIMARY KEY identity NOT NULL,
	[UserId] integer NOT NULL,
	[Height] integer NOT NULL,
	[HeightType] nvarchar(255) NOT NULL,
	[Weight] integer NOT NULL,
	[WeightType] nvarchar(255) NOT NULL,
	[Age] integer NOT NULL
)
GO

ALTER TABLE [Exercises] ADD FOREIGN KEY ([MuscleId]) REFERENCES [Muscles] ([Id])
GO
ALTER TABLE [Exercises] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO
ALTER TABLE [Workouts] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO
ALTER TABLE [WorkoutExercises] ADD FOREIGN KEY ([WorkoutId]) REFERENCES [Workouts] ([Id])
GO
ALTER TABLE [WorkoutExercises] ADD FOREIGN KEY ([ExerciseId]) REFERENCES [Exercises] ([Id])
GO
ALTER TABLE [ExerciseDate] ADD FOREIGN KEY ([ExerciseId]) REFERENCES [Exercises] ([Id])
GO
ALTER TABLE [ExerciseDate] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
GO
ALTER TABLE [Biometrics] ADD FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])

SET IDENTITY_INSERT [Users] ON
INSERT INTO [Users]
	([Id], [Username], [Password], [isAdmin])
VALUES
	(1, 'sethfields', '12345', 0)
SET IDENTITY_INSERT [Users] OFF
SET IDENTITY_INSERT [Workouts] ON
INSERT INTO [Workouts]
	([Id], [Name], [UserId])
VALUES
	(1, 'Full Body Day 1', 1);
SET IDENTITY_INSERT [Workouts] OFF

SET IDENTITY_INSERT [Muscles] ON
INSERT INTO [Muscles]
	([Id], [Name])
VALUES
	(1, 'Chest')
SET IDENTITY_INSERT [Muscles] OFF
SET IDENTITY_INSERT [Exercises] ON
INSERT INTO [Exercises]
	([Id], [MuscleId], [Name], [Sets], [Reps], [Weight], [WeightType], [Notes], [UserId])
VALUES
	(1, 1, 'Bench Press', 4, 12, 175, 'LBS', 'None', 1)
SET IDENTITY_INSERT [Exercises] OFF
SET IDENTITY_INSERT [WorkoutExercises] ON
INSERT INTO [WorkoutExercises]
	([Id], [WorkoutId], [ExerciseId])
VALUES
	(1,1,1)
SET IDENTITY_INSERT [WorkoutExercises] OFF
SET IDENTITY_INSERT [ExerciseDate] ON
INSERT INTO [ExerciseDate]
	([Id], [ExerciseId], [Sets], [Reps], [Weight], [WeightType], [Notes], [UserId], [DatePerformed])
VALUES
	(1, 1, 4, 12, 175, 'LBS', 'None', 1, '09-13-2024')
SET IDENTITY_INSERT [ExerciseDate] OFF
SET IDENTITY_INSERT [Biometrics] ON
INSERT INTO [Biometrics]
	([Id], [UserId], [Height], [HeightType], [Weight], [WeightType], [Age])
VALUES
	(1, 1, 70, 'Inches', 152, 'LBS', 24)
SET IDENTITY_INSERT [Biometrics] OFF