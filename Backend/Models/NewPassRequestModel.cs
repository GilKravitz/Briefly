using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class NewPassRequestModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        public string NewPassword { get; set; }

        [Required]
        public string Token { get; set; }

        public NewPassRequestModel(string email, string newPassword, string token)
        {
            Email = email;
            NewPassword = newPassword;
            Token = token;
        }
    }
}
