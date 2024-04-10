using Microsoft.AspNetCore.Mvc;

namespace BrieflyServer.Controllers
{
    public class BookmarkController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
