using Newtonsoft.Json.Linq;

namespace BrieflyServer.Middleware;
public static class FacebookAuth
{
    public static async Task<JObject?> VerifyFacebookToken(string token)
    {
        using var httpClient = new HttpClient();
        var response = await httpClient.GetStringAsync($"https://graph.facebook.com/me?access_token={token}&fields=id,email");
        if (string.IsNullOrEmpty(response))
        {
            return null;
        }

        var userInfo = JObject.Parse(response);
        return userInfo;
    }
}
