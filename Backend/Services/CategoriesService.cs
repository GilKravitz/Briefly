using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Services
{
    public class CategoriesService
    {
        private readonly BrieflyContext _context;
        public CategoriesService(BrieflyContext context)
        {
            _context = context;
        }

        public async Task<string[]> GetAllCategories()
        {
            string[] categories = await _context.Categories.Select(categories => categories.Name).ToArrayAsync();
            return categories;
        }
        public async Task<string[]> GetPreferredCategories(string email)
        {
            var user = await _context.Users
                .Include(u => u.UserCategories)
                .ThenInclude(uc => uc.Category) // Include Category navigation property
                .FirstOrDefaultAsync(user => user.Email == email);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            // Check if user has any categories
            if (!user.UserCategories.Any())
            {
                return new string[0]; // Return empty array if no categories
            }

            // Get category names from UserCategories
            var categoryNames = user.UserCategories
                .Select(uc => uc.Category.Name)  // Access category name through Category navigation property
                .ToArray();

            return categoryNames;
        }

        public async Task UpdatePreferredCategories(string email, string[] categories)
        {
            var user = await _context.Users
                .Include(u => u.UserCategories) // Include UserCategories collection
                .FirstOrDefaultAsync(user => user.Email == email);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            // Remove existing UserCategories for the user
            user.UserCategories.Clear();

            // Add new UserCategories based on categories
            foreach (var categoryName in categories)
            {
                var category = await _context.Categories.FirstOrDefaultAsync(c => c.Name == categoryName);
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
