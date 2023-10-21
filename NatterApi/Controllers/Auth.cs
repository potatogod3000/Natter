using Microsoft.AspNetCore.Mvc;
using NatterApi.Abstractions;
using NatterApi.Models.DTOs;
using NatterApi.Models;

namespace NatterApi.Controllers;

[ApiController]
[Route("api/auth")]
public class Auth : Controller {
    
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    
    public Auth(IUserRepository userRepository, IPasswordHasher passwordHasher) {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerRequest) {
        string hashedPassword = _passwordHasher.HashPassword(registerRequest.Password);
        
        if(ModelState.IsValid) {
            UserModel user = new() {
                UserName = registerRequest.Username,
                Email = registerRequest.Email,
                Password = hashedPassword,
                Country = registerRequest.Country,
                PhoneNumber = registerRequest.PhoneNumber
            };

            bool usernameCheck = await _userRepository.UsernameCheck(user.UserName);
            bool emailCheck = await _userRepository.EmailCheck(user.Email);

            if(emailCheck && usernameCheck) return BadRequest(new { message = "Email and Username already exists", emailAlreadyExists = true, usernameAlreadyExists = true  });
            if(emailCheck) return BadRequest(new { message = "Email already exists", emailAlreadyExists = true });
            if(usernameCheck) return BadRequest(new { message = "Username already exists", usernameAlreadyExists = true });
            
            await _userRepository.Create(user);
            return Ok(new { message = $"User {user.UserName} has been registered" });
        }

        else {
            return BadRequest(new { message = "Please enter all the required information" });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginRequest) {
        
        if(ModelState.IsValid) {
            UserModel user = await _userRepository.GetByEmail(loginRequest.Email);

            if(user == null) {
                return BadRequest( new { message = "Email or Password is incorrect" });
            }

            bool passwordCheck = _passwordHasher.Verify(user.Password, loginRequest.Password);

            if(passwordCheck) {
                Response.Cookies.Append("jwtAuth", "");

                return Ok(new { message = "Logged In" });
            }
            
            return BadRequest(new { message = "Email or Password is incorrect" });
        }
        
        return BadRequest(new { message = "Please enter all the required information" });
    }

    [HttpPost("logout")]
    public IActionResult Logout(int id) {
        Response.Cookies.Delete("jwtAuth");

        return Ok(new { message = "Logged out" });
    }
}