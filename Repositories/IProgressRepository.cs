using FitnessApp.Models;

namespace FitnessApp.Repositories
{
    public interface IProgressRepository
    {
        void Add(Progress progress);
        void Delete(int id);
        List<Progress> GetAllByExerciseId(int id);
        Progress GetAllById(int id);
        List<Progress> GetAllByUserId(int id);
        void Update(Progress progress);
    }
}