using BrieflyServer.Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using BrieflyServer.Middleware;
using BrieflyServer.Services;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

var connectionString = $"Host={Environment.GetEnvironmentVariable("PG_HOST")};Port={Environment.GetEnvironmentVariable("PG_PORT")};Database={Environment.GetEnvironmentVariable("PG_DATABASE")};Username={Environment.GetEnvironmentVariable("PG_USER")};Password={Environment.GetEnvironmentVariable("PG_PASS")};";

builder.Services.AddDbContext<BrieflyContext>(options =>
    options.UseNpgsql(connectionString));


builder.Services.AddScoped<ArticleService>();
// Register authentication services
//builder.Services.AddSingleton<IAuthService, FacebookAuth>();


//add controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Use authentication and authorization
//app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();