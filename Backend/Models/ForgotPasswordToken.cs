namespace BrieflyServer.Models
{
    public class ForgotPasswordToken(string i_Email, string i_HashedOtp)
    {
        public int Id { get; set; }

        public string Email { get; set; } = i_Email;

        public string HashedOtp { get; set; } = i_HashedOtp;
    }
}