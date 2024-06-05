using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class NewPassRequestModel(string email, string newPassword, string token)
    {
        [Required] 
        [EmailAddress]
        public string Email { get; set; } = email;
        [Required]
        [MinLength(8)]
        public string NewPassword { get; set; } = newPassword;
        [Required] public string Token { get; set; } = token;
    }
}
