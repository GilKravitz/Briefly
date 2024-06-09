namespace BrieflyServer.Models
{
    public class ForgotPasswordToken
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string HashedOtp { get; set; }

        public ForgotPasswordToken(string email, string hashedOtp)
        {
            Email = email;
            HashedOtp = hashedOtp;
        }
    }
}