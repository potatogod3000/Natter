using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NatterApi.Models;
using NatterApi.Models.DTOs;

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
                user.PhoneNumberAreaCode,
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

    [HttpPost("updateUser")]
    public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto updateDetails) {
        var user = await _userManager.FindByEmailAsync(updateDetails.Email);

        user.UserName = updateDetails.UserName;
        user.Country = updateDetails.Country;
        user.PhoneNumber = updateDetails.PhoneNumber;
        user.PhoneNumberAreaCode = updateDetails.PhoneNumberAreaCode;

        var userUpdated = await _userManager.UpdateAsync(user);

        if(userUpdated.Succeeded) {
            return Ok( new { message = "Updated user details!" } );
        }

        return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Something went wrong when updating user details!" });
    }

    [HttpPost("updatePassword")]
    public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordDto updateDetails) {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var passwordChanged = _userManager.ChangePasswordAsync(user,updateDetails.CurrentPassword, updateDetails.NewPassword);

        if(passwordChanged.Result.Succeeded) {
            return Ok( new { message = "Password updated! Proceed to Login" } );
        }
        else {
            return BadRequest(new { message = passwordChanged.Result.Errors } );
        }
    }

    [HttpPost("deleteUser")]
    public async Task<IActionResult> DeleteAction([FromBody] DeleteUserDto deleteUser) {
        var user = await _userManager.FindByEmailAsync(deleteUser.Email);
        var verification = await _userManager.CheckPasswordAsync(user, deleteUser.CurrentPassword);

        if(verification) {
            var deletion = await _userManager.DeleteAsync(user);

            if(deletion.Succeeded) {
                return Ok(new { message = $"The user {user.UserName} has been deleted!"});
            }
            else {
                BadRequest(new { message = deletion.Errors });
            }
        }
        
        return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Server Error!"});
    }
}
