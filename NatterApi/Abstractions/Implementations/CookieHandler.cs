using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using NatterApi.Models;

namespace NatterApi.Abstractions;

public class CookieHandler : ICookieHandler {

    private readonly UserManager<NatterUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public CookieHandler(
        UserManager<NatterUser> userManager,
        RoleManager<IdentityRole> roleManager
    ) {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task Create(NatterUser user, HttpContext context) {
        
        var claims = await GetClaimsAsync(user);

        var claimsIdentity = new ClaimsIdentity(
            claims,
            CookieAuthenticationDefaults.AuthenticationScheme
        );

        var authProperties = new AuthenticationProperties {
            AllowRefresh = true,
            ExpiresUtc = DateTime.UtcNow.AddMinutes(10),
            IsPersistent = true,
            IssuedUtc = DateTime.UtcNow
        };

        await context.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity),
            authProperties
        );
    }

    public async Task<List<Claim>> GetClaimsAsync(NatterUser user) {
        
        List<Claim> claims = new() {
            new (ClaimTypes.NameIdentifier, user.Id),
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
}
