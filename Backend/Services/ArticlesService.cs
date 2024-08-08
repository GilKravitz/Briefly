// ArticlesService.cs
using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Services
{
    public class ArticlesService(BrieflyContext context, BookmarksService bookmarksService)
    {
        public async Task<List<ArticleDto>> GetArticles(int i_PageNumber, int i_PageSize, string i_Email)
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
                return new List<ArticleDto>();
            }
            
            var articles = await context.Articles// Query the articles based on category names, skipping and taking the desired number
                .Where(article => preferredCategoryNames.Contains(article.Category))
                .OrderByDescending(article => article.PublishDate)
                .Skip(numberOfPagesToSkip)
                .Take(i_PageSize)
                .ToListAsync();

            var bookmarkedArticleIds = await bookmarksService.GetBookmarkedArticleIds(i_Email);

            return articles.Select(article => new ArticleDto
            {
                Id = article.Id,
                Content = article.Content,
                Category = article.Category,
                Title = article.Title,
                PublishDate = article.PublishDate,
                SourceLinks = article.SourceLinks,
                SourceNames = article.SourceNames,
                Image = article.Image,
                Tags = article.Tags,
                IsBookmarked = bookmarkedArticleIds.Contains(article.Id)
            }).ToList();
        }

        public async Task ReportArticleAsync(string email, int articleId, string reason)
        {
            var articleExists = await context.Articles.AnyAsync(article => article.Id == articleId);

            if (!articleExists)
            {
                throw new ArgumentException("The article with the specified ID does not exist.");
            }

            var report = new Report
            {
                Email = email,
                ArticleId = articleId,
                Reason = reason,
                ReportDate = DateTime.UtcNow
            };

            await context.Reports.AddAsync(report);
            await context.SaveChangesAsync();
        }
    }
}