using FitnessApp.Models;
using FitnessApp.Utils;

namespace FitnessApp.Repositories
{
    public class BiometricsRepository : BaseRepository, IBiometricsRepository
    {
        public BiometricsRepository(IConfiguration configuration) : base(configuration) { }

        public List<Biometrics> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.Id as BioId, age, height, weight, username FROM Biometrics as b LEFT JOIN Users on userId = Users.id ";
                    var reader = cmd.ExecuteReader();
                    var biometrics = new List<Biometrics>();
                    while (reader.Read())
                    {
                        biometrics.Add(new Biometrics()
                        {
                            Id = DbUtils.GetInt(reader, "BioId"),
                            UserId = DbUtils.GetInt(reader, "userId"),
                            Height = DbUtils.GetInt(reader, "height"),
                            Weight = DbUtils.GetInt(reader, "weight"),
                            Age = DbUtils.GetInt(reader, "age"),
                        });
                    }
                    reader.Close();
                    return biometrics;
                }
            }
        }
        public Biometrics GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.Id as BioId, age, height, weight, username FROM Biometrics as b LEFT JOIN Users on userId = Users.id WHERE userId = @id";

                    var reader = cmd.ExecuteReader();

                    Biometrics biometrics = null;

                    while (reader.Read())
                    {
                        if (biometrics == null)
                        {
                            biometrics = new Biometrics()
                            {
                                Id = DbUtils.GetInt(reader, "BioId"),
                                UserId = DbUtils.GetInt(reader, "userId"),
                                Height = DbUtils.GetInt(reader, "height"),
                                Weight = DbUtils.GetInt(reader, "weight"),
                                Age = DbUtils.GetInt(reader, "age"),
                            };
                        }
                    }
                    reader.Close();
                    return biometrics;
                }
            }
        }

        public void Add(Biometrics biometrics)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Biometrics (userId, height, weight, age) OUTPUT INSERTED.ID (@userId, @height, @weight, @age)";
                    DbUtils.AddParameter(cmd, "@userId", biometrics.UserId);
                    DbUtils.AddParameter(cmd, "@height", biometrics.Height);
                    DbUtils.AddParameter(cmd, "@weight", biometrics.Weight);
                    DbUtils.AddParameter(cmd, "@age", biometrics.Height);

                    biometrics.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Biometrics biometrics)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Biometrics SET height = @height, weight = @weight, age = @age WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@height", biometrics.Height);
                    DbUtils.AddParameter(cmd, "@weight", biometrics.Weight);
                    DbUtils.AddParameter(cmd, "@age", biometrics.Height);
                    DbUtils.AddParameter(cmd, "@id", biometrics.Id);

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
                    cmd.CommandText = "DELETE FROM Biometrics WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
