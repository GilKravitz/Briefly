using BrieflyServer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace BrieflyServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class BookmarksController(BookmarksService bookmarksService) : Controller
    {
        private readonly BookmarksService _bookmarksService = bookmarksService;

        [HttpGet]
        public IActionResult GetBookmarked()
        {
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }
            var articles = _bookmarksService.GetBookmarkArticles(email);
            return Ok(articles);
        }

        [HttpPost]
        public IActionResult AddBookmark([FromQuery] int articleId)
        {
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }
            _bookmarksService.AddBookmark(email,articleId);
            return Ok("Article bookmarked successfully.");
        }
        [HttpDelete]
        public IActionResult RemoveBookmark([FromQuery] int articleId)
        {
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }
            _bookmarksService.RemoveBookmark(email, articleId);
            return Ok("Article removed from bookmarks.");
        }
    }
}
