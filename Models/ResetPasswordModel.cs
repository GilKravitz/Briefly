using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class ResetPasswordModel(string email, string otp, string newPassword)
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = email;
        [Required]
        public string Otp { get; set; } = otp;
        [Required]
        [MinLength(8)]
        public string NewPassword { get; set; } = newPassword;
    }
}
