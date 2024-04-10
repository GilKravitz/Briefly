using Microsoft.AspNetCore.Mvc;

namespace BrieflyServer.Controllers
{
    public class AuthenticationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
