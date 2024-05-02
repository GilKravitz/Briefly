using BrieflyServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BrieflyServer.Controllers
{
   // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController(UserService userService) : ControllerBase
    {
        [HttpGet("categories")]
        public IActionResult GetPreferredCategories(string email)
        {
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

        [HttpPut("categories")]
        public IActionResult UpdatePreferredCategories(string email, string categories)
        {
            try
            {
                userService.UpdatePreferredCategories(email, categories);
                return Ok("Preffered categories updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
