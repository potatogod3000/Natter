using NatterApi.Models;

namespace NatterApi.Abstractions;

public interface IJwtHandler {
    string CreateToken(string username);
}
