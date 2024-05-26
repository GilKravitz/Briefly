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

        public PreferredCategoriesController(CategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
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
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePreferredCategories([FromBody] UpdatePreferredCategoriesRequest request)
        {
            string email = HttpContext.User?.FindFirst(ClaimTypes.Email)?.Value;
            try
            {
                await _categoriesService.UpdatePreferredCategories(email, request.PreferredCategories);
                return Ok("Preferred categories updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
