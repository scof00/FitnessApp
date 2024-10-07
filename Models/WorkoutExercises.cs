namespace FitnessApp.Models
{
    public class WorkoutExercises
    {
        public int Id { get; set; }
        public int WorkoutId { get; set; }
        public int ExerciseId { get; set; }
        public string? workoutName { get; set; }
        public string? exerciseName { get; set; }
    }
}
