SELECT * FROM Users
SELECT * FROM Muscles
SELECT * FROM Exercises
SELECT * FROM Workouts
SELECT * FROM Progress
SELECT b.Id as BioId, age, height, weight, username FROM Biometrics as b LEFT JOIN Users on userId = Users.id WHERE userId = 1
SELECT b.Id as BioId, age, height, weight, username FROM Biometrics as b LEFT JOIN Users on userId = Users.id