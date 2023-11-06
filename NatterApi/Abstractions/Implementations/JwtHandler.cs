using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using NatterApi.Models;

namespace NatterApi.Abstractions;

public class JwtHandler : IJwtHandler {
    
    private readonly IConfiguration _configuration;

    public JwtHandler(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreateToken(UserModel verifiedUser) {

        var jwtTokenHandler = new JwtSecurityTokenHandler();
        
        var secretKey = Encoding.ASCII.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value!);
        
        var tokenDescriptor = new SecurityTokenDescriptor() {
            // Issuer = ,
            Subject = new ClaimsIdentity( new [] {
                new Claim("Id", verifiedUser.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, verifiedUser.UserName),
                new Claim(JwtRegisteredClaimNames.Name, verifiedUser.UserName),
                new Claim(JwtRegisteredClaimNames.Email, verifiedUser.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(secretKey),
                SecurityAlgorithms.HmacSha512
            )
        };
        
        var token = jwtTokenHandler.CreateToken(tokenDescriptor);

        string jwtString = jwtTokenHandler.WriteToken(token);

        return jwtString;
    }
}
