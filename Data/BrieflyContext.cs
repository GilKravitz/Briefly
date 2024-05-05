using BrieflyServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Data
{
    public class BrieflyContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public DbSet<Article> Articles { get; set; }
        public DbSet<ForgotPasswordToken> ForgotPassword { get; set; }
        public DbSet<Bookmarked> Bookmarks { get; set; }

        public BrieflyContext(DbContextOptions<BrieflyContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Article>().ToTable("merged_articles");
            modelBuilder.Entity<ForgotPasswordToken>().ToTable("ForgotPasswordTokens");
            modelBuilder.Entity<Bookmarked>().ToTable("Bookmarks");
        }
    }
}