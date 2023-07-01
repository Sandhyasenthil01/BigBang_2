using BigBang_React.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace BigBang_React.Repository
{
    public class DoctorRepo : IDoctor
    {
        private readonly HospitalContext _hospContext;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public DoctorRepo(HospitalContext con, IWebHostEnvironment webHostEnvironment)
        {
            _hospContext = con;
            _webHostEnvironment = webHostEnvironment;
        }

        public IEnumerable<Doctor> GetDoctor()
        {
            return _hospContext.Doctors.Include(x => x.Patients).ToList();
        }

        public Doctor DoctorbyId(int Doctor_Id)
        {
            try
            {
                return _hospContext.Doctors.FirstOrDefault(x => x.Doctor_Id == Doctor_Id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Doctor> CreateDoctor([FromForm] Doctor doctor, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }
            doctor.status = "Not Admitted";

            doctor.Doc_image = fileName;


            _hospContext.Doctors.Add(doctor);
            await _hospContext.SaveChangesAsync();

            return doctor;
        }
        public async Task<Doctor> PutDoctor(int Doctor_id, Doctor doctor, IFormFile imageFile)
        {
            var existingDoctor = await _hospContext.Doctors.FindAsync(Doctor_id);
            if (existingDoctor == null)
            {
                return null;
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                // Delete the old image file
                var oldFilePath = Path.Combine(uploadsFolder, existingDoctor.Doc_image);
                if (File.Exists(oldFilePath))
                {
                    File.Delete(oldFilePath);
                }

                existingDoctor.Doc_image = fileName;
            }

            existingDoctor.Doctor_Name = doctor.Doctor_Name;
            existingDoctor.Specialization = doctor.Specialization;
            existingDoctor.Gender = doctor.Gender;
            existingDoctor.Experience = doctor.Experience;
            existingDoctor.Password = doctor.Password;
            await _hospContext.SaveChangesAsync();

            return existingDoctor;
        }
        public Doctor DeleteDoctor(int Doctor_Id)
        {
            try
            {
                Doctor doctor = _hospContext.Doctors.FirstOrDefault(x => x.Doctor_Id == Doctor_Id);
                if (doctor != null)
                {
                    _hospContext.Doctors.Remove(doctor);
                    _hospContext.SaveChanges();
                    return doctor;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

     


    }
}
