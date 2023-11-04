using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using NatterApi.Models;

namespace NatterApi.Abstractions;

public class JwtHandler : IJwtHandler {

    private readonly IConfiguration _configuration;

    public JwtHandler(IConfiguration configuration) {
        _configuration = configuration;
    }

    public string CreateToken(string username) {
        List<Claim> claims = new() {
            new Claim(ClaimTypes.Name, username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Authentication:Schemes:Bearer:SigningKeys:0:Value"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: credentials
        );

        string jwtString = new JwtSecurityTokenHandler().WriteToken(token);

        return jwtString;
    }
}
