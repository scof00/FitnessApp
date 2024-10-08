using FitnessApp.Models;
using FitnessApp.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitnessApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private readonly IProgressRepository _progressRepository;

        public ProgressController(IProgressRepository progressRepository)
        {
            _progressRepository = progressRepository;
        }


        // GET: api/<ProgressController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_progressRepository.GetAll());
        }

        [HttpGet("userId={id}")]
        public IActionResult GetAllByUserId(int id)
        {
            return Ok(_progressRepository.GetAllByUserId(id));
        }

        [HttpGet("exerciseId={id}")]
        public IActionResult GetAllByExerciseId(int id)
        {
            return Ok(_progressRepository.GetAllByExerciseId(id));
        }

        // GET api/<ProgressController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var progress = _progressRepository.GetById(id);
            if(progress == null)
            {
                return NotFound();
            }
            return Ok(progress);
        }

        // POST api/<ProgressController>
        [HttpPost]
        public IActionResult Post(Progress progress)
        {
            progress.dateCompleted = DateTime.Now;
            _progressRepository.Add(progress);
            return CreatedAtAction("Get", new { id = progress.Id }, progress);
        }

        // PUT api/<ProgressController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Progress progress)
        {
            if (id != progress.Id)
            {
                return BadRequest();
            }
            _progressRepository.Update(progress);
            return NoContent();
        }

        // DELETE api/<ProgressController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
             _progressRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("exerciseId={id}")]
        public IActionResult DeleteByExerciseId(int id)
        {
            _progressRepository.DeleteByExercise(id);
            return NoContent();
        }
    }
}
