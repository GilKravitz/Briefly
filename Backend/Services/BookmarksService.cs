using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BrieflyServer.Services
{
    public class BookmarksService(BrieflyContext context)
    {
        private readonly BrieflyContext _context = context;

        public List<Article> GetBookmarkArticles(string email, int page, int pageSize)
        {
            // Calculate the number of items to skip
            int skip = (page - 1) * pageSize;

            var bookmarkedArticlesIds = _context.Bookmarks
                .Where(b => b.Email == email)
                .Select(b => b.ArticleId)
                .ToList();

            var articles = _context.Articles
                .Where(a => bookmarkedArticlesIds.Contains(a.Id))
                .Skip(skip)
                .Take(pageSize)
                .ToList();

            return articles;
        }
        public void AddBookmark(string email, int articleId)
        {
            var bookmark = new Bookmarked(email, articleId);
            _context.Bookmarks.Add(bookmark);
            _context.SaveChanges();
        }
        public void RemoveBookmark(string email, int articleId)
        {
            var bookmark = _context.Bookmarks
                .FirstOrDefault(b => b.Email == email && b.ArticleId == articleId);

            if (bookmark != null)
            {
                _context.Bookmarks.Remove(bookmark);
                _context.SaveChanges();
            }
        }

    }

}
