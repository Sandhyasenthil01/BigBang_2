using System.ComponentModel.DataAnnotations;

namespace BigBang_React.Models
{
    public class Doctor
    {
        [Key]

        public int Doctor_Id { get; set; }

        public string Doctor_Name { get; set; }
        public string Doctor_gender { get; set; }
        public string Specialization { get; set; }
    }
}
