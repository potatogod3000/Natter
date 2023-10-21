using NatterApi.Models;

namespace NatterApi.Abstractions;

public interface IUserRepository {

    Task<bool> EmailCheck(string email);

    Task<bool> UsernameCheck(string username);
    
    Task<UserModel> Create(UserModel user);

    Task<UserModel> GetByEmail(string email);

    Task<UserModel> GetByUsername(string username);
}
