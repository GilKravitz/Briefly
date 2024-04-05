using BrieflyServer.Interfaces;
using Microsoft.AspNetCore.Authentication;

namespace BrieflyServer.Middleware
{
    public class FacebookAuth : IAuthService
    {
        public AuthenticationBuilder AddAuthentication(AuthenticationBuilder builder)
        {
            var clientId = Environment.GetEnvironmentVariable("FB_APP_ID");
            var clientSecret = Environment.GetEnvironmentVariable("FB_SECRET");
            
            if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
            {
                throw new InvalidOperationException("Facebook App ID or Secret not configured.");
            }
            return builder.AddFacebook(options =>
            {
                options.AppId = clientId;
                options.AppSecret = clientSecret;
            });
        }
    }
}