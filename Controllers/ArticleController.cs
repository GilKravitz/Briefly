using BrieflyServer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace BrieflyServer.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ArticleController(ArticleService articleService) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetArticles([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
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

            try
            {
                var articlesByCategory = articleService.GetArticles(page, pageSize, email);
                return Ok(articlesByCategory);
            }
            catch (ArgumentException invalidCategory)
            {
                return BadRequest(invalidCategory.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("search")]
        public IActionResult SearchArticles([FromQuery] string searchString)
        {
            if (string.IsNullOrEmpty(searchString))
            {
                return BadRequest("Search string cannot be empty.");
            }

            var articles = articleService.SearchArticles(searchString);
            return Ok(articles);
        }
    }
}