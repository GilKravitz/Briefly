namespace BrieflyServer.Models;

public class ForgotPasswordRequest(string i_Email)
{
    public string Email { get; set; } = i_Email;
}