using BigBang_React.Models;
using BigBang_React.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BigBang_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctor doctor;

        public DoctorController(IDoctor doctor)
        {
            this.doctor = this.doctor = doctor;
            ;
        }

        [HttpGet]
        public IEnumerable<Doctor>? Get()
        {

            return doctor.GetDoctor();
        }

        [HttpGet("{Doctor_Id}")]
        public Doctor? Doctor_Id(int Doctor_Id)
        {

            return doctor.DoctorbyId(Doctor_Id);


        }
        [HttpPost]
        public async Task<ActionResult<Doctor>> Post([FromForm] Doctor doc, IFormFile imageFile)
        {

            try
            {
                var createdCourse = await doctor.CreateDoctor(doc, imageFile);
                return CreatedAtAction("Get", new { id = createdCourse.Doctor_Id }, createdCourse);

            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("{DoctorId}")]
        public async Task<ActionResult<Doctor>> Put(int doctorid, [FromForm] Doctor doc, IFormFile imageFile)
        {
            try
            {
                var updatedCake = await doc.UpdateDoctor(doctorid, doc, imageFile);
                if (updatedCake == null)
                {
                    return NotFound();
                }

                return Ok(updatedCake);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }


    }
}
