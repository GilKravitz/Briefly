using Microsoft.AspNetCore.Authentication;

namespace BrieflyServer.Middleware
{
    public interface IAuthService
    {
        AuthenticationBuilder AddAuthentication(AuthenticationBuilder builder);
    }
}