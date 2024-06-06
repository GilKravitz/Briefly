using BrieflyServer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace BrieflyServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly ArticlesService _articlesService;

        public ArticlesController(ArticlesService i_ArticlesService)
        {
            _articlesService = i_ArticlesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetArticles([FromQuery] int i_PageNumber = 1, [FromQuery] int i_PageSize = 10)
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

            try
            {
                var articlesByCategory = await _articlesService.GetArticles(i_PageNumber, i_PageSize, email);

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
    }
}