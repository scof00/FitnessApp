using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using FitnessApp.Models;
using FitnessApp.Utils;

namespace FitnessApp.Repositories
{
    public class MuscleGroupRepository : BaseRepository, IMuscleGroupRepository
    {
        public MuscleGroupRepository(IConfiguration config) : base(config) { }

        public List<MuscleGroups> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name FROM Muscles";
                    var reader = cmd.ExecuteReader();
                    var muscles = new List<MuscleGroups>();
                    while (reader.Read())
                    {
                        muscles.Add(new MuscleGroups()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }
                    reader.Close();
                    return muscles;
                }
            }
        }

        public MuscleGroups GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd= conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name FROM Muscles WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();
                    MuscleGroups muscleGroups = new MuscleGroups();
                    if(reader.Read())
                    {
                        muscleGroups = new MuscleGroups()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name"),
                        };
                    }
                    reader.Close(); 
                    return muscleGroups;
                }
            }
        }

        public void Add(MuscleGroups muscleGroups)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Muscles (Name) OUTPUT INSERTED.ID VALUES (@name)";
                    DbUtils.AddParameter(cmd, "@name", muscleGroups.Name);

                    muscleGroups.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update (MuscleGroups muscleGroups)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using ( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Muscles SET Name = @name WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@name", muscleGroups.Name);
                    DbUtils.AddParameter(cmd, "@id", muscleGroups.Id);

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
                    cmd.CommandText = "DELETE FROM Muscles WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
