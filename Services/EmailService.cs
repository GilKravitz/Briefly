using SendGrid.Helpers.Mail;
using SendGrid;

namespace BrieflyServer.Services
{
    public class EmailService()
    {
        public async void SendMail(string email,string otp)
        {
            var sendGridApiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var sendGridClient = new SendGridClient(sendGridApiKey);
            var from = new EmailAddress(Environment.GetEnvironmentVariable("COMPANY_MAIL"), "Briefly");
            var to = new EmailAddress(email);
            var subject = "Reset Your Password";
            var currentDirectory = Directory.GetCurrentDirectory();
            var filePath = Path.Combine(currentDirectory, "Other", "EmailTemplate.html");
            var htmlContent = File.ReadAllText(filePath).Replace("{otp}", otp);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, "", htmlContent);
            await sendGridClient.SendEmailAsync(msg);
        }
    }
}
