using Microsoft.AspNetCore.Authentication;

namespace BrieflyServer.Interfaces
{
    public interface IAuthService
    {
        AuthenticationBuilder AddAuthentication(AuthenticationBuilder builder);
    }
}