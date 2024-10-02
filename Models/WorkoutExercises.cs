namespace FitnessApp.Models
{
    public class WorkoutExercises
    {
        public int Id { get; set; }
        public int WorkoutId { get; set; }
        public int ExerciseId { get; set; }
        public Workouts workout { get; set; }
        public Exercises exercise { get; set; }
    }
}
