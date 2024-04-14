using SendGrid.Helpers.Mail;
using SendGrid;

namespace BrieflyServer.Services
{
    public class EmailService()
    {
        public async void sendMail(string email,string otp)
        {
            var sendGridApiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var sendGridClient = new SendGridClient(sendGridApiKey);
            var from = new EmailAddress(Environment.GetEnvironmentVariable("COMPANY_MAIL"), "Briefly");
            var to = new EmailAddress(email);
            var subject = "Reset Your Password";
            var htmlContent = $"Your OTP for resetting password is: <strong>{otp}</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, "", htmlContent);
            var response = await sendGridClient.SendEmailAsync(msg);
        }
    }
}
