using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class OtpModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Otp { get; set; }

        public OtpModel(string email, string otp)
        {
            Email = email;
            Otp = otp;
        }
    }
}
