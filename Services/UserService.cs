using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Services
{
    public class UserService
    {
        private readonly BrieflyContext _context;

        public UserService(BrieflyContext context)
        {
            _context = context;
        }

        public string GetPreferredCategories(string email)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            return user.PreferredTopics;
        }

        public void UpdatePreferredCategories(string email,string categories)
        {
            var user = _context.Users
                .FirstOrDefault(user => user.Email == email);

            if (user == null)
            {
                throw new Exception("User not found");
            }
            var categoriesList = categories.Split(',').ToList();
            foreach (var category in categoriesList)
            {
                if (!Enum.IsDefined(typeof(ArticleCategory), category))
                {
                    throw new Exception($"Invalid category: {category}");
                }
            }
            user.PreferredTopics = categories;
            _context.SaveChanges();
        }

        public List<Article> GetBookmarkedArticles(string email)
        {
            var user = _context.Users
                .Include(user => user.BookmarkedArticles)
                .FirstOrDefault(user => user.Email == email);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var bookmarkedArticleIds = user.BookmarkedArticles.Split(" ").ToList();
            var articles = _context.Articles
                .Where(article => bookmarkedArticleIds.Contains(article.id.ToString())).ToList();
            return articles;
        }

        public void UpdateBookmarkedArticles(string email, string bookmarkedArticles)
        {
            var user = _context.Users
                .Include(user => user.BookmarkedArticles)
                .FirstOrDefault(user => user.Email == email);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            var wantedArticleIds = bookmarkedArticles.Split(" ").ToList();
            var existingArticleIds = _context.Articles.Select(article => article.id.ToString()).ToList();

            if (wantedArticleIds.Any(id => !existingArticleIds.Contains(id)))
            {
                throw new Exception("One or more article IDs do not exist");
            }

            user.BookmarkedArticles = bookmarkedArticles;
            _context.SaveChanges();
        }
    }
}
