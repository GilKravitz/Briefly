using BrieflyServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using BrieflyServer.Models;

namespace BrieflyServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("PreferredTopics")]
        public async Task<IActionResult> GetPreferredCategories()
        {
            string email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            try
            {
                var categories =  await _userService.GetPreferredCategories(email);
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("PreferredTopics")]
        public async Task<IActionResult> UpdatePreferredCategories([FromBody] UpdatePreferredTopicsRequest request)
        {
            string email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            try
            {
                await _userService.UpdatePreferredCategories(email, request.PreferredTopics);
                return Ok("Preferred categories updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
