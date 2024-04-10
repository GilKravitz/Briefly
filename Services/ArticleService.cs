// ArticleService.cs
using BrieflyServer.Data;
using BrieflyServer.Models;

namespace BrieflyServer.Services
{
    public class ArticleService
    {
        private readonly BrieflyContext _context;

        public ArticleService(BrieflyContext context)
        {
            _context = context;
        }

        public List<Article> GetArticles(int page, int pageSize, List<string> categories)
        {
            // Calculate the number of items to skip
            int skip = (page - 1) * pageSize;

            //check if the requested categories are valid
            if (categories.Any(category => !Enum.IsDefined(typeof(ArticleCategory), category)))
            {
                throw new ArgumentException("One or more categories are invalid.");
            }
            // Query the articles based on categories, skipping the appropriate number and taking the desired number
            var articles = _context.Articles
                .Where(article => categories.Contains(article.Category))
                .Skip(skip)
                .Take(pageSize)
                .ToList();

            return articles;
        }
        public List<Article> SearchArticles(string searchString)
        {
            var articles = _context.Articles
                .Where(article => article.Title.Contains(searchString) || article.ArticleText.Contains(searchString))
                .OrderByDescending(article => article.Title.Contains(searchString))
                .ToList();

            return articles;
        }
    }
}