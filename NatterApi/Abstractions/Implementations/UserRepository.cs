using NatterApi.Models;
using NatterApi.Data;
using Microsoft.EntityFrameworkCore;

namespace NatterApi.Abstractions;

public class UserRepository : IUserRepository {

    private readonly UserContext _context;
    
    public UserRepository(UserContext context) {
        _context = context;
    }

    public async Task<bool> EmailCheck(string email) {
        var user = await GetByEmail(email);
        
        if(user != null) return true;
        else return false;
    }

    public async Task<bool> UsernameCheck(string username) {
        var user = await GetByUsername(username);

        if(user != null) return true;
        else return false;
    }
    
    public async Task<UserModel> Create(UserModel user) {
        user.Id = Math.Abs(Guid.NewGuid().GetHashCode());

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        
        return user;
    }

    public async Task<UserModel> GetByEmail(string email) {
        UserModel? user = await _context.Users.FirstOrDefaultAsync(p => p.Email == email);
        
        return user;
    }

    public async Task<UserModel> GetByUsername(string username) {
        UserModel? user = await _context.Users.FirstOrDefaultAsync(p => p.UserName == username);
        
        return user;
    }
}
