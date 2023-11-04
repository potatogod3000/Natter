using Microsoft.EntityFrameworkCore;
using NatterApi.Data;
using NatterApi.Abstractions;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
var DatabaseConnection = config["ConnectionStrings:NatterDatabase"];

builder.Services.AddControllers();
builder.Services.AddCors();

builder.Services.AddDbContext<UserContext>(options => options.UseNpgsql(DatabaseConnection));

builder.Services.Configure<JwtHandler>(builder.Configuration.GetSection("JwtConfig"));

builder.Services.AddAuthentication().AddJwtBearer(options => {
    options.TokenValidationParameters = new() {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(config["Authentication:Schemes:Bearer:SigningKeys:0:Value"]!))
    };
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

app.UseAuthorization();

app.MapControllers();

app.Run();
