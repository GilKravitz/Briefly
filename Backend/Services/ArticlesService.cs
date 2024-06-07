// ArticlesService.cs
using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Services
{
    public class ArticlesService(BrieflyContext context)
    {
        public async Task<List<Article>> GetArticles(int i_PageNumber, int i_PageSize, string i_Email)
        {
            // Calculate the number of items to skip
            int numberOfPagesToSkip = (i_PageNumber - 1) * i_PageSize;
            User? user = await context.Users
                .Include(u => u.UserCategories)
                .ThenInclude(userCategory => userCategory.Category)
                .FirstOrDefaultAsync(u => u.Email == i_Email);
            if (user == null)
            {
                throw new ArgumentNullException(nameof(i_Email), "User not found.");
            }

            var preferredCategoryNames = user.UserCategories?// Get a list of category names from user's subscriptions
                .Select(userCategory => userCategory.Category?.Name)
                .Where(name => name != null)
                .ToList();
            if (preferredCategoryNames == null || !preferredCategoryNames.Any())
            {
                return new List<Article>();
            }
            
            var articles = await context.Articles// Query the articles based on category names, skipping and taking the desired number
                .Where(article => preferredCategoryNames.Contains(article.Category))
                .OrderByDescending(article => article.PublishDate)
                .Skip(numberOfPagesToSkip)
                .Take(i_PageSize)
                .ToListAsync();

            return articles;
        }
    }
}