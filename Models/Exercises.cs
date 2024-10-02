namespace FitnessApp.Models
{
    public class Exercises
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MuscleId { get; set; }
        public int UserId { get; set; }
        public MuscleGroups? muscle {  get; set; }
    }
}
