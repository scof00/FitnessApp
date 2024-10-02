using FitnessApp.Models;

namespace FitnessApp.Repositories
{
    public interface IWorkoutExerciseRepository
    {
        void Add(WorkoutExercises workoutExercises);
        void Delete(int id);
        List<WorkoutExercises> GetAll();
        List<WorkoutExercises> GetAllByWorkoutId(int workoutId);
        void Update(WorkoutExercises workoutExercises);
    }
}