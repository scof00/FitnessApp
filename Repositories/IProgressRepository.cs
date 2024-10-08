using FitnessApp.Models;

namespace FitnessApp.Repositories
{
    public interface IProgressRepository
    {
        void Add(Progress progress);
        void Delete(int id);
        void DeleteByExercise(int id);
        List<Progress> GetAllByExerciseId(int id);
        List<Progress> GetAllByExerciseIdAsc(int id);
        Progress GetById(int id);
        List<Progress> GetAllByUserId(int id);
        List<Progress> GetAll();
        void Update(Progress progress);
    }
}