namespace FitnessApp.Models
{
    public class Progress
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ExerciseId { get; set; }
        public int Reps { get; set; }
        public int Sets { get; set; }
        public int Weight { get; set; }
        public DateTime dateCompleted { get; set; }
        public string? Notes { get; set; }
        public string WeightType { get; set; }
        public User? user { get; set; }
        public Exercises? exercise { get; set; }
      
    }
}
