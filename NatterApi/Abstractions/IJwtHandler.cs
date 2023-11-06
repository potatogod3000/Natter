using NatterApi.Models;

namespace NatterApi.Abstractions;

public interface IJwtHandler {
    string CreateToken(UserModel verifiedUser);
}
