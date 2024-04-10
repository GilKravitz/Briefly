using Microsoft.AspNetCore.Mvc;

namespace BrieflyServer.Controllers
{
    public class CategoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
