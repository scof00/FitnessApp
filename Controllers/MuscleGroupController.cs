using FitnessApp.Models;
using FitnessApp.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitnessApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MuscleGroupController : ControllerBase
    {
        private readonly IMuscleGroupRepository _muscleGroupRepository;

        public MuscleGroupController(IMuscleGroupRepository muscleGroupRepository)
        {
            _muscleGroupRepository = muscleGroupRepository;
        }


        // GET: api/<MuscleGroupController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_muscleGroupRepository.GetAll());
        }

        // GET api/<MuscleGroupController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var muscle = _muscleGroupRepository.GetById(id);
            if (muscle == null)
            {
                return NotFound();
            }
            return Ok(muscle);
        }

        // POST api/<MuscleGroupController>
        [HttpPost]
        public IActionResult Post(MuscleGroups muscleGroups)
        {
            _muscleGroupRepository.Add(muscleGroups);
            return CreatedAtAction("Get", new { id = muscleGroups.Id }, muscleGroups);
        }

        // PUT api/<MuscleGroupController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, MuscleGroups muscleGroups)
        {
            if (id != muscleGroups.Id)
            {
                return BadRequest();
            }
            _muscleGroupRepository.Update(muscleGroups);
            return NoContent();
        }

        // DELETE api/<MuscleGroupController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _muscleGroupRepository.Delete(id);
            return NoContent();
        }
    }
}
