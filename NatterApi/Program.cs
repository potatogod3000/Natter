using Microsoft.EntityFrameworkCore;
using NatterApi.Data;
using NatterApi.Abstractions;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);
var DatabaseConnection = builder.Configuration["ConnectionStrings:NatterDatabase"];

builder.Services.AddControllers();
builder.Services.AddCors();

builder.Services.AddDbContext<UserContext>(options => options.UseNpgsql(DatabaseConnection));

builder.Services.Configure<JwtHandler>(builder.Configuration.GetSection("JwtConfig"));

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
});

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();
builder.Services.AddScoped<IJwtHandler, JwtHandler>();

var app = builder.Build();

app.UseCors(config => {
    config.AllowAnyHeader();
    config.AllowAnyMethod();
    config.AllowCredentials();
    config.WithOrigins("http://localhost:3000");
});

app.UseAuthentication();
app.MapControllers();

app.Run();
