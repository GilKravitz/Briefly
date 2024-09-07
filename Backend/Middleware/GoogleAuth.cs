using Google.Apis.Auth;

namespace BrieflyServer.Middleware;

public static class GoogleAuth
{
    public static async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleToken(string token)
    {
        try
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(token);
            return payload;
        }
        catch (InvalidJwtException)
        {
            return null;
        }
    }
}