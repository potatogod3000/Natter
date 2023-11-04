using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NatterApi.Abstractions;

namespace NatterApi.Controllers;

[Authorize]
[ApiController]
[Route("api/profile")]
public class Profile: Controller {

    private readonly IUserRepository _userRepository;

    public Profile(IUserRepository userRepository) {
        _userRepository = userRepository;
    }

    [HttpGet("getProfile")]
    public async Task<IActionResult> GetProfile(string username) {
        var userProfile = await _userRepository.GetByUsername(username);
        
        if(userProfile == null) {
            return BadRequest( new {message = $"No user found with the name {username}"} );
        }

        return Json(userProfile);
    }
}
