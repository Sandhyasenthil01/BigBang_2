using Microsoft.EntityFrameworkCore;

namespace BigBang_React.Models
{
    public class HospitalContext : DbContext
    {
        public DbSet<Admin> Admins { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Patients> Patients { get; set; }


        public HospitalContext(DbContextOptions<HospitalContext> options) : base(options) { }
    }
}
