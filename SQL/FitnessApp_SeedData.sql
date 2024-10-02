INSERT INTO Users (username, password, isAdmin) 
VALUES 
('jdoe', 'password123', 0),
('admin', 'adminpassword', 1),
('asmith', 'smithpass', 0);

-- Seed data for Muscles table
INSERT INTO Muscles (muscleGroup) 
VALUES 
('Chest'),
('Back'),
('Legs'),
('Biceps'),
('Triceps'),
('Shoulders'),
('Abs'),
('Cardio & Others');

-- Seed data for Workouts table
INSERT INTO Workouts (name, userid) 
VALUES 
('Chest Day', 1),
('Leg Day', 2),
('Full Body', 1);

-- Seed data for Exercises table
INSERT INTO Exercises (muscleId, name, userId) 
VALUES 
(1, 'Bench Press', 1),
(2, 'Deadlift', 1),
(3, 'Squats', 2),
(4, 'Bicep Curls', 2),
(5, 'Overhead Press', 1);

-- Seed data for WorkoutExercises table
INSERT INTO WorkoutExercises (workoutId, exerciseId) 
VALUES 
(1, 1),
(1, 5),
(2, 3),
(3, 2),
(3, 4);

-- Seed data for Progress table
INSERT INTO Progress (userId, exerciseId, workoutId, reps, sets, weight, completionDate, notes, weightType) 
VALUES 
(1, 1, 1, 10, 3, 135, '2024-09-01', 'Felt strong today', 'lbs'),
(1, 5, 1, 8, 4, 95, '2024-09-01', 'Need to work on form', 'lbs'),
(2, 3, 2, 12, 3, 185, '2024-09-02', 'Legs are burning!', 'lbs'),
(1, 2, 3, 5, 5, 225, '2024-09-03', 'Heavy deadlifts', 'lbs');

-- Seed data for Biometrics table
INSERT INTO Biometrics (userId, height, weight, age) 
VALUES 
(1, 180, 75, 30),
(2, 175, 85, 25);