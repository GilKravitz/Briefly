using BrieflyServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace BrieflyServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArticleController : ControllerBase
    {
        private readonly ArticleService _articleService;

        public ArticleController(ArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet]
        public IActionResult GetArticles([FromBody] List<string> categories,[FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (page <= 0 || pageSize <= 0)
            {
                return BadRequest("Invalid page number or page size.");
            }
            try
            {
                var articlesByCategory = _articleService.GetArticles(page, pageSize, categories);
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

        [HttpGet("health")]
        public IActionResult GetHealth()
        {
            return Ok("Server Is Up");
        }


        [HttpGet("search")]
        public IActionResult SearchArticles([FromQuery] string searchString)
        {
            if (string.IsNullOrEmpty(searchString))
            {
                return BadRequest("Search string cannot be empty.");
            }

            var articles = _articleService.SearchArticles(searchString);
            return Ok(articles);
        }
    }
}