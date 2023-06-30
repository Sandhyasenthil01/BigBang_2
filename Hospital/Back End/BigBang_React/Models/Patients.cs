using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BigBang_React.Models
{
    public class Patients
    {
        [Key]

        public int Patient_Id { get; set; }

        public int Doctor_Id { get; set; }
        [ForeignKey("Doctor_Id")]

        public Doctor? Doctor { get; set; }

        public string? Patient_Name { get; set; }
        public int Patient_Age { get; set; }
        public string? Gender { get; set; }
        public string? Health_Issue { get; set; }
        public long Phone_number { get; set; }
        public string? Address { get; set; }
        public string? Password { get; set; }


    }
}
