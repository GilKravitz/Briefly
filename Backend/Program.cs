using System.Text;
using BrieflyServer.Data;
using BrieflyServer.Models;
using BrieflyServer.Services;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace BrieflyServer;

public class Program
{
    public static void Main(string[] args)
    {
        Env.Load();
        var builder = WebApplication.CreateBuilder(args);
        string connectionString = $"Host={Environment.GetEnvironmentVariable("PG_HOST")};Port={Environment.GetEnvironmentVariable("PG_PORT")};Database={Environment.GetEnvironmentVariable("PG_DATABASE")};Username={Environment.GetEnvironmentVariable("PG_USER")};Password={Environment.GetEnvironmentVariable("PG_PASS")};";

        builder.Services.AddDbContext<BrieflyContext>(options =>
            options.UseNpgsql(connectionString));
        builder.Services.AddScoped<ArticlesService>();
        builder.Services.AddScoped<CategoriesService>();
        builder.Services.AddScoped<EmailService>();
        builder.Services.AddScoped<BookmarksService>();
        //builder.Services.AddScoped<LoggingService>();

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<BrieflyContext>()
            .AddDefaultTokenProviders();
        string jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
        string jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
        string jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
        if (string.IsNullOrEmpty(jwtKey) || string.IsNullOrEmpty(jwtIssuer) || string.IsNullOrEmpty(jwtAudience))
        {
            throw new ArgumentNullException("JWT configuration is missing in environment variables.");
        }

        builder.Services.AddAuthentication(options => 
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtIssuer,
                    ValidAudience = jwtAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                };
            });
        //Add auth for the swagger for testing
        builder.Services.AddSwaggerGen(configuration =>
        {
            configuration.SwaggerDoc("v1", new OpenApiInfo { Title = "BrieflyAPI", Version = "v1" });
            configuration.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "bearer"
            });

            configuration.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] { }
                }
            });
        });

        var app = builder.Build();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseHttpsRedirection();
        app.MapControllers();
        app.UseSwagger();
        app.UseSwaggerUI(configuration =>
        {
            configuration.SwaggerEndpoint("/swagger/v1/swagger.json", "BrieflyAPI V1");
        });

        app.Run();
    }
}