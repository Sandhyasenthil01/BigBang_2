using BigBang_React.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace BigBang_React.Repository
{
    public class PatientRepo : IPatient
    {
        private readonly HospitalContext _dbContext;

        public PatientRepo(HospitalContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Patients>> GetAllPatients()
        {
            try
            {
                return await _dbContext.Patients.Include(x => x.Doctor).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve patients.", ex);
            }
        }
        public async Task<Patients> GetPatientById(int patientId)
        {
            try
            {
                return await _dbContext.Patients.FirstOrDefaultAsync(p => p.Patient_Id == patientId);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve the patient by ID.", ex);
            }
        }
        public async Task<Patients> PostPatient(Patients patient)
        {
            try
            {
                if (_dbContext.Patients == null)
                {
                    throw new NullReferenceException("Entity set 'HospitalContext.patients' is null.");
                }

                _dbContext.Patients.Add(patient);
                await _dbContext.SaveChangesAsync();

                return patient;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public async Task<int> UpdatePatient(int id, Patients patient)
        {
            try
            {

                _dbContext.Entry(patient).State = EntityState.Modified;
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update the patient.", ex);
            }
        }
        public async Task<int> DeletePatient(int patientId)
        {
            try
            {
                var patient = await _dbContext.Patients.FindAsync(patientId);
                if (patient != null)
                {
                    _dbContext.Patients.Remove(patient);
                    return await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to delete the patient.", ex);
            }
        }

    }
}
