using Microsoft.EntityFrameworkCore;
using NatterApi.Models;

namespace NatterApi.Data;

public class UserContext: DbContext {
    public UserContext(DbContextOptions<UserContext> options): base(options) {}

    public DbSet<UserModel> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserModel>().HasIndex(p => p.UserName).IsUnique(true);
        modelBuilder.Entity<UserModel>().HasIndex(p => p.Email).IsUnique(true);
        modelBuilder.Entity<UserModel>().HasIndex(p => p.PhoneNumber).IsUnique(true);
    }
}