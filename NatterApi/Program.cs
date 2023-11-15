using Microsoft.EntityFrameworkCore;
using NatterApi.Data;
using NatterApi.Hubs;
using NatterApi.Configurations;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
var DatabaseConnection = config["ConnectionStrings:NatterDatabase"];

builder.Services.AddControllers();

builder.Services.AddDbContext<NatterDbContext>(options => options.UseNpgsql(DatabaseConnection));
builder.Services.AddIdentity();
builder.Services.AddCombinedAuth(config);
builder.Services.AddCorsPolicy();

builder.Services.AddDependencies(config);

builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors("Frontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<Chats>("api/chathub");

app.Run();
