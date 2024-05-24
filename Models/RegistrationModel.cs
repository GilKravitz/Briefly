using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class RegistrationModel(string email, string password)
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = email;

        [Required]
        [MinLength(8)]
        public string Password { get; set; } = password;
    }
}
