using BrieflyServer.Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

Env.Load(); // Load variables from .env file

var builder = WebApplication.CreateBuilder(args);

var connectionString = $"Host={Environment.GetEnvironmentVariable("PG_HOST")};Port={Environment.GetEnvironmentVariable("PG_PORT")};Database={Environment.GetEnvironmentVariable("PG_DATABASE")};Username={Environment.GetEnvironmentVariable("PG_USER")};Password={Environment.GetEnvironmentVariable("PG_PASS")};";

builder.Services.AddDbContext<BrieflyContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

app.Run();