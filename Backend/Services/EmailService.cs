using SendGrid.Helpers.Mail;
using SendGrid;

namespace BrieflyServer.Services
{
    public class EmailService()
    {
        internal async void SendMail(string i_Email, string i_Otp)
        {
            var sendGridApiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var sendGridClient = new SendGridClient(sendGridApiKey);
            var from = new EmailAddress(Environment.GetEnvironmentVariable("COMPANY_MAIL"), "Briefly");
            var to = new EmailAddress(i_Email);
            var subject = "Reset Your Password";
            var currentDirectory = Directory.GetCurrentDirectory();
            var filePath = Path.Combine(currentDirectory, "Other", "EmailTemplate.html");
            var htmlContent = File.ReadAllText(filePath).Replace("{otp}", i_Otp);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, "", htmlContent);
            await sendGridClient.SendEmailAsync(msg);
        }
    }
}
