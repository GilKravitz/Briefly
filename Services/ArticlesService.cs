// ArticlesService.cs
using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Services
{
    public class ArticlesService(BrieflyContext context)
    {
        public async Task<List<Article>> GetArticles(int page, int pageSize, string email)
        {
            // Calculate the number of items to skip
            int skip = (page - 1) * pageSize;

            var user = await context.Users
                .Include(u => u.UserCategories)
                .ThenInclude(uc => uc.Category)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                // User with the given email not found
                throw new ArgumentNullException(nameof(email), "User not found.");
            }

            // Get a list of category names from user's subscriptions
            var preferredCategoryNames = user.UserCategories?
                .Select(uc => uc.Category?.Name)
                .Where(name => name != null)
                .ToList();

            if (preferredCategoryNames == null || !preferredCategoryNames.Any())
            {
                return new List<Article>();
            }

            // Query the articles based on category names, skipping and taking the desired number
            var articles = await context.Articles
                .Where(article => preferredCategoryNames.Contains(article.Category))
                .OrderByDescending(article => article.PublishDate)
                .Skip(skip)
                .Take(pageSize)
                .ToListAsync();

            return articles;
        }


        //public List<Article> SearchArticles(string searchString)
        //{
        //    var articles = context.Articles
        //        .Where(article => article.Title.Contains(searchString) || article.ArticleText.Contains(searchString))
        //        .OrderByDescending(article => article.Title.Contains(searchString))
        //        .ToList();

        //    return articles;
        //}
    }
}