using System.ComponentModel.DataAnnotations;

namespace BrieflyServer.Models
{
    public class NewPassRequestModel(string i_Email, string i_NewPassword, string i_Token)
    {
        [Required] 
        [EmailAddress]
        public string Email { get; set; } = i_Email;

        [Required]
        [MinLength(8)]
        public string NewPassword { get; set; } = i_NewPassword;

        [Required]
        public string Token { get; set; } = i_Token;
    }
}
