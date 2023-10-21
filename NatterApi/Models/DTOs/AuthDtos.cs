using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NatterApi.Models.DTOs;

public class LoginDto {

    [Required]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}

public class RegisterDto {

    [Required]
    public string Email { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }

    public string Country { get; set; }

    public int PhoneNumber { get; set; }
}