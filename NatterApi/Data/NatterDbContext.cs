using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NatterApi.Models;

namespace NatterApi.Data;

public class NatterDbContext: IdentityDbContext<NatterUser> {
    public NatterDbContext(DbContextOptions options): base(options) {}

    public DbSet<ServerModel> Servers { get; set; }
}