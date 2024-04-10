using Microsoft.AspNetCore.Mvc;

namespace BrieflyServer.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
