namespace BrieflyServer.Models;

public class ForgotPasswordRequest
{
    public string Email { get; set; }

    public ForgotPasswordRequest(string email)
    {
        Email = email;
    }
}