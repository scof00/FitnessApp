using FitnessApp.Models;
using FitnessApp.Utils;
using Microsoft.OpenApi.Models;

namespace FitnessApp.Repositories
{
    public class WorkoutsRepository : BaseRepository, IWorkoutsRepository
    {
        public WorkoutsRepository(IConfiguration configuration) : base(configuration) { }

        public List<Workouts> GetAllByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, UserId FROM Workouts WHERE userId= @id ";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    var workouts = new List<Workouts>();

                    while (reader.Read())
                    {
                        workouts.Add(new Workouts()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            userId = DbUtils.GetInt(reader, "UserId"),
                        });
                    }
                    reader.Close();
                    return workouts;
                }
            }
        }

        public Workouts GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, UserId FROM Workouts WHERE Id= @id ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    Workouts workout = null;

                    while (reader.Read())
                    {
                        if (workout == null)
                        {
                            workout = new Workouts()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                userId = DbUtils.GetInt(reader, "UserId"),
                            };
                        }
                    }
                    reader.Close();
                    return workout;
                }
            }
        }

        public void Add(Workouts workout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Workouts (Name, UserId) OUTPUT INSERTED.ID VALUES (@name, @userId)";
                    DbUtils.AddParameter(cmd, "@name", workout.Name);
                    DbUtils.AddParameter(cmd, "@userId", workout.userId);

                    workout.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Workouts workout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Workouts SET name = @name WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@name", workout.Name);
                    DbUtils.AddParameter(cmd, "@id", workout.Id);

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
                    cmd.CommandText = "DELETE FROM Workouts WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
