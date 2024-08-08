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
        public DbSet<UserCategory> UserCategories { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<Report> Reports { get; set; }

        public BrieflyContext(DbContextOptions<BrieflyContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Article>().ToView("articles");
            modelBuilder.Entity<ForgotPasswordToken>().ToTable("ForgotPasswordTokens");
            modelBuilder.Entity<Bookmarked>().ToTable("Bookmarks");
            modelBuilder.Entity<Categories>().ToTable("categories");
            modelBuilder.Entity<UserCategory>()
                .HasKey(userCategory => new { userCategory.UserId, userCategory.CategoryId });
            modelBuilder.Entity<UserCategory>()
                .HasOne(userCategory => userCategory.User)
                .WithMany(user => user.UserCategories)
                .HasForeignKey(userCategory => userCategory.UserId);
            modelBuilder.Entity<UserCategory>()
                .HasOne(userCategory => userCategory.Category)
                .WithMany()
                .HasForeignKey(userCategory => userCategory.CategoryId);
        }
    }
}