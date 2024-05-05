using BrieflyServer.Data;
using BrieflyServer.Models;
using BrieflyServer.Services;
using DotNetEnv;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BrieflyServer;

public class Program
{
    public static void Main(string[] args)
    {
        Env.Load();

        var builder = WebApplication.CreateBuilder(args);

        var connectionString = $"Host={Environment.GetEnvironmentVariable("PG_HOST")};Port={Environment.GetEnvironmentVariable("PG_PORT")};Database={Environment.GetEnvironmentVariable("PG_DATABASE")};Username={Environment.GetEnvironmentVariable("PG_USER")};Password={Environment.GetEnvironmentVariable("PG_PASS")};";

        builder.Services.AddDbContext<BrieflyContext>(options =>
            options.UseNpgsql(connectionString));
        builder.Services.AddScoped<ArticleService>();
        builder.Services.AddScoped<UserService>();
        builder.Services.AddScoped<EmailService>();
        builder.Services.AddScoped<BookmarkedService>();
        //builder.Services.AddScoped<LoggingService>();

        //add controllers
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<BrieflyContext>()
            .AddDefaultTokenProviders();

        var app = builder.Build();

        app.UseAuthentication();
        app.UseAuthorization();
        app.UseHttpsRedirection();
        app.MapControllers();
        app.Run();
    }
}