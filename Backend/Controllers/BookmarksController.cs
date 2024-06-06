using BrieflyServer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using BrieflyServer.Models;
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
        public IActionResult GetBookmarked([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page number or page size.");
            }
            
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }

            var articles = _bookmarksService.GetBookmarkArticles(email, page, pageSize);

            return Ok(articles);
        }

        [HttpPost]
        public IActionResult AddBookmark([FromBody] AddBookmarkRequest model)
        {
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }
            _bookmarksService.AddBookmark(email,model.ArticleId);
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
