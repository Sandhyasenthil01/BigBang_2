using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BigBang_React.Models
{
    public class Doctor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int   Doctor_Id { get; set; }
        public string? Doctor_Name { get; set; }

        public string? Doc_image { get; set; }
        public string? Gender { get; set; }
        public string? Specialization { get; set; }
        public int Experience { get; set; }

        public string? Password { get; set; }

        public bool IsActive { get; set; } = false;
        public ICollection<Patients>? Patients { get; set; }

    }
}
