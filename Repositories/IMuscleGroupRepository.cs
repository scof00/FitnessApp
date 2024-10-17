using FitnessApp.Models;

namespace FitnessApp.Repositories
{
    public interface IMuscleGroupRepository
    {
        List<MuscleGroups> GetAll();
        MuscleGroups GetById(int id);
        void Add(MuscleGroups muscleGroups);
        void Update(MuscleGroups muscleGroups);
        void Delete(int id);
    }
}