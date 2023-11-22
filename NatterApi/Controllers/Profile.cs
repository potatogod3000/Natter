using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NatterApi.Models;

namespace NatterApi.Controllers;

[Authorize]
[ApiController]
[Route("api/profile")]
public class Profile: Controller {

    private readonly UserManager<NatterUser> _userManager;

    public Profile(UserManager<NatterUser> userManager) {
        _userManager = userManager;
    }

    [HttpGet("getProfile")]
    public async Task<IActionResult> GetProfile(string? username = null) {
        bool currentUser = false;
        
        if(username == null) {
            username = User.Identity.Name;
            currentUser = true;
        }

        var user = await _userManager.FindByNameAsync(username);
        
        if(user == null) {
            return BadRequest( new {message = $"No user found with the name {username}"} );
        }
        else if(username == null) {
            return BadRequest(new { message = "Received data error: username is null" });
        }

        if(currentUser) {
            return Ok(new {
                user.UserName,
                user.Email,
                user.PhoneNumber,
                user.Country,
                user.ServersJoined
            });
        }
        else {
            return Ok(new {
                user.UserName,
                user.Country,
                user.ServersJoined
            });
        }
    }
}
