namespace BrieflyServer.Models;

public class ForgotPasswordRequest(string email)
{
    public string Email { get; set; } = email;
}