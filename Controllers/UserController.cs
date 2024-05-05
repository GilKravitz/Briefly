using BrieflyServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BrieflyServer.Controllers
{
   // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController(UserService userService) : ControllerBase
    {
        [HttpGet("PreferredTopics")]
        public IActionResult GetPreferredCategories()
        {
            string email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            try
            {
                var categories = userService.GetPreferredCategories(email);
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("PreferredTopics")]
        public IActionResult UpdatePreferredCategories([FromBody] string preferredTopics)
        {
            string email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            try
            {
                userService.UpdatePreferredCategories(email, preferredTopics);
                return Ok("Preffered categories updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
