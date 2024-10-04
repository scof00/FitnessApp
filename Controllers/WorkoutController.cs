using FitnessApp.Models;
using FitnessApp.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitnessApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly IWorkoutsRepository _workoutsRepository;

        public WorkoutController(IWorkoutsRepository workoutsRepository)
        {
            _workoutsRepository = workoutsRepository;
        }

        // GET: api/<WorkoutController>
        [HttpGet("userId={id}")]
        public IActionResult GetAllByUserId(int id)
        {
            return Ok(_workoutsRepository.GetAllByUserId(id));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_workoutsRepository.GetAll());
        }

        // GET api/<WorkoutController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var workout = _workoutsRepository.GetById(id);
            if (workout == null)
            {
                return NotFound();
            }
            return Ok(workout);
        }

        // POST api/<WorkoutController>
        [HttpPost]
        public IActionResult Post(Workouts workout)
        {
            _workoutsRepository.Add(workout);
            return CreatedAtAction("Get", new { id = workout.Id }, workout);
        }

        // PUT api/<WorkoutController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Workouts workout)
        {
            if(id != workout.Id)
            {
                return BadRequest();
            }
            _workoutsRepository.Update(workout);
            return NoContent();
        }

        // DELETE api/<WorkoutController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _workoutsRepository.Delete(id);
            return NoContent();
        }
    }
}
