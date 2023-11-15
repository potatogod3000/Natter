using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using NatterApi.Abstractions;
using NatterApi.Data;
using NatterApi.Models;

namespace NatterApi.Configurations;

public static class ServicesConfiguration {

    public static IServiceCollection AddIdentity(this IServiceCollection services) {
        
        services.AddIdentity<NatterUser, IdentityRole>(options => {
            options.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<NatterDbContext>()
        .AddDefaultTokenProviders();

        return services;
    }

    public static IServiceCollection AddCombinedAuth(this IServiceCollection services, IConfiguration configuration) {
        
        services.AddAuthentication(options => {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options => {
            var key = Encoding.UTF8.GetBytes(configuration.GetSection("JwtConfig:Key").Value!);
            options.SaveToken = true;

            options.TokenValidationParameters = new() {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidIssuer = configuration.GetSection("JwtConfig:Issuer").Value,
                ValidAudience = configuration.GetSection("JwtConfig:Audience").Value,
                ValidateLifetime = true,
                ValidateActor = true,
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                RequireExpirationTime = true,
                ClockSkew = TimeSpan.FromSeconds(5)
            };
        });
        /* .AddCookie(options => {
            options.Cookie.Name = "JWT-Access-Token";
        }); */
        
        return services;
    }

    public static IServiceCollection AddCorsPolicy(this IServiceCollection services) {
        services.AddCors(options => {
            options.AddPolicy("Frontend", policy => {
                policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });
        });

        return services;
    }

    public static IServiceCollection AddDependencies(this IServiceCollection services, IConfiguration configuration) {
        
        services.Configure<JwtConfiguration>(configuration.GetSection("JwtConfig"));
        services.AddScoped<IServerHandler, ServerHandler>();
        services.AddScoped<IJwtHandler, JwtHandler>();
        
        return services;
    }
}