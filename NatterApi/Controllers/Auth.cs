using Microsoft.AspNetCore.Mvc;
using NatterApi.Abstractions;
using NatterApi.Models.DTOs;
using NatterApi.Models;
using Microsoft.AspNetCore.Identity;

namespace NatterApi.Controllers;

[ApiController]
[Route("api/auth")]
public class Auth : ControllerBase {
    
    private readonly UserManager<NatterUser> _userManager;
    private readonly IJwtHandler _jwtHandler;
    
    public Auth(UserManager<NatterUser> userManager, IJwtHandler jwtHandler) {
        _userManager = userManager;
        _jwtHandler = jwtHandler;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerRequest) {
        
        if(ModelState.IsValid) {
            var newUser = new NatterUser() {
                UserName = registerRequest.UserName,
                Email = registerRequest.Email,
                Country = registerRequest.Country,
                PhoneNumber = registerRequest.PhoneNumber,
            };

            var createdUser = await _userManager.CreateAsync(newUser, registerRequest.Password);
            
            if(createdUser.Succeeded) {
                return Ok( new { message = $"User '{newUser.UserName}' has been registered successfully" });
            }
            
            return BadRequest(new { message = createdUser.Errors});
        }

        return BadRequest(new { message = "Please enter all the required information" });

    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginRequest) {
        
        if(ModelState.IsValid) {
            NatterUser user =  await _userManager.FindByEmailAsync(loginRequest.Email);

            if(user == null) {
                return BadRequest(new { message = "Email or Password is incorrect" });
            }

            bool passwordCheck = await _userManager.CheckPasswordAsync(user, loginRequest.Password);

            if(!passwordCheck) {
                return BadRequest(new { message = "Email or Password is incorrect" });
            }
            
            var jwt = await _jwtHandler.CreateTokenAsync(user);
            user.RefreshToken = Guid.NewGuid().ToString();

            Response.Cookies.Append("X-Access-Token", jwt, new CookieOptions() {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            Response.Cookies.Append("X-Username", user.UserName, new CookieOptions() {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            Response.Cookies.Append("X-Refresh-Token", user.RefreshToken, new CookieOptions() {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            return Ok(new { message = "Login succeeded!", username = user.UserName });
        }
        
        return BadRequest(new { message = "Please enter all the required information" });
    }

    [HttpGet("refresh")]
    public async Task<IActionResult> RefreshToken() {
        if(Request.Cookies.TryGetValue("X-Refresh-Token", out var refreshToken) && Request.Cookies.TryGetValue("X-Username", out var username)) {
            
            if(Request.Cookies.TryGetValue("X-Access-Token", out var acquiredToken)) {
                Response.Cookies.Delete("X-Access-Token");
            }
            
            return BadRequest(new { message = "Token expired! Please re-login."});
        }

        return StatusCode(StatusCodes.Status500InternalServerError);
    }

    [HttpPost("logout")]
    public IActionResult Logout() {
        var jwtString = Request.Cookies["token"];
        
        if(jwtString != null) {
            var verifiedToken = _jwtHandler.VerifyToken(jwtString);
            int userId = int.Parse(verifiedToken.Subject);
            Response.Cookies.Delete("token");

            return Ok(new { message = "Logged out" });
        }

        return BadRequest( new { message = "Token error" });
    }
}