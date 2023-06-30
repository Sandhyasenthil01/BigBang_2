using System.ComponentModel.DataAnnotations;

namespace BigBang_React.Models
{
    public class Admin
    {

        [Key]
        public int Admin_Id { get; set; }
        public string Admin_name { get; set; }
        public string Admin_Password { get; set; }
    }
}
