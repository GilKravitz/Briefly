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
            var htmlContent = $"<div style=\"font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2\">\r\n  <div style=\"margin:50px auto;width:70%;padding:20px 0\">\r\n    <div style=\"border-bottom:1px solid #eee\">\r\n      <a href=\"\" style=\"font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600\">Briefly</a>\r\n    </div>\r\n    <p style=\"font-size:1.1em\">Hi,</p>\r\n    <p>Thank you for using Briefly. Use the following OTP to complete your password reset procedure.</p>\r\n    <h2 style=\"background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;\">{otp}</h2>\r\n    <p style=\"font-size:0.9em;\">Regards,<br />Briefly team</p>\r\n    <hr style=\"border:none;border-top:1px solid #eee\" />\r\n    <div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\r\n      <p>Briefly</p>\r\n      <p>Academit</p>\r\n      <p>Tel Aviv</p>\r\n    </div>\r\n  </div>\r\n</div>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, "", htmlContent);
            await sendGridClient.SendEmailAsync(msg);
        }
    }
}
