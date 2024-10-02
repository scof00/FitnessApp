SELECT * FROM Users
SELECT * FROM Muscles
SELECT * FROM Exercises
SELECT * FROM Workouts
SELECT * FROM Progress

SELECT * FROM Exercises LEFT JOIN Muscles on muscleId = Muscles.id
SELECT e.id as ExerciseId, e.muscleId as MuscleId, e.name as ExerciseName, userId, m.name as MuscleName FROM Exercises as e LEFT JOIN Muscles as m on muscleId = m.id
SELECT WorkoutExercises.id as Id, workoutId, exerciseId, Workouts.name as WorkoutName, Exercises.name as ExerciseName FROM WorkoutExercises LEFT JOIN Workouts on workoutId = Workouts.id LEFT JOIN Exercises on exerciseId = Exercises.id WHERE workoutId = 1