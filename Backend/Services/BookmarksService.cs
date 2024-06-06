using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BrieflyServer.Services
{
    public class BookmarksService(BrieflyContext i_Context)
    {
        private readonly BrieflyContext _context = i_Context;

        internal List<Article> GetBookmarkArticles(int i_PageNumber, int i_PageSize, string i_Email)
        {
            // Calculate the number of items to skip
            int skip = (i_PageNumber - 1) * i_PageSize;
            var bookmarkedArticlesIds = _context.Bookmarks
                .Where(bookmarked => bookmarked.Email == i_Email)
                .Select(bookmarked => bookmarked.ArticleId)
                .ToList();
            var articles = _context.Articles
                .Where(article => bookmarkedArticlesIds.Contains(article.Id))
                .Skip(skip)
                .Take(i_PageSize)
                .ToList();

            return articles;
        }

        internal void AddBookmark(string i_Email, int i_ArticleId)
        {
            var bookmark = new Bookmarked(i_Email, i_ArticleId);

            _context.Bookmarks.Add(bookmark);
            _context.SaveChanges();
        }

        internal void RemoveBookmark(string i_Email, int i_ArticleId)
        {
            var bookmark = _context.Bookmarks
                .FirstOrDefault(b => b.Email == i_Email && b.ArticleId == i_ArticleId);

            if (bookmark != null)
            {
                _context.Bookmarks.Remove(bookmark);
                _context.SaveChanges();
            }
        }
    }
}
