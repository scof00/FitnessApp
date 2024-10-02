namespace FitnessApp.Models
{
    public class Biometrics
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public int Age { get; set; }
        public User? user { get; set; }

    }
}
