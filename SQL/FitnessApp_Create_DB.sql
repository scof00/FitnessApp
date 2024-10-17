USE [master]

IF db_id('FitnessApp') IS NULL
  CREATE DATABASE [FitnessApp]
GO

USE [FitnessApp]
GO


DROP TABLE IF EXISTS [Workouts];
DROP TABLE IF EXISTS [Muscles];
DROP TABLE IF EXISTS [Exercises];
DROP TABLE IF EXISTS [WorkoutExercises];
DROP TABLE IF EXISTS [Progress];
DROP TABLE IF EXISTS [Biometrics];
GO

CREATE TABLE [Workouts] (
  [id] int PRIMARY KEY IDENTITY,
  [name] nvarchar(255),
  [userid] int
)
GO

CREATE TABLE [Muscles] (
  [id] int PRIMARY KEY IDENTITY,
  [muscleGroup] nvarchar(255)
)
GO

CREATE TABLE [Exercises] (
  [id] int PRIMARY KEY IDENTITY,
  [muscleId] int,
  [name] nvarchar(255),
  [userId] int
)
GO

CREATE TABLE [WorkoutExercises] (
  [id] int PRIMARY KEY IDENTITY,
  [workoutId] int,
  [exerciseId] int
)
GO

CREATE TABLE [Users] (
  [id] int PRIMARY KEY IDENTITY,
  [username] nvarchar(255),
  [password] nvarchar(255),
  [isAdmin] bit
)
GO

CREATE TABLE [Progress] (
  [id] int PRIMARY KEY IDENTITY,
  [userId] int,
  [exerciseId] int,
  [workoutId] int,
  [reps] int,
  [sets] int,
  [weight] int,
  [completionDate] datetime,
  [notes] nvarchar(255),
  [weightType] nvarchar(255)
)
GO

CREATE TABLE [Biometrics] (
  [id] int PRIMARY KEY IDENTITY,
  [userId] int,
  [height] int,
  [weight] int,
  [age] int
)
GO

ALTER TABLE [workoutExercises] ADD FOREIGN KEY ([workoutId]) REFERENCES [workouts] ([id])
GO

ALTER TABLE [Progress] ADD FOREIGN KEY ([workoutId]) REFERENCES [workouts] ([id])
GO

ALTER TABLE [workoutExercises] ADD FOREIGN KEY ([exerciseId]) REFERENCES [exercises] ([id])
GO

ALTER TABLE [exercises] ADD FOREIGN KEY ([muscleId]) REFERENCES [muscles] ([id])
GO

ALTER TABLE [exercises] ADD FOREIGN KEY ([userId]) REFERENCES [users] ([id])
GO

ALTER TABLE [biometrics] ADD FOREIGN KEY ([userId]) REFERENCES [users] ([id])
GO

ALTER TABLE [Progress] ADD FOREIGN KEY ([userId]) REFERENCES [users] ([id])
GO

ALTER TABLE [Progress] ADD FOREIGN KEY ([exerciseId]) REFERENCES [exercises] ([id])
GO
