using FitnessApp.Models;
using FitnessApp.Utils;

namespace FitnessApp.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserName, Password, isAdmin FROM Users";

                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Password = DbUtils.GetString(reader, "Password"),
                            isAdmin = DbUtils.GetBoolean(reader, "isAdmin")
                        });
                    }
                    reader.Close();
                    return users;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserName, Password, isAdmin FROM Users WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;

                    while (reader.Read())
                    {
                        if (user == null)
                        {
                            user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                Password = DbUtils.GetString(reader, "Password"),
                                isAdmin = DbUtils.GetBoolean(reader, "isAdmin")
                            };
                        }
                    }
                    reader.Close();
                    return user;
                }
            }
        }

        public User GetByUsernameAndPassword (string username, string password)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserName, Password, isAdmin FROM Users WHERE Username = @username AND Password = @password";
                    DbUtils.AddParameter(cmd, "@username", username);
                    DbUtils.AddParameter(cmd, "@password", password);

                    var reader = cmd.ExecuteReader();

                    User user = null;

                    while (reader.Read())
                    {
                        if (user == null)
                        {
                            user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserName = DbUtils.GetString(reader, "UserName"),
                                Password = DbUtils.GetString(reader, "Password"),
                                isAdmin = DbUtils.GetBoolean(reader, "isAdmin")
                            };
                        }
                    }
                    reader.Close();
                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Users (UserName, Password, isAdmin) OUTPUT INSERTED.ID VALUES (@username, @password, @isadmin)";
                    DbUtils.AddParameter(cmd, "@username", user.UserName);
                    DbUtils.AddParameter(cmd, "@password", user.Password);
                    DbUtils.AddParameter(cmd, "@isadmin", user.isAdmin);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Users SET UserName=@username, Password = @password, isAdmin=@isadmin WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@username", user.UserName);
                    DbUtils.AddParameter(cmd, "@password", user.Password);
                    DbUtils.AddParameter(cmd, "@isadmin", user.isAdmin);
                    DbUtils.AddParameter(cmd, "@id", user.Id);

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
                    cmd.CommandText = "DELETE FROM Users WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
