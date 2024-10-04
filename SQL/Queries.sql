SELECT * FROM Users
SELECT * FROM Muscles
SELECT * FROM Exercises
SELECT * FROM Workouts
SELECT * FROM Progress
SELECT * FROM Biometrics

SELECT * FROM Exercises LEFT JOIN Muscles on muscleId = Muscles.id
SELECT e.id as ExerciseId, e.muscleId as MuscleId, e.name as ExerciseName, userId, m.name as MuscleName FROM Exercises as e LEFT JOIN Muscles as m on muscleId = m.id
SELECT WorkoutExercises.id as Id, workoutId, exerciseId, Workouts.name as WorkoutName, Exercises.name as ExerciseName FROM WorkoutExercises LEFT JOIN Workouts on workoutId = Workouts.id LEFT JOIN Exercises on exerciseId = Exercises.id WHERE workoutId = 1

SELECT p.id as ProgressId, p.userId as UserId, p.ExerciseId as ExerciseId, p.workoutId as WorkoutId, reps, sets, weight, completionDate, notes, weightType, Workouts.name as WorkoutName, Exercises.name as ExerciseName, Exercises.muscleId as MuscleId FROM Progress as p LEFT JOIN Users on Users.id = p.userId LEFT JOIN Exercises on exerciseId = Exercises.id LEFT JOIN Workouts on workoutId = Workouts.id WHERE p.id = 1