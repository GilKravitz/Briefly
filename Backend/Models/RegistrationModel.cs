using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class RegistrationModel(string i_Email, string i_Password,string i_UserName)
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = i_Email;

        [Required]
        [MinLength(8)]
        public string Password { get; set; } = i_Password;

        [Required]
        public string UserName { get; set; } = i_UserName;
    }
}
