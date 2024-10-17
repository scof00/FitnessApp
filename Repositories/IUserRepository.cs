using FitnessApp.Models;

namespace FitnessApp.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        void Delete(int id);
        List<User> GetAll();
        User GetById(int id);
        User GetByUsernameAndPassword(string username, string password);
        void Update(User user);
    }
}