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
    public class PreferredCategoriesController : ControllerBase
    {
        private readonly CategoriesService _categoriesService;

        internal PreferredCategoriesController(CategoriesService i_CategoriesService)
        {
            _categoriesService = i_CategoriesService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoriesService.GetAllCategories();

            return Ok(categories);
        }

        [HttpGet]
        public async Task<IActionResult> GetPreferredCategories()
        {
            string email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            try
            {
                var categories =  await _categoriesService.GetPreferredCategories(email);
                return Ok(categories);
            }
            catch (Exception exception)
            {
                return StatusCode(500, exception.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePreferredCategories([FromBody] UpdatePreferredCategoriesRequest i_Request)
        {
            string email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            try
            {
                await _categoriesService.UpdatePreferredCategories(email, i_Request.PreferredCategories);

                return Ok("Preferred categories updated successfully");
            }
            catch (Exception exception)
            {
                return StatusCode(500, exception.Message);
            }
        }
    }
}
