// ArticlesService.cs
using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Services
{
    public class ArticlesService(BrieflyContext i_Context)
    {
        private readonly BrieflyContext _context = i_Context;

        internal async Task<List<Article>> GetArticles(int i_PageNumber, int i_PageSize, string i_Email)
        {
            // Calculate the number of items to skip
            int skip = (i_PageNumber - 1) * i_PageSize;
            var user = await _context.Users
                .Include(user => user.UserCategories)
                .ThenInclude(userCategory => userCategory.Category)
                .FirstOrDefaultAsync(user => user.Email == i_Email);
            if (user == null)
            {
                // User with the given email not found
                throw new ArgumentNullException(nameof(i_Email), "User not found.");
            }

            // Get a list of category names from user's subscriptions
            var preferredCategoryNames = user.UserCategories?
                .Select(userCategory => userCategory.Category?.Name)
                .Where(name => name != null)
                .ToList();
            if (preferredCategoryNames == null || !preferredCategoryNames.Any())
            {
                return new List<Article>();
            }

            // Query the articles based on category names, skipping and taking the desired number
            var articles = await _context.Articles
                .Where(article => preferredCategoryNames.Contains(article.Category))
                .OrderByDescending(article => article.PublishDate)
                .Skip(skip)
                .Take(i_PageSize)
                .ToListAsync();

            return articles;
        }
    }
}