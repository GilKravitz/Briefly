using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class OtpModel(string i_Email, string i_Otp)
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = i_Email;

        [Required]
        public string Otp { get; set; } = i_Otp;
    }
}
