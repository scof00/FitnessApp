using FitnessApp.Models;

namespace FitnessApp.Repositories
{
    public interface IBiometricsRepository
    {
        void Add(Biometrics biometrics);
        void Delete(int id);
        List<Biometrics> GetAll();
        Biometrics GetByUserId(int id);
        void Update(Biometrics biometrics);
    }
}