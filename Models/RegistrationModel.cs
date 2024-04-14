using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class RegistrationModel
    {
        public RegistrationModel(string email, string password, string preferredTopics)
        {
            Email = email;
            Password = password;
            PreferredTopics = preferredTopics;
        }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(8)]
        public string Password { get; set; }
        [Required]
        [EnumValidation(ErrorMessage = "Invalid category")]
        public string PreferredTopics { get; set; }
    }
}
