using FitnessApp.Models;
using FitnessApp.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitnessApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private  readonly IExercisesRepository _exerciseRepository;

       public ExerciseController(IExercisesRepository exercisesRepository)
        {
            _exerciseRepository = exercisesRepository;
        }
        // GET: api/<ExerciseController>
        [HttpGet("userId={id}")]
        public IActionResult GetAllByUserId(int id) 
        {
            return Ok(_exerciseRepository.GetAllByUserId(id));
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_exerciseRepository.GetAll());
        }

        // GET api/<ExerciseController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var exercise = _exerciseRepository.GetById(id);
            if (exercise == null)
            {
                return NotFound();
            }
            return Ok(exercise);
        }

        // POST api/<ExerciseController>
        [HttpPost]
        public IActionResult Post(Exercises exercise)
        {
            _exerciseRepository.Add(exercise);
            return CreatedAtAction("Get", new { id = exercise.Id }, exercise);
        }

        // PUT api/<ExerciseController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Exercises exercise)
        {
            if (id != exercise.Id)
            {
                return BadRequest();
            }
            _exerciseRepository.Update(exercise);
            return NoContent();
        }

        // DELETE api/<ExerciseController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _exerciseRepository.Delete(id);
            return NoContent();
        }
    }
}
