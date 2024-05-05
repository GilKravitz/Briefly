using BrieflyServer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace BrieflyServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class BookmarkedController(BookmarkedService bookmarkedService) : Controller
    {
        private readonly BookmarkedService _bookmarkedService = bookmarkedService;

        [HttpGet]
        public IActionResult GetBookmarked()
        {
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }
            var articles = _bookmarkedService.GetBookmarkArticles(email);
            return Ok(articles);
        }

        [HttpPost("add")]
        public IActionResult AddBookmark([FromQuery] int articleId)
        {
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }
            _bookmarkedService.AddBookmark(email,articleId);
            return Ok("Article bookmarked successfully.");
        }
        [HttpPost("remove")]
        public IActionResult RemoveBookmark([FromQuery] int articleId)
        {
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }
            _bookmarkedService.RemoveBookmark(email, articleId);
            return Ok("Article removed from bookmarks.");
        }
    }
}
