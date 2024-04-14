using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class LoginModel(string email, string password)
    {
        [Required]
        [MinLength(8)]
        public string Password { get; set; } = password;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = email;
    }

}
