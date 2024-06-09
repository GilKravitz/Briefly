using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class RegistrationModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }

        [Required]
        public string UserName { get; set; }

        public RegistrationModel(string email, string password, string userName)
        {
            Email = email;
            Password = password;
            UserName = userName;
        }
    }
}
