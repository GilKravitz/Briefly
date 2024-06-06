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
    public class BookmarksController(BookmarksService i_BookmarksService) : Controller
    {
        private readonly BookmarksService _bookmarksService = i_BookmarksService;

        [HttpGet]
        public IActionResult GetBookmarked([FromQuery] int i_PageNumber = 1, [FromQuery] int i_PageSize = 10)
        {
            if (i_PageNumber <= 0 || i_PageSize <= 0)
            {
                return BadRequest("Invalid page number or page size.");
            }
            
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }

            var articles = _bookmarksService.GetBookmarkArticles(i_PageNumber, i_PageSize, email);

            return Ok(articles);
        }

        [HttpPost]
        public IActionResult AddBookmark([FromBody] AddBookmarkRequest i_Model)
        {
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }

            _bookmarksService.AddBookmark(email, i_Model.ArticleId);

            return Ok("Article bookmarked successfully.");
        }

        [HttpDelete]
        public IActionResult RemoveBookmark([FromQuery] int i_ArticleId)
        {
            var email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token.");
            }

            _bookmarksService.RemoveBookmark(email, i_ArticleId);

            return Ok("Article removed from bookmarks.");
        }
    }
}
