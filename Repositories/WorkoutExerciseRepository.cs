using FitnessApp.Models;
using FitnessApp.Utils;

namespace FitnessApp.Repositories
{
    public class WorkoutExerciseRepository : BaseRepository, IWorkoutExerciseRepository
    {
        public WorkoutExerciseRepository(IConfiguration configuration) : base(configuration) { }

        public List<WorkoutExercises> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT WorkoutExercises.id as Id, workoutId, exerciseId, Workouts.name as WorkoutName, Exercises.name as ExerciseName FROM WorkoutExercises LEFT JOIN Workouts on workoutId = Workouts.id LEFT JOIN Exercises on exerciseId = Exercises.id";

                    var reader = cmd.ExecuteReader();
                    var workoutExercises = new List<WorkoutExercises>();
                    while (reader.Read())
                    {
                        workoutExercises.Add(new WorkoutExercises()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            WorkoutId = DbUtils.GetInt(reader, "workoutId"),
                            workoutName = DbUtils.GetString(reader, "WorkoutName"),
                            ExerciseId = DbUtils.GetInt(reader, "exerciseId"),
                            exerciseName = DbUtils.GetString(reader, "ExerciseName")
                        });
                    }
                    reader.Close();
                    return workoutExercises;
                }
            }
        }

        public List<WorkoutExercises> GetAllByWorkoutId(int workoutId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT WorkoutExercises.id as Id, workoutId, exerciseId, Workouts.name as WorkoutName, Exercises.name as ExerciseName FROM WorkoutExercises LEFT JOIN Workouts on workoutId = Workouts.id LEFT JOIN Exercises on exerciseId = Exercises.id WHERE workoutId = @id";

                    DbUtils.AddParameter(cmd, "@id", workoutId);
                    var reader = cmd.ExecuteReader();

                    var workoutExercises = new List<WorkoutExercises>();
                    while (reader.Read())
                    {
                        workoutExercises.Add(new WorkoutExercises()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            WorkoutId = DbUtils.GetInt(reader, "workoutId"),
                            workoutName = DbUtils.GetString(reader, "WorkoutName"),
                            ExerciseId = DbUtils.GetInt(reader, "exerciseId"),
                            exerciseName = DbUtils.GetString(reader, "ExerciseName")
                        });
                    }
                    reader.Close();
                    return workoutExercises;
                }
            }
        }

        public WorkoutExercises GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using ( var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"SELECT WorkoutExercises.id as Id, workoutId, exerciseId, Workouts.name as WorkoutName, Exercises.name as ExerciseName FROM WorkoutExercises LEFT JOIN Workouts on workoutId = Workouts.id LEFT JOIN Exercises on exerciseId = Exercises.id WHERE WorkoutExercises.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    WorkoutExercises workoutExercises = null;

                    while (reader.Read())
                    {
                        if (workoutExercises == null)
                        {
                            workoutExercises = new WorkoutExercises()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                WorkoutId = DbUtils.GetInt(reader, "workoutId"),
                                workoutName = DbUtils.GetString(reader, "WorkoutName"),
                                ExerciseId = DbUtils.GetInt(reader, "exerciseId"),
                                exerciseName = DbUtils.GetString(reader, "ExerciseName")
                            };
                        }
                    }
                    reader.Close();
                    return workoutExercises;
                }
            }
        }

        public void Add(WorkoutExercises workoutExercises)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO WorkoutExercises (WorkoutId, ExerciseId) OUTPUT INSERTED.ID VALUEs(@workoutId, @exerciseId)";
                    DbUtils.AddParameter(cmd, "@workoutId", workoutExercises.WorkoutId);
                    DbUtils.AddParameter(cmd, "@exerciseId", workoutExercises.ExerciseId);

                    workoutExercises.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(WorkoutExercises workoutExercises)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE WorkoutExercises SET workoutId = @workoutId, exerciseId = @exerciseId WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", workoutExercises.Id);
                    DbUtils.AddParameter(cmd, "@workoutId", workoutExercises.WorkoutId);
                    DbUtils.AddParameter(cmd, "@exerciseId", workoutExercises.ExerciseId);

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
                    cmd.CommandText = "DELETE FROM WorkoutExercises WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
