using FitnessApp.Models;
using FitnessApp.Utils;

namespace FitnessApp.Repositories
{
    public class ExercisesRepository : BaseRepository, IExercisesRepository
    {
        public ExercisesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Exercises> GetAllByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT e.id as ExerciseId, e.muscleId as MuscleId, e.name as ExerciseName, userId, m.name as MuscleName FROM Exercises as e LEFT JOIN Muscles as m on muscleId = m.id WHERE userId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    var exercises = new List<Exercises>();
                    while (reader.Read())
                    {
                        exercises.Add(new Exercises()
                        {
                            Id = DbUtils.GetInt(reader, "ExerciseId"),
                            MuscleId = DbUtils.GetInt(reader, "MuscleId"),
                            Name = DbUtils.GetString(reader, "ExerciseName"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            muscle = new MuscleGroups()
                            {
                                Id = DbUtils.GetInt(reader, "MuscleId"),
                                Name = DbUtils.GetString(reader, "MuscleName")
                            }
                        });
                    }
                    reader.Close();
                    return exercises;
                }
            }
        }

        public List<Exercises> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT e.id as ExerciseId, e.muscleId as MuscleId, e.name as ExerciseName, userId, m.name as MuscleName FROM Exercises as e LEFT JOIN Muscles as m on muscleId = m.id";



                    var reader = cmd.ExecuteReader();
                    var exercises = new List<Exercises>();
                    while (reader.Read())
                    {
                        exercises.Add(new Exercises()
                        {
                            Id = DbUtils.GetInt(reader, "ExerciseId"),
                            MuscleId = DbUtils.GetInt(reader, "MuscleId"),
                            Name = DbUtils.GetString(reader, "ExerciseName"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            muscle = new MuscleGroups()
                            {
                                Id = DbUtils.GetInt(reader, "MuscleId"),
                                Name = DbUtils.GetString(reader, "MuscleName")
                            }
                        });
                    }
                    reader.Close();
                    return exercises;
                }
            }
        }

        public Exercises GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT e.id as ExerciseId, e.muscleId as MuscleId, e.name as ExerciseName, userId, m.name as MuscleName FROM Exercises as e LEFT JOIN Muscles as m on muscleId = m.id WHERE e.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    Exercises exercise = null;

                    while (reader.Read())
                    {
                        if (exercise == null)
                        {
                            exercise = new Exercises()
                            {
                                Id = DbUtils.GetInt(reader, "ExerciseId"),
                                MuscleId = DbUtils.GetInt(reader, "MuscleId"),
                                Name = DbUtils.GetString(reader, "ExerciseName"),
                                UserId = DbUtils.GetInt(reader, "userId"),
                                muscle = new MuscleGroups()
                                {
                                    Id = DbUtils.GetInt(reader, "MuscleId"),
                                    Name = DbUtils.GetString(reader, "MuscleName")
                                }

                            };
                        }
                    }
                    reader.Close();
                    return exercise;
                }
            }
        }

        public void Add(Exercises exercise)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Exercises (Name, MuscleId, UserId) OUTPUT INSERTED.ID VALUES (@name, @muscleId, @userId)";

                    DbUtils.AddParameter(cmd, "@name", exercise.Name);
                    DbUtils.AddParameter(cmd, "@muscleId", exercise.MuscleId);
                    DbUtils.AddParameter(cmd, "@userId", exercise.UserId);

                    exercise.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Exercises exercise)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Exercises SET Name=@name, MuscleId = @muscleId WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@name", exercise.Name);
                    DbUtils.AddParameter(cmd, "@muscleId", exercise.MuscleId);
                    DbUtils.AddParameter(cmd, "@id", exercise.Id);

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
                    cmd.CommandText = "DELETE FROM Exercises WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
