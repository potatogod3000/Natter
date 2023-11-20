using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using NatterApi.Abstractions;
using NatterApi.Data;
using NatterApi.Models;

namespace NatterApi.Configurations;

public static class ServicesConfiguration {

    public static IServiceCollection AddIdentity(this IServiceCollection services) {
        
        services.AddIdentity<NatterUser, IdentityRole>(options => {
            options.SignIn.RequireConfirmedEmail = false;
            options.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<NatterDbContext>()
        .AddDefaultTokenProviders();

        return services;
    }

    public static IServiceCollection AddCombinedAuth(this IServiceCollection services, IConfiguration configuration) {
        
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(options => {
            options.Cookie.Name = "NatterCookieAuth";
            options.SlidingExpiration = true;
        });
        
        return services;
    }

    public static IServiceCollection AddCorsPolicy(this IServiceCollection services) {
        services.AddCors(options => {
            options.AddPolicy("Frontend", policy => {
                policy.WithOrigins("https://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });
        });

        return services;
    }

    public static IServiceCollection AddDependencies(this IServiceCollection services, IConfiguration configuration) {
        
        services.Configure<JwtConfiguration>(configuration.GetSection("JwtConfig"));
        services.AddScoped<IServerHandler, ServerHandler>();
        services.AddScoped<ICookieHandler, CookieHandler>();
        
        return services;
    }
}