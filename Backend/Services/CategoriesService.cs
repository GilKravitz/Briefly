using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Services
{
    public class CategoriesService
    {
        private readonly BrieflyContext _context;

        internal CategoriesService(BrieflyContext i_Context)
        {
            _context = i_Context;
        }

        internal async Task<string[]> GetAllCategories()
        {
            string[] categories = await _context.Categories.Select(categories => categories.Name).ToArrayAsync();

            return categories;
        }

        public async Task<string[]> GetPreferredCategories(string i_Email)
        {
            User? user = await _context.Users
                .Include(u => u.UserCategories)
                .ThenInclude(userCategory => userCategory.Category) // Include Category navigation property
                .FirstOrDefaultAsync(user => user.Email == i_Email);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            if (!user.UserCategories.Any())
            {
                return new string[0]; // Return empty array if no categories
            }

            string[]? categoryNames = user.UserCategories
                .Select(userCategory => userCategory.Category.Name)  // Access category name through Category navigation property
                .ToArray();

            return categoryNames;
        }

        public async Task UpdatePreferredCategories(string i_Email, string[] i_Categories)
        {
            User? user = await _context.Users
                .Include(u => u.UserCategories) // Include UserCategories collection
                .FirstOrDefaultAsync(user => user.Email == i_Email);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            user.UserCategories.Clear();// Remove existing UserCategories for the user
            foreach (var categoryName in i_Categories)// Add new UserCategories based on categories
            {
                Categories? category = await _context.Categories.FirstOrDefaultAsync(categories => categories.Name == categoryName);
                if (category == null)
                {
                    throw new Exception($"Category '{categoryName}' not found");
                }

                user.UserCategories.Add(new UserCategory { UserId = user.Id, CategoryId = category.Id });
            }

            await _context.SaveChangesAsync();
        }
    }
}