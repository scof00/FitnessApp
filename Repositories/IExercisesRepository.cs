using FitnessApp.Models;

namespace FitnessApp.Repositories
{
    public interface IExercisesRepository
    {
        void Add(Exercises exercise);
        void Delete(int id);
        List<Exercises> GetAll();
        List<Exercises> GetAllByUserId(int id);
        Exercises GetById(int id);
        void Update(Exercises exercise);
    }
}