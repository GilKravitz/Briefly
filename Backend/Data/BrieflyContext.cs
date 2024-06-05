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
                .HasKey(uc => new { uc.UserId, uc.CategoryId });

            modelBuilder.Entity<UserCategory>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserCategories)
                .HasForeignKey(uc => uc.UserId);

            modelBuilder.Entity<UserCategory>()
                .HasOne(uc => uc.Category)
                .WithMany()
                .HasForeignKey(uc => uc.CategoryId);

        }
    }
}