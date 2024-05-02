// ArticleService.cs
using BrieflyServer.Data;
using BrieflyServer.Models;

namespace BrieflyServer.Services
{
    public class ArticleService(BrieflyContext context)
    {
        public List<Article> GetArticles(int page, int pageSize,string email)
        {
            // Calculate the number of items to skip
            int skip = (page - 1) * pageSize;

            var preferredCategoriesString = context.Users
                .Where(user => user.Email == email)
                .Select(user => user.PreferredTopics)
                .FirstOrDefault();

            if (preferredCategoriesString == null)
            {
                // User with the given email not found or preferred topics are null
                throw new ArgumentNullException(nameof(email));
            }

            var preferredCategories = preferredCategoriesString.Split(" ").ToList();

            //check if the requested categories are valid
            if (preferredCategories.Any(category => !Enum.IsDefined(typeof(ArticleCategory), category)))
            {
                throw new ArgumentException("One or more categories are invalid.");
            }
            // Query the articles based on categories, skipping the appropriate number and taking the desired number
            var articles = context.Articles
                .Where(article => preferredCategories.Contains(article.Category))
                .OrderByDescending(article => article.PublishDate)
                .Skip(skip)
                .Take(pageSize)
                .ToList();
            return articles;
        }
        public List<Article> SearchArticles(string searchString)
        {
            var articles = context.Articles
                .Where(article => article.Title.Contains(searchString) || article.ArticleText.Contains(searchString))
                .OrderByDescending(article => article.Title.Contains(searchString))
                .ToList();

            return articles;
        }
    }
}