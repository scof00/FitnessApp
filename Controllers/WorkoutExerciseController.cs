using FitnessApp.Models;
using FitnessApp.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitnessApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutExerciseController : ControllerBase
    {
        private readonly IWorkoutExerciseRepository _workoutExerciseRepository;

        public WorkoutExerciseController(IWorkoutExerciseRepository workoutExerciseRepository)
        {
            _workoutExerciseRepository = workoutExerciseRepository;
        }


        // GET: api/<WorkoutExerciseController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_workoutExerciseRepository.GetAll());
        }
        [HttpGet("workoutId={id}")]
        public IActionResult GetAllByWorkoutId(int id)
        {
            return Ok(_workoutExerciseRepository.GetAllByWorkoutId(id));
        }

        // GET api/<WorkoutExerciseController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var workoutExercise = _workoutExerciseRepository.GetById(id);
            if (id != workoutExercise.Id)
            {
                return NotFound();
            }
            return Ok(workoutExercise);
        }

        // POST api/<WorkoutExerciseController>
        [HttpPost]
        public IActionResult Post(WorkoutExercises workoutExercises)
        {
            _workoutExerciseRepository.Add(workoutExercises);
            return CreatedAtAction("Get", new {id = workoutExercises.Id}, workoutExercises);
        }

        // PUT api/<WorkoutExerciseController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, WorkoutExercises workoutExercises)
        {
             if(id != workoutExercises.Id)
            {
                return BadRequest();
            }
            _workoutExerciseRepository.Update(workoutExercises);
            return NoContent();
        }

        // DELETE api/<WorkoutExerciseController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _workoutExerciseRepository.Delete(id);
            return NoContent();
        }
        [HttpDelete("workoutId={id}")]
        public IActionResult DeleteByWorkoutId(int id)
        {
            _workoutExerciseRepository.DeleteByWorkoutId(id);
            return NoContent();
        }
        [HttpDelete("exerciseId={id}")]
        public IActionResult DeleteByExerciseId(int id)
        {
            _workoutExerciseRepository.DeleteByExerciseId(id);
            return NoContent();
        }

    }
}
