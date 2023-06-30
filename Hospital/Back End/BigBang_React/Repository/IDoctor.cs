using BigBang_React.Models;
using Microsoft.AspNetCore.Mvc;

namespace BigBang_React.Repository
{
    public interface IDoctor
    {
        public IEnumerable<Doctor> GetDoctor();
        public Doctor DoctorbyId(int Doctor_Id);
        Task<Doctor> CreateDoctor([FromForm] Doctor doctor, IFormFile imageFile);
        Task<Doctor> PutDoctor(int Doctor_id, Doctor doctor, IFormFile imageFile);
        public Doctor DeleteDoctor(int Doctor_Id);


        Task<bool> ActivateDoctor(int Doctor_Id);
        Task<bool> DeactivateDoctor(int Doctor_Id);
    }
}
