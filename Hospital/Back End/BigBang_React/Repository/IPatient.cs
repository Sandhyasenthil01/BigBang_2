using BigBang_React.Models;

namespace BigBang_React.Repository
{
    public interface IPatient
    {

        Task<IEnumerable<Patients>> GetAllPatients();
        Task<Patients> GetPatientById(int patientId);
        Task<Patients> PostPatient(Patients patient);
        Task<int> UpdatePatient(int id, Patients patient);
        Task<int> DeletePatient(int patientId);

    }
}
