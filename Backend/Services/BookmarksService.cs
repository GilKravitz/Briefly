using BrieflyServer.Data;
using BrieflyServer.Models;

namespace BrieflyServer.Services
{
    public class BookmarksService(BrieflyContext i_Context)
    {
        private readonly BrieflyContext _context = i_Context;

        public List<Article> GetBookmarkArticles(string i_Email, int i_PageNumber, int i_PageSize)
        {
            // Calculate the number of items to skip
            int numberOfPagesToSkip = (i_PageNumber - 1) * i_PageSize;
            var bookmarkedArticlesIds = _context.Bookmarks
                .Where(bookmarked => bookmarked.Email == i_Email)
                .Select(bookmarked => bookmarked.ArticleId)
                .ToList();
            var articles = _context.Articles
                .Where(article => bookmarkedArticlesIds.Contains(article.Id))
                .Skip(numberOfPagesToSkip)
                .Take(i_PageSize)
                .ToList();

            return articles;
        }

        public void AddBookmark(string i_Email, int i_ArticleId)
        {
            Bookmarked? bookmark = new Bookmarked(i_Email, i_ArticleId);
            _context.Bookmarks.Add(bookmark);
            _context.SaveChanges();
        }

        public void RemoveBookmark(string i_Email, int i_ArticleId)
        {
            Bookmarked? bookmark = _context.Bookmarks
                .FirstOrDefault(bookmarked => bookmarked.Email == i_Email && bookmarked.ArticleId == i_ArticleId);
            if (bookmark != null)
            {
                _context.Bookmarks.Remove(bookmark);
                _context.SaveChanges();
            }
        }
    }
}