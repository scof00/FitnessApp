using FitnessApp.Models;
using FitnessApp.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FitnessApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BiometricsController : ControllerBase
    {
        private readonly IBiometricsRepository _biometricsRepository;
        public BiometricsController(IBiometricsRepository biometricsRepository)
        {
            _biometricsRepository = biometricsRepository;
        }
        // GET: api/<BiometricsController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_biometricsRepository.GetAll());
        }

        // GET api/<BiometricsController>/5
        [HttpGet("userId={id}")]
        public IActionResult Get(int id)
        {
            var biometrics = _biometricsRepository.GetByUserId(id);
            if (biometrics == null)
            {
                return NotFound();
            }
            return Ok(biometrics);
        }

        // POST api/<BiometricsController>
        [HttpPost]
        public IActionResult Post(Biometrics biometrics) 
        {
            _biometricsRepository.Add(biometrics);
            return CreatedAtAction("Get", new { id = biometrics.Id }, biometrics);
        }

        // PUT api/<BiometricsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Biometrics biometrics)
        {
            if(id != biometrics.Id)
            {
                return BadRequest();
            }
            _biometricsRepository.Update(biometrics);
            return NoContent();
        }

        // DELETE api/<BiometricsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _biometricsRepository.Delete(id);
            return NoContent();
        }
    }
}
