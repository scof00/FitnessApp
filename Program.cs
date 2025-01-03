
using FitnessApp.Repositories;

namespace FitnessApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddTransient<IMuscleGroupRepository, MuscleGroupRepository>();
            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<IBiometricsRepository, BiometricsRepository>();
            builder.Services.AddTransient<IWorkoutsRepository, WorkoutsRepository>();
            builder.Services.AddTransient<IExercisesRepository, ExercisesRepository>();
            builder.Services.AddTransient<IWorkoutExerciseRepository, WorkoutExerciseRepository>();
            builder.Services.AddTransient<IProgressRepository, ProgressRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
