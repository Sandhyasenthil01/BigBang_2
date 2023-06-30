using System.ComponentModel.DataAnnotations;

namespace BigBang_React.Models
{
    public class Doctor
    {
        [Key]

        public int   Doctor_Id { get; set; }
        public string? Doctor_Name { get; set; }

        public string? Doc_image { get; set; }
        public string? Gender { get; set; }
        public string? Specialization { get; set; }
        public int Experience { get; set; }

        public string? Password { get; set; }

        public ICollection<Patients> Patients { get; set; }
    }
}
