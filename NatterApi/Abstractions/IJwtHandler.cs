using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using NatterApi.Models;

namespace NatterApi.Abstractions;

public interface IJwtHandler {
    Task<string> CreateTokenAsync(NatterUser user, string? role = null);
    
    Task<List<Claim>> GetClaimsAsync(NatterUser user);

    JwtSecurityToken VerifyToken(string receivedJwt);
}
