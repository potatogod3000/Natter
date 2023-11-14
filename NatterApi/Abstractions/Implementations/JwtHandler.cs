using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NatterApi.Configurations;
using NatterApi.Models;

namespace NatterApi.Abstractions;

public class JwtHandler : IJwtHandler {

    private readonly JwtConfiguration _configuration;
    private readonly UserManager<NatterUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public JwtHandler(IOptions<JwtConfiguration> configuration, UserManager<NatterUser> userManager, RoleManager<IdentityRole> roleManager) {
        _configuration = configuration.Value;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<string> CreateTokenAsync(NatterUser user, string? role = null) {
        
        role ??= "User";
        var secretKey = Encoding.UTF8.GetBytes(_configuration.Key);
        var claims = await GetClaimsAsync(user);
        var credentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha512Signature);

        var securityToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(60),
            issuer: _configuration.Issuer,
            audience: _configuration.Audience,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }

    public async Task<List<Claim>> GetClaimsAsync(NatterUser user) {
        List<Claim> claims = new() {
            new (ClaimTypes.Name, user.UserName),
            new (ClaimTypes.Email, user.Email),
        };
        
        claims.AddRange(await _userManager.GetClaimsAsync(user));
        
        var roles = await _userManager.GetRolesAsync(user);
        foreach(var role in roles) {
            claims.Add(new Claim(ClaimTypes.Role, role));

            var identityRole = await _roleManager.FindByNameAsync(role);
            if(identityRole != null) {
                claims.AddRange(await _roleManager.GetClaimsAsync(identityRole));
            }
        }

        return claims;
    }

    public JwtSecurityToken VerifyToken(string receivedJwt) {

        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var securityKey = Encoding.UTF8.GetBytes(_configuration.Key);

        jwtTokenHandler.ValidateToken(
            receivedJwt,
            new TokenValidationParameters() {
                IssuerSigningKey = new SymmetricSecurityKey(securityKey),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            },
            out SecurityToken validatedToken
        );
        
        return (JwtSecurityToken)validatedToken;
    }
}
