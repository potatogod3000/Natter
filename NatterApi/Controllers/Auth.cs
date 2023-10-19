using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using NatterApi.Dtos;

namespace NatterApi.Controllers;

[ApiController]
[Route("api/auth")]
public class Auth : Controller {

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDto registerRequest) {
        if(ModelState.IsValid) return Json(new { message = "Registered!"});
        else return BadRequest("Data error :(");
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto loginRequest) {
        if(ModelState.IsValid) return Json(new { message = "Logged In :)"});
        else return BadRequest("Data error :(");
    }

    [HttpPost("logout")]
    public IActionResult Logout(int id) {
        return Json(new { message = "Logged out!"});
    }
}