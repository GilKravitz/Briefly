using BrieflyServer.Data;
using BrieflyServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Services
{
    public class BookmarksService
    {
        private readonly BrieflyContext _context;

        public BookmarksService(BrieflyContext context)
        {
            _context = context;
        }

        public async Task<List<Article>> GetBookmarkArticles(string i_Email, int i_PageNumber, int i_PageSize)
        {
            // Calculate the number of items to skip
            int numberOfPagesToSkip = (i_PageNumber - 1) * i_PageSize;

            var bookmarkedArticlesIds = await GetBookmarkedArticleIds(i_Email);

            var articles = await _context.Articles
                .Where(article => bookmarkedArticlesIds.Contains(article.Id))
                .Skip(numberOfPagesToSkip)
                .Take(i_PageSize)
                .ToListAsync();

            return articles;
        }

        public async Task AddBookmark(string i_Email, int i_ArticleId)
        {
            var bookmark = new Bookmarked(i_Email, i_ArticleId);
            await _context.Bookmarks.AddAsync(bookmark);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveBookmark(string i_Email, int i_ArticleId)
        {
            var bookmark = await _context.Bookmarks
                .FirstOrDefaultAsync(bookmarked => bookmarked.Email == i_Email && bookmarked.ArticleId == i_ArticleId);

            if (bookmark != null)
            {
                _context.Bookmarks.Remove(bookmark);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<HashSet<int>> GetBookmarkedArticleIds(string email)
        {
            var bookmarkedArticleIds = await _context.Bookmarks
                .Where(bookmark => bookmark.Email == email)
                .Select(bookmark => bookmark.ArticleId)
                .ToListAsync();

            return bookmarkedArticleIds.ToHashSet();
        }
    }
}
