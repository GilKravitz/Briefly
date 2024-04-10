using BrieflyServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer.Data
{
    public class BrieflyContext : DbContext
    {
        public BrieflyContext(DbContextOptions<BrieflyContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; } // Map to the 'users' table
        public DbSet<Article> Articles { get; set; } // Map to the 'merged_articles' table

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Specify the table name for the User entity
            modelBuilder.Entity<User>().ToTable("users");

            // Specify the table name for the Article entity
            modelBuilder.Entity<Article>().ToTable("merged_articles");
        }
    }
}