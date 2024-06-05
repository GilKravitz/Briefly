using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class OtpModel(string email, string otp)
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = email;
        [Required]
        public string Otp { get; set; } = otp;
    }
}
