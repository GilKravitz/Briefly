namespace BrieflyServer.Models
{
    public class ForgotPasswordToken(string email, string hashedOtp)
    {
        public int Id { get; set; }
        public string Email { get; set; } = email;
        public string HashedOtp { get; set; } = hashedOtp;
    }
    public class ForgotPasswordRequest(string email)
    {
        public string Email { get; set; } = email;
    }
}