﻿using FitnessApp.Models;
using FitnessApp.Utils;

namespace FitnessApp.Repositories
{
    public class ProgressRepository : BaseRepository, IProgressRepository
    {
        public ProgressRepository(IConfiguration configuration) : base(configuration) { }

        public List<Progress> GetAllByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id as ProgressId, p.userId as UserId, p.ExerciseId as ExerciseId, p.workoutId as WorkoutId, reps, sets, weight, completionDate, notes, weightType, Workouts.name as WorkoutName, Exercises.name as ExerciseName, Exercises.muscleId as MuscleId FROM Progress as p LEFT JOIN Users on Users.id = p.userId LEFT JOIN Exercises on exerciseId = Exercises.id LEFT JOIN Workouts on workoutId = Workouts.id WHERE p.userId = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    var progress = new List<Progress>();
                    while (reader.Read())
                    {
                        progress.Add(new Progress()
                        {
                            Id = DbUtils.GetInt(reader, "ProgressId"),
                            UserId = id,
                            ExerciseId = DbUtils.GetInt(reader, "ExerciseId"),
                            WorkoutId = DbUtils.GetInt(reader, "WorkoutId"),
                            Reps = DbUtils.GetInt(reader, "reps"),
                            Sets = DbUtils.GetInt(reader, "sets"),
                            Weight = DbUtils.GetInt(reader, "weight"),
                            dateCompleted = DbUtils.GetDateTime(reader, "completionDate"),
                            Notes = DbUtils.GetString(reader, "notes"),
                            WeightType = DbUtils.GetString(reader, "weightType"),
                            user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId")
                            },
                            exercise = new Exercises()
                            {
                                Id = DbUtils.GetInt(reader, "ExerciseId"),
                                Name = DbUtils.GetString(reader, "ExerciseName"),
                                MuscleId = DbUtils.GetInt(reader, "MuscleId"),
                                UserId = id
                            },
                            workout = new Workouts()
                            {
                                Id = DbUtils.GetInt(reader, "WorkoutId"),
                                Name = DbUtils.GetString(reader, "WorkoutName"),
                                userId = id
                            }

                        });

                    }
                    reader.Close();
                    return progress;
                }
            }
        }

        public List<Progress> GetAllByExerciseId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id as ProgressId, p.userId as UserId, p.ExerciseId as ExerciseId, p.workoutId as WorkoutId, reps, sets, weight, completionDate, notes, weightType, Workouts.name as WorkoutName, Exercises.name as ExerciseName, Exercises.muscleId as MuscleId FROM Progress as p LEFT JOIN Users on Users.id = p.userId LEFT JOIN Exercises on exerciseId = Exercises.id LEFT JOIN Workouts on workoutId = Workouts.id WHERE exerciseId = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    var progress = new List<Progress>();
                    while (reader.Read())
                    {
                        progress.Add(new Progress()
                        {
                            Id = DbUtils.GetInt(reader, "ProgressId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ExerciseId = DbUtils.GetInt(reader, "ExerciseId"),
                            WorkoutId = DbUtils.GetInt(reader, "WorkoutId"),
                            Reps = DbUtils.GetInt(reader, "reps"),
                            Sets = DbUtils.GetInt(reader, "sets"),
                            Weight = DbUtils.GetInt(reader, "weight"),
                            dateCompleted = DbUtils.GetDateTime(reader, "completionDate"),
                            Notes = DbUtils.GetString(reader, "notes"),
                            WeightType = DbUtils.GetString(reader, "weightType"),
                            user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId")
                            },
                            exercise = new Exercises()
                            {
                                Id = DbUtils.GetInt(reader, "ExerciseId"),
                                Name = DbUtils.GetString(reader, "ExerciseName"),
                                MuscleId = DbUtils.GetInt(reader, "MuscleId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                            },
                            workout = new Workouts()
                            {
                                Id = DbUtils.GetInt(reader, "WorkoutId"),
                                Name = DbUtils.GetString(reader, "WorkoutName"),
                                userId = DbUtils.GetInt(reader, "UserId"),
                            }

                        });

                    }
                    reader.Close();
                    return progress;
                }
            }
        }

        public List<Progress> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id as ProgressId, p.userId as UserId, p.ExerciseId as ExerciseId, p.workoutId as WorkoutId, reps, sets, weight, completionDate, notes, weightType, Workouts.name as WorkoutName, Exercises.name as ExerciseName, Exercises.muscleId as MuscleId FROM Progress as p LEFT JOIN Users on Users.id = p.userId LEFT JOIN Exercises on exerciseId = Exercises.id LEFT JOIN Workouts on workoutId = Workouts.id";
                    

                    var reader = cmd.ExecuteReader();
                    var progress = new List<Progress>();
                    while (reader.Read())
                    {
                        progress.Add(new Progress()
                        {
                            Id = DbUtils.GetInt(reader, "ProgressId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ExerciseId = DbUtils.GetInt(reader, "ExerciseId"),
                            WorkoutId = DbUtils.GetInt(reader, "WorkoutId"),
                            Reps = DbUtils.GetInt(reader, "reps"),
                            Sets = DbUtils.GetInt(reader, "sets"),
                            Weight = DbUtils.GetInt(reader, "weight"),
                            dateCompleted = DbUtils.GetDateTime(reader, "completionDate"),
                            Notes = DbUtils.GetString(reader, "notes"),
                            WeightType = DbUtils.GetString(reader, "weightType"),
                            user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId")
                            },
                            exercise = new Exercises()
                            {
                                Id = DbUtils.GetInt(reader, "ExerciseId"),
                                Name = DbUtils.GetString(reader, "ExerciseName"),
                                MuscleId = DbUtils.GetInt(reader, "MuscleId"),
                                UserId = DbUtils.GetInt(reader, "UserId")
                            },
                            workout = new Workouts()
                            {
                                Id = DbUtils.GetInt(reader, "WorkoutId"),
                                Name = DbUtils.GetString(reader, "WorkoutName"),
                                userId = DbUtils.GetInt(reader, "UserId")
                            }

                        });

                    }
                    reader.Close();
                    return progress;
                }
            }
        }

        public Progress GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.id as ProgressId, p.userId as UserId, p.ExerciseId as ExerciseId, p.workoutId as WorkoutId, reps, sets, weight, completionDate, notes, weightType, Workouts.name as WorkoutName, Exercises.name as ExerciseName, Exercises.muscleId as MuscleId FROM Progress as p LEFT JOIN Users on Users.id = p.userId LEFT JOIN Exercises on exerciseId = Exercises.id LEFT JOIN Workouts on workoutId = Workouts.id WHERE p.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Progress progress = null;

                    while (reader.Read())
                    {
                        if (progress == null)
                        {
                            progress = new Progress()
                            {
                                Id = DbUtils.GetInt(reader, "ProgressId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                ExerciseId = DbUtils.GetInt(reader, "ExerciseId"),
                                WorkoutId = DbUtils.GetInt(reader, "WorkoutId"),
                                Reps = DbUtils.GetInt(reader, "reps"),
                                Sets = DbUtils.GetInt(reader, "sets"),
                                Weight = DbUtils.GetInt(reader, "weight"),
                                dateCompleted = DbUtils.GetDateTime(reader, "completionDate"),
                                Notes = DbUtils.GetString(reader, "notes"),
                                WeightType = DbUtils.GetString(reader, "weightType"),
                                user = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId")
                                },
                                exercise = new Exercises()
                                {
                                    Id = DbUtils.GetInt(reader, "ExerciseId"),
                                    Name = DbUtils.GetString(reader, "ExerciseName"),
                                    MuscleId = DbUtils.GetInt(reader, "MuscleId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                },
                                workout = new Workouts()
                                {
                                    Id = DbUtils.GetInt(reader, "WorkoutId"),
                                    Name = DbUtils.GetString(reader, "WorkoutName"),
                                    userId = DbUtils.GetInt(reader, "UserId"),
                                }
                            };
                        }

                    }
                    reader.Close();
                    return progress;
                }
            }
        }

        public void Add(Progress progress)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Progress (userId, exerciseId, workoutId, reps, sets, weight, completionDate, notes, weightType) OUTPUT INSERTED.ID VALUES (@userId, @exerciseId, @workoutId, @reps, @sets, @weight, @completionDate, @notes, @weightType)";

                    DbUtils.AddParameter(cmd, "@userId", progress.UserId);
                    DbUtils.AddParameter(cmd, "@exerciseId", progress.ExerciseId);
                    DbUtils.AddParameter(cmd, "@workoutId", progress.WorkoutId);
                    DbUtils.AddParameter(cmd, "@reps", progress.Reps);
                    DbUtils.AddParameter(cmd, "@sets", progress.Sets);
                    DbUtils.AddParameter(cmd, "@weight", progress.Weight);
                    DbUtils.AddParameter(cmd, "@completionDate", progress.dateCompleted);
                    DbUtils.AddParameter(cmd, "@notes", progress.Notes);
                    DbUtils.AddParameter(cmd, "@weightType", progress.WeightType);

                    progress.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Update(Progress progress)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Progress SET exerciseId = @exerciseId, workoutId = @workoutId, reps = @reps, sets = @sets, weight = @weight, completionDate = @completionDate, notes = @notes, weightType = @weightType WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@exerciseId", progress.ExerciseId);
                    DbUtils.AddParameter(cmd, "@workoutId", progress.WorkoutId);
                    DbUtils.AddParameter(cmd, "@reps", progress.Reps);
                    DbUtils.AddParameter(cmd, "@sets", progress.Sets);
                    DbUtils.AddParameter(cmd, "@weight", progress.Weight);
                    DbUtils.AddParameter(cmd, "@completionDate", progress.dateCompleted);
                    DbUtils.AddParameter(cmd, "@notes", progress.Notes);
                    DbUtils.AddParameter(cmd, "@weightType", progress.WeightType);
                    DbUtils.AddParameter(cmd, "@id", progress.Id);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Progress WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}