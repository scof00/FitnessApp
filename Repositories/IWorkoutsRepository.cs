using FitnessApp.Models;

namespace FitnessApp.Repositories
{
    public interface IWorkoutsRepository
    {
        void Add(Workouts workout);
        void Delete(int id);
        List<Workouts> GetAllByUserId(int id);
        Workouts GetById(int id);
        void Update(Workouts workout);
    }
}