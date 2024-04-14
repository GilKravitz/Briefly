using BrieflyServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrieflyServer.Controllers
{
   // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("categories")]
        public IActionResult GetPreferredCategories(string email)
        {
            try
            {
                var categories = _userService.GetPreferredCategories(email);
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("categories")]
        public IActionResult UpdatePreferredCategories(string email, string categories)
        {
            try
            {
                _userService.UpdatePreferredCategories(email, categories);
                return Ok("Preffered categories updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("bookmarks")]
        public IActionResult GetBookmarkedArticles(string email)
        {
            try
            {
                var articles = _userService.GetBookmarkedArticles(email);
                return Ok(articles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("bookmarks")]
        public IActionResult UpdateBookmarkedArticles(string email, string articles)
        {
            try
            {
                _userService.UpdateBookmarkedArticles(email, articles);
                return Ok("Bookmarked articles updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
